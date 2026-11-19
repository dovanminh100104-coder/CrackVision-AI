import os
import sys
import unittest
import numpy as np
import torch
from PIL import Image

# Ensure project directories are in sys.path
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEMO_DIR = os.path.join(PROJECT_ROOT, "demo")
BACKEND_DIR = os.path.join(DEMO_DIR, "backend")

for path in [PROJECT_ROOT, DEMO_DIR, BACKEND_DIR]:
    if path not in sys.path:
        sys.path.insert(0, path)

from database import init_database, get_database_stats, load_all_records
from models import get_deep_learning_model
from utils import generate_sample_crack_image, predict_deep_learning, calculate_metrics
from fastapi.testclient import TestClient
from main import app

class TestCrackVisionSystem(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_database()
        cls.client = TestClient(app)
        cls.device = torch.device("cpu")

    def test_01_database_status(self):
        """Kiểm tra kết nối và trạng thái cơ sở dữ liệu (SQL Server hoặc SQLite fallback)."""
        stats = get_database_stats()
        self.assertIn("status", stats)
        self.assertEqual(stats["status"], "online")
        self.assertIn("engine", stats)
        records = load_all_records(limit=5)
        self.assertIsInstance(records, list)

    def test_02_model_loading(self):
        """Kiểm tra khởi tạo và nạp trọng số mô hình Compact U-Net."""
        model = get_deep_learning_model("compact_unet", self.device)
        self.assertIsNotNone(model)
        dummy_tensor = torch.zeros((1, 3, 256, 256), dtype=torch.float32).to(self.device)
        with torch.no_grad():
            output = model(dummy_tensor)
        self.assertEqual(output.shape, (1, 1, 256, 256))

    def test_03_inference_and_metrics(self):
        """Kiểm tra luồng xử lý ảnh phân đoạn và tính toán chỉ số kỹ thuật."""
        img_pil = generate_sample_crack_image()
        self.assertIsInstance(img_pil, Image.Image)
        
        model = get_deep_learning_model("compact_unet", self.device)
        mask_binary, infer_time = predict_deep_learning(
            model, img_pil, img_size=256, threshold=0.5, device=self.device, is_sample=True
        )
        self.assertEqual(mask_binary.shape, (450, 450))
        self.assertTrue(infer_time > 0)
        
        metrics = calculate_metrics(mask_binary, infer_time, "Compact U-Net (Test)")
        self.assertIn("crack_ratio", metrics)
        self.assertIn("risk_level", metrics)
        self.assertIn("affected_area", metrics)

    def test_04_api_endpoints(self):
        """Kiểm tra các endpoints RESTful chính của FastAPI Backend."""
        # 1. Root HTML
        resp = self.client.get("/")
        self.assertEqual(resp.status_code, 200)
        self.assertIn("text/html", resp.headers["content-type"])
        
        # 2. Database Status
        resp = self.client.get("/api/database/status")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertTrue(data.get("success"))
        
        # 3. Weights Status
        resp = self.client.get("/api/weights/status")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertTrue(data.get("success"))
        
        # 4. Predict Sample Endpoint
        resp = self.client.post("/api/predict/sample", data={
            "model_type": "compact_unet",
            "threshold": "0.5",
            "img_size": "256",
            "overlay_color": "#EF4444",
            "overlay_opacity": "0.55"
        })
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertTrue(data.get("success"))
        self.assertIn("metrics", data)
        self.assertIn("mask_base64", data)

if __name__ == "__main__":
    unittest.main()

