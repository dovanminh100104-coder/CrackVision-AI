import os
import sys
import io
import time
import json
import csv
import torch
import cv2
import numpy as np
import base64
from PIL import Image
from typing import Optional

# Optimize multi-core CPU inference
try:
    cpu_cores = os.cpu_count() or 4
    torch.set_num_threads(cpu_cores)
except Exception:
    pass

# Ensure backend directory is in sys.path
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from pydantic import BaseModel

from models import get_deep_learning_model, process_classical_sobel, process_classical_canny
from utils import (
    predict_deep_learning, create_color_overlay, calculate_metrics,
    generate_sample_crack_image, pillow_to_base64, numpy_to_base64
)
from report import generate_pdf_bytes
from database import (
    init_database, save_record as db_save_record,
    load_all_records as db_load_all_records,
    get_record_by_id as db_get_record_by_id,
    delete_record_by_id as db_delete_record_by_id,
    clear_all_records as db_clear_all_records,
    get_database_stats as db_get_database_stats,
    DB_FILE
)

# Initialize SQLite Database & table schema on startup
init_database()

app = FastAPI(
    title="AI CrackVision Pro API",
    description="Backend API for Surface Crack Detection & Semantic Segmentation Engine",
    version="2.0.0"
)

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
if device.type == "cpu":
    cpu_cores = os.cpu_count() or 8
    torch.set_num_threads(cpu_cores)
print(f"Server initialized on device: {device.type.upper()} ({torch.get_num_threads()} CPU threads)")

# Global cache for uploaded model weights path
CUSTOM_WEIGHTS_PATH = None
WEIGHTS_DIR = os.path.join(backend_dir, "weights")
os.makedirs(WEIGHTS_DIR, exist_ok=True)

# SQL Database CRUD wrappers
def load_history_records(limit: int = 100, source_type: Optional[str] = None, risk_level: Optional[str] = None):
    return db_load_all_records(limit=limit, source_type=source_type, risk_level=risk_level)

def save_history_record(record: dict):
    return db_save_record(record)

def delete_history_record_by_id(audit_id: str):
    return db_delete_record_by_id(audit_id)

def clear_all_history_records():
    return db_clear_all_records()

@app.post("/api/upload/weights")
async def upload_weights(file: UploadFile = File(...)):
    global CUSTOM_WEIGHTS_PATH
    try:
        filename = file.filename
        if not (filename.endswith(".pth") or filename.endswith(".pt")):
            raise HTTPException(status_code=400, detail="Chỉ chấp nhận tệp có định dạng .pth hoặc .pt")
        dest_path = os.path.join(WEIGHTS_DIR, filename)
        contents = await file.read()
        with open(dest_path, "wb") as f:
            f.write(contents)
        CUSTOM_WEIGHTS_PATH = dest_path
        return JSONResponse({
            "success": True,
            "filename": filename,
            "path": dest_path,
            "size_mb": round(len(contents) / (1024 * 1024), 2),
            "message": f"Đã nạp thành công trọng số: {filename}"
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/weights/status")
async def get_weights_status():
    files = []
    if os.path.exists(WEIGHTS_DIR):
        for f in os.listdir(WEIGHTS_DIR):
            if f.endswith(".pth") or f.endswith(".pt"):
                p = os.path.join(WEIGHTS_DIR, f)
                files.append({
                    "name": f,
                    "size_mb": round(os.path.getsize(p) / (1024 * 1024), 2)
                })
    return JSONResponse({
        "success": True,
        "active_weights": os.path.basename(CUSTOM_WEIGHTS_PATH) if CUSTOM_WEIGHTS_PATH else None,
        "available_files": files
    })

@app.post("/api/predict/image")
async def predict_image(
    file: UploadFile = File(...),
    model_type: str = Form("compact_unet"),
    threshold: float = Form(0.5),
    img_size: int = Form(256),
    overlay_color: str = Form("#EF4444"),
    overlay_opacity: float = Form(0.5),
    source_type: str = Form("image")
):
    try:
        contents = await file.read()
        image_pil = Image.open(io.BytesIO(contents)).convert("RGB")
        image_np = np.array(image_pil)

        model_labels = {
            "unet_resnet34_512": "U-Net ResNet-34 (Đề xuất)",
            "resunet34": "U-Net ResNet-34 (Đề xuất)",
            "deeplabv3_finetuned": "DeepLabV3+ (Fine-Tuned)",
            "deeplabv3plus": "DeepLabV3+ (Fine-Tuned)",
            "deeplabv3": "DeepLabV3+ (Fine-Tuned)",
            "deeplabv3_frozen": "DeepLabV3+ (Frozen Backbone)",
            "compact_unet": "Compact U-Net (Seg03)",
            "sobel": "Toán tử Sobel + Otsu",
            "canny": "Lọc cạnh Canny + Otsu"
        }
        model_label = model_labels.get(model_type, "U-Net ResNet-34 (Đề xuất)")

        if model_type in ["sobel", "canny"]:
            start_t = time.time()
            if model_type == "sobel":
                mask_binary = process_classical_sobel(image_np, threshold=int(threshold * 160))
            else:
                mask_binary = process_classical_canny(image_np, low_t=30, high_t=100)
            infer_time = (time.time() - start_t) * 1000
        else:
            dl_model = get_deep_learning_model(model_type, device, CUSTOM_WEIGHTS_PATH)
            mask_binary, infer_time = predict_deep_learning(
                dl_model, image_pil, img_size, threshold, device, is_sample=False
            )

        overlay_np = create_color_overlay(image_np, mask_binary, color_hex=overlay_color, alpha=overlay_opacity)
        metrics = calculate_metrics(mask_binary, infer_time, model_label)

        orig_b64 = pillow_to_base64(image_pil)
        mask_b64 = numpy_to_base64(mask_binary)
        overlay_b64 = numpy_to_base64(overlay_np)

        prefix = "VID" if source_type == "video" else ("CAM" if source_type == "camera" else "IMG")
        audit_id = f"{prefix}-{int(time.time())}"
        record = {
            "id": audit_id,
            "source_type": source_type,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "model_name": model_label,
            "threshold": threshold,
            "img_size": img_size,
            "crack_ratio": metrics["crack_ratio"],
            "affected_area": metrics["affected_area"],
            "infer_time": metrics["infer_time"],
            "risk_level": metrics["risk_level"],
            "risk_color": metrics["risk_color"],
            "risk_desc": metrics["risk_desc"],
            "recommendation": metrics["recommendation"],
            "repair_method": metrics["repair_method"],
            "orig_base64": orig_b64,
            "overlay_base64": overlay_b64,
            "mask_base64": mask_b64
        }
        save_history_record(record)

        return JSONResponse({
            "success": True,
            "audit_id": audit_id,
            "source_type": source_type,
            "orig_base64": orig_b64,
            "mask_base64": mask_b64,
            "overlay_base64": overlay_b64,
            "metrics": metrics
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/stream/frame")
async def stream_frame(
    file: UploadFile = File(...),
    model_type: str = Form("compact_unet"),
    threshold: float = Form(0.5),
    img_size: int = Form(256),
    overlay_color: str = Form("#EF4444"),
    overlay_opacity: float = Form(0.55)
):
    """Ultra-low latency streaming endpoint for live camera & video analysis (zero disk I/O, fast OpenCV pipeline)"""
    try:
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        img_bgr = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img_bgr is None:
            raise ValueError("Cannot decode camera frame")

        orig_h, orig_w = img_bgr.shape[:2]
        img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)

        if model_type == "sobel":
            start_t = time.time()
            mask_binary = process_classical_sobel(img_rgb, threshold=int(threshold * 160))
            infer_time = (time.time() - start_t) * 1000
        elif model_type == "canny":
            start_t = time.time()
            mask_binary = process_classical_canny(img_rgb, low_t=30, high_t=100)
            infer_time = (time.time() - start_t) * 1000
        else:
            dl_model = get_deep_learning_model(model_type, device, CUSTOM_WEIGHTS_PATH)
            infer_res = int(img_size) if img_size else 256
            if orig_w != infer_res or orig_h != infer_res:
                resized = cv2.resize(img_rgb, (infer_res, infer_res), interpolation=cv2.INTER_AREA if orig_w > infer_res else cv2.INTER_LINEAR).astype(np.float32) / 255.0
            else:
                resized = img_rgb.astype(np.float32) / 255.0
            mean = np.array([0.485, 0.456, 0.406], dtype=np.float32)
            std = np.array([0.229, 0.224, 0.225], dtype=np.float32)
            norm = (resized - mean) / std
            tensor = torch.from_numpy(norm.transpose(2, 0, 1)).unsqueeze(0).to(device)

            start_t = time.time()
            with torch.inference_mode():
                out = dl_model(tensor)
                if isinstance(out, dict):
                    out = list(out.values())[0]
                prob = torch.sigmoid(out).squeeze().cpu().numpy()
            infer_time = (time.time() - start_t) * 1000

            # Bilinear upsampling of continuous probability map back to full original stream resolution
            prob_full = cv2.resize(prob, (orig_w, orig_h), interpolation=cv2.INTER_LINEAR)
            mask_binary = (prob_full > threshold).astype(np.uint8) * 255

        # Sharp vector overlay on full original resolution
        color_hex = overlay_color.lstrip('#')
        c_r, c_g, c_b = int(color_hex[0:2], 16), int(color_hex[2:4], 16), int(color_hex[4:6], 16)
        color_bgr = np.array([c_b, c_g, c_r], dtype=np.uint8)

        overlay_bgr = img_bgr.copy()
        crack_idx = mask_binary > 127
        alpha = float(overlay_opacity)
        if np.any(crack_idx):
            overlay_bgr[crack_idx] = (overlay_bgr[crack_idx] * (1.0 - alpha) + color_bgr * alpha).astype(np.uint8)
            # Crisp sub-pixel anti-aliased boundary contour
            contours, _ = cv2.findContours(mask_binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            cv2.drawContours(overlay_bgr, contours, -1, (c_b, c_g, c_r), 1, cv2.LINE_AA)

        # High-definition JPEG encoding at quality 92 (identical sharpness to original video)
        _, enc_buf = cv2.imencode('.jpg', overlay_bgr, [cv2.IMWRITE_JPEG_QUALITY, 92])
        overlay_b64 = "data:image/jpeg;base64," + base64.b64encode(enc_buf.tobytes()).decode("ascii")

        # Telemetry metrics
        total_p = mask_binary.size
        crack_p = int(np.count_nonzero(crack_idx))
        crack_ratio = float((crack_p / total_p) * 100)

        if crack_ratio < 1.0:
            risk_level = "AN TOÀN (THẤP)"
            risk_color = "#4C7A4A"
        elif crack_ratio < 3.5:
            risk_level = "CẢNH BÁO (TRUNG BÌNH)"
            risk_color = "#C98A2E"
        else:
            risk_level = "NGUY HIỂM (CAO)"
            risk_color = "#B4432A"

        return JSONResponse({
            "success": True,
            "overlay_base64": overlay_b64,
            "metrics": {
                "crack_ratio": crack_ratio,
                "risk_level": risk_level,
                "risk_color": risk_color,
                "infer_time": round(infer_time, 1)
            }
        })
    except Exception as e:
        return JSONResponse({"success": False, "detail": str(e)}, status_code=500)

@app.post("/api/predict/sample")
async def predict_sample(
    model_type: str = Form("compact_unet"),
    threshold: float = Form(0.5),
    img_size: int = Form(256),
    overlay_color: str = Form("#EF4444"),
    overlay_opacity: float = Form(0.55)
):
    try:
        image_pil = generate_sample_crack_image()
        image_np = np.array(image_pil)

        model_labels = {
            "unet_resnet34_512": "U-Net ResNet-34 (Đề xuất)",
            "resunet34": "U-Net ResNet-34 (Đề xuất)",
            "deeplabv3_finetuned": "DeepLabV3+ (Fine-Tuned)",
            "deeplabv3plus": "DeepLabV3+ (Fine-Tuned)",
            "deeplabv3": "DeepLabV3+ (Fine-Tuned)",
            "deeplabv3_frozen": "DeepLabV3+ (Frozen Backbone)",
            "compact_unet": "Compact U-Net (Seg03)",
            "sobel": "Toán tử Sobel + Otsu",
            "canny": "Lọc cạnh Canny + Otsu"
        }
        model_label = model_labels.get(model_type, "U-Net ResNet-34 (Đề xuất)")

        if model_type in ["sobel", "canny"]:
            start_t = time.time()
            if model_type == "sobel":
                mask_binary = process_classical_sobel(image_np, threshold=80)
            else:
                mask_binary = process_classical_canny(image_np, low_t=30, high_t=100)
            infer_time = (time.time() - start_t) * 1000
        else:
            dl_model = get_deep_learning_model(model_type, device, CUSTOM_WEIGHTS_PATH)
            mask_binary, infer_time = predict_deep_learning(
                dl_model, image_pil, img_size, threshold, device, is_sample=True
            )

        overlay_np = create_color_overlay(image_np, mask_binary, color_hex=overlay_color, alpha=overlay_opacity)
        metrics = calculate_metrics(mask_binary, infer_time, model_label)

        orig_b64 = pillow_to_base64(image_pil)
        mask_b64 = numpy_to_base64(mask_binary)
        overlay_b64 = numpy_to_base64(overlay_np)

        audit_id = f"IMG-{int(time.time())}"
        record = {
            "id": audit_id,
            "source_type": "image",
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "model_name": model_label,
            "threshold": threshold,
            "img_size": img_size,
            "crack_ratio": metrics["crack_ratio"],
            "affected_area": metrics["affected_area"],
            "infer_time": metrics["infer_time"],
            "risk_level": metrics["risk_level"],
            "risk_color": metrics["risk_color"],
            "risk_desc": metrics["risk_desc"],
            "recommendation": metrics["recommendation"],
            "repair_method": metrics["repair_method"],
            "orig_base64": orig_b64,
            "overlay_base64": overlay_b64,
            "mask_base64": mask_b64
        }
        save_history_record(record)

        return JSONResponse({
            "success": True,
            "audit_id": audit_id,
            "orig_base64": orig_b64,
            "mask_base64": mask_b64,
            "overlay_base64": overlay_b64,
            "metrics": metrics
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class SaveHistoryPayload(BaseModel):
    source_type: str = "video"  # "image", "video", "camera"
    model_name: str
    threshold: Optional[float] = 0.5
    img_size: Optional[int] = 256
    crack_ratio: float
    affected_area: Optional[float] = None
    infer_time: Optional[float] = None
    risk_level: str
    risk_color: str
    risk_desc: Optional[str] = ""
    recommendation: Optional[str] = ""
    repair_method: Optional[str] = ""
    orig_base64: str
    overlay_base64: str
    mask_base64: Optional[str] = ""
    fps: Optional[float] = None

@app.post("/api/history/save")
async def save_history_endpoint(payload: SaveHistoryPayload):
    prefix = "VID" if payload.source_type == "video" else ("CAM" if payload.source_type == "camera" else "IMG")
    audit_id = f"{prefix}-{int(time.time())}"
    
    affected = payload.affected_area if payload.affected_area is not None else round(payload.crack_ratio * 0.012, 3)
    rec = payload.recommendation or ("Cần kiểm tra chi tiết theo dõi vết nứt định kỳ" if payload.crack_ratio > 1.0 else "Bề mặt ổn định, duy trì quan sát thường xuyên.")
    repair = payload.repair_method or ("Bơm keo Epoxy trám trét gia cố vết nứt kết cấu" if payload.crack_ratio > 1.0 else "Không yêu cầu can thiệp kết cấu.")
    
    record = {
        "id": audit_id,
        "source_type": payload.source_type,
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "model_name": payload.model_name,
        "threshold": payload.threshold,
        "img_size": payload.img_size,
        "crack_ratio": payload.crack_ratio,
        "affected_area": affected,
        "infer_time": payload.infer_time or 25.0,
        "risk_level": payload.risk_level,
        "risk_color": payload.risk_color,
        "risk_desc": payload.risk_desc or f"Khung hình ghi nhận qua {payload.source_type}",
        "recommendation": rec,
        "repair_method": repair,
        "orig_base64": payload.orig_base64,
        "overlay_base64": payload.overlay_base64,
        "mask_base64": payload.mask_base64 or payload.overlay_base64
    }
    save_history_record(record)
    return JSONResponse({"success": True, "audit_id": audit_id, "record": record})

@app.get("/api/history")
async def get_history(source_type: Optional[str] = None, risk_level: Optional[str] = None, limit: int = 100):
    records = load_history_records(limit=limit, source_type=source_type, risk_level=risk_level)
    db_meta = db_get_database_stats()
    return JSONResponse({
        "success": True, 
        "records": records, 
        "total": len(records),
        "db_engine": db_meta.get("engine", "SQL Server"),
        "db_name": db_meta.get("database_name", "CrackVisionDB"),
        "server_instance": db_meta.get("server_instance", ".\\SQLEXPRESS01")
    })

@app.get("/api/history/{audit_id}")
async def get_history_item(audit_id: str):
    r = db_get_record_by_id(audit_id)
    if r:
        return JSONResponse({"success": True, "record": r})
    raise HTTPException(status_code=404, detail=f"Không tìm thấy bản ghi {audit_id}")

@app.delete("/api/history/{audit_id}")
async def delete_history_item(audit_id: str):
    success = delete_history_record_by_id(audit_id)
    return JSONResponse({"success": success, "message": f"Đã xóa {audit_id} khỏi SQL Database"})

@app.delete("/api/history")
async def clear_history():
    success = clear_all_history_records()
    return JSONResponse({"success": success, "message": "Đã xóa toàn bộ lịch sử khỏi SQL Database"})

@app.get("/api/database/status")
async def get_database_status():
    stats = db_get_database_stats()
    return JSONResponse({"success": True, "database": stats})

@app.get("/api/database/stats")
async def get_database_stats():
    stats = db_get_database_stats()
    return JSONResponse({"success": True, "stats": stats})

@app.get("/api/dashboard/summary")
async def get_dashboard_summary():
    stats = db_get_database_stats()
    recent_records = load_history_records(limit=10)
    
    light_recent = []
    for r in recent_records[:6]:
        light_recent.append({
            "id": r.get("id"),
            "source_type": r.get("source_type", "image"),
            "timestamp": r.get("timestamp", ""),
            "model_name": r.get("model_name", "U-Net ResNet-34"),
            "crack_ratio": round(float(r.get("crack_ratio", 0.0)), 2),
            "affected_area": round(float(r.get("affected_area", 0.0)), 3),
            "infer_time": round(float(r.get("infer_time", 0.0)), 1),
            "risk_level": r.get("risk_level", "AN TOÀN"),
            "risk_color": r.get("risk_color", "#4C7A4A"),
            "risk_desc": r.get("risk_desc", "")
        })
    
    timeline = []
    for r in reversed(recent_records[:8]):
        ts = r.get("timestamp", "")
        short_time = ts[-8:] if len(ts) >= 8 else ts
        timeline.append({
            "id": r.get("id"),
            "time": short_time,
            "crack_ratio": round(float(r.get("crack_ratio", 0.0)), 2),
            "infer_time": round(float(r.get("infer_time", 0.0)), 1)
        })

    radar_comparison = {
        "labels": ["Độ chính xác (mIoU)", "Điểm Dice F1", "Tốc độ (FPS)", "Độ nhạy bắt nứt", "Tối ưu tham số"],
        "labels_en": ["Accuracy (mIoU)", "Dice F1 Score", "Speed (FPS)", "Crack Recall", "Param Efficiency"],
        "datasets": [
            {
                "model": "U-Net ResNet-34 (Đề xuất)",
                "data": [58.39, 73.36, 69.0, 73.82, 75.0],
                "color": "#B4432A"
            },
            {
                "model": "DeepLabV3+ (Fine-Tuned)",
                "data": [36.66, 53.65, 57.2, 89.63, 40.0],
                "color": "#3B82F6"
            },
            {
                "model": "Compact U-Net (Seg03)",
                "data": [39.35, 51.61, 85.0, 81.73, 65.0],
                "color": "#4C7A4A"
            }
        ]
    }

    return JSONResponse({
        "success": True,
        "database": stats,
        "recent_inspections": light_recent,
        "timeline": timeline,
        "radar": radar_comparison,
        "primary_model": {
            "name": "U-Net ResNet-34 (512x512)",
            "miou": 58.39,
            "dice": 73.36,
            "fps": 34.5,
            "latency_ms": 28.9,
            "params": "24.4 M",
            "resolution": "512 x 512"
        },
        "dataset": {
            "name": "Crack Segmentation Dataset (Kaggle)",
            "total_images": 11298,
            "test_images": 1695,
            "resolution": "512 x 512"
        }
    })

@app.get("/api/history/export/csv")
async def export_history_csv():
    records = load_history_records()
    output = io.StringIO()
    output.write('\ufeff')  # UTF-8 BOM for Microsoft Excel
    writer = csv.writer(output)
    writer.writerow([
        "Mã Phiên (Audit ID)",
        "Loại Hình (Source Type)",
        "Thời Gian (Timestamp)",
        "Mô Hình (AI Model)",
        "Ngưỡng (Threshold)",
        "Độ Phân Giải (Resolution)",
        "Mật Độ Vết Nứt % (Crack Density %)",
        "Diện Tích Ước Tính m2 (Damage Area m2)",
        "Thời Gian Suy Luận ms (Latency ms)",
        "Mức Độ Rủi Ro (Risk Level)",
        "Khuyến Nghị Thi Công (Recommendation)",
        "Phương Án Gia Cố (Repair Method)"
    ])
    for r in records:
        src = r.get("source_type", "image")
        src_label = "Phân Tích Video" if src == "video" else ("Camera Trực Tiếp" if src == "camera" else "Phân Tích Ảnh")
        writer.writerow([
            r.get("id", ""),
            src_label,
            r.get("timestamp", ""),
            r.get("model_name", ""),
            r.get("threshold", ""),
            r.get("img_size", ""),
            f"{r.get('crack_ratio', 0):.2f}",
            f"{r.get('affected_area', 0):.3f}",
            f"{r.get('infer_time', 0):.1f}",
            r.get("risk_level", ""),
            r.get("recommendation", ""),
            r.get("repair_method", "")
        ])
    csv_bytes = output.getvalue().encode("utf-8-sig")
    return Response(content=csv_bytes, media_type="text/csv", headers={
        "Content-Disposition": f"attachment; filename=LichSu_KiemDinh_VetNut_{int(time.time())}.csv"
    })


class ReportRequest(BaseModel):
    orig_base64: str
    overlay_base64: str
    metrics: dict
    lang: Optional[str] = "vi"

@app.post("/api/report/pdf")
async def export_pdf_report(payload: ReportRequest):
    try:
        lang = payload.lang or "vi"
        pdf_bytes = generate_pdf_bytes(payload.orig_base64, payload.overlay_base64, payload.metrics, lang=lang)
        filename = f"Crack_Inspection_Report_{int(time.time())}.pdf" if lang == "en" else f"BaoCao_KiemDinh_VetNut_{int(time.time())}.pdf"
        return Response(content=pdf_bytes, media_type="application/pdf", headers={
            "Content-Disposition": f"attachment; filename={filename}"
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/benchmark")
async def get_benchmark_data():
    benchmark_data = [
        {
            "model": "U-Net ResNet-34 (Đề xuất)",
            "model_id": "unet_resnet34_512",
            "iou": 0.5839,
            "dice": 0.7336,
            "precision": 0.7383,
            "recall": 0.7382,
            "fps": 34.5,
            "latency_ms": 28.9,
            "params": "24.4 M",
            "resolution": "512 x 512",
            "checkpoint": "best_model_epoch059_iou0.5981.pth",
            "best_for": "balanced",
            "image_score": 9.8,
            "video_score": 9.2,
            "image_desc_vi": "MÔ HÌNH ĐỀ XUẤT TỐI ƯU CỦA LUẬN VĂN: Độ phân giải 512×512, IoU 58.39% (Test) / 59.81% (Val), Dice 73.36%. Nhờ kết hợp Skip-connections và Residual Encoder, bảo toàn hoàn hảo các nhánh nứt tế vi (< 0.2mm).",
            "image_desc_en": "PROPOSED OPTIMAL MODEL: 512×512 native resolution, Test IoU 58.39% / Val IoU 59.81%, Dice 73.36%. Skip-connections and Residual Encoder faithfully preserve hairline cracks (< 0.2mm).",
            "video_desc_vi": "Đạt 34.5 FPS trên GPU (độ trễ 28.9 ms), vượt chuẩn thời gian thực (>30 FPS), phân đoạn mượt mà, ổn định ngay cả ở độ phân giải cao 512×512.",
            "video_desc_en": "Achieves 34.5 FPS on GPU (latency 28.9 ms), exceeding real-time requirements (>30 FPS) while running at full 512×512 resolution.",
            "recommendation_vi": "Lựa chọn số 1: Tối ưu toàn diện cho kiểm định hiện trường, phân tích ảnh độ phân giải cao và video thời gian thực.",
            "recommendation_en": "Top #1 choice: Comprehensive optimization for field inspection, high-res static photos and real-time video."
        },
        {
            "model": "DeepLabV3+ (Fine-Tuned)",
            "model_id": "deeplabv3_finetuned",
            "iou": 0.3666,
            "dice": 0.5365,
            "precision": 0.4733,
            "recall": 0.8963,
            "fps": 28.6,
            "latency_ms": 35.0,
            "params": "40.1 M",
            "resolution": "256 x 256",
            "best_for": "recall",
            "image_score": 8.0,
            "video_score": 7.2,
            "image_desc_vi": "Thử nghiệm Ablation 2: Mở khóa và tinh chỉnh toàn bộ mạng ResNet-50. IoU tăng lên 36.66% (+11.77% so với Frozen), Recall đạt 89.63% bắt trọn tối đa vết nứt.",
            "image_desc_en": "Ablation Study 2: Fully fine-tuned ResNet-50 network. IoU jumps to 36.66% (+11.77% over Frozen), Recall achieves 89.63% minimizing false negatives.",
            "video_desc_vi": "Tốc độ 28.6 FPS trên GPU, ngốn tài nguyên VRAM tương đối lớn (3.45 GB) cho mô-đun ASPP trích xuất đặc trưng đa tỉ lệ.",
            "video_desc_en": "28.6 FPS on GPU, higher VRAM consumption (3.45 GB) due to multi-scale ASPP module.",
            "recommendation_vi": "Minh chứng rõ nét cho vai trò của Transfer Learning & Fine-tuning trong phân tích vết nứt bê tông.",
            "recommendation_en": "Clear proof of the power of Transfer Learning & Fine-tuning for structural crack detection."
        },
        {
            "model": "Compact U-Net (Seg03)",
            "model_id": "compact_unet",
            "iou": 0.3935,
            "dice": 0.5161,
            "precision": 0.4617,
            "recall": 0.8173,
            "fps": 42.5,
            "latency_ms": 23.5,
            "params": "29.7 M",
            "resolution": "256 x 256",
            "best_for": "video",
            "image_score": 7.8,
            "video_score": 9.5,
            "image_desc_vi": "Kiến trúc U-Net thu gọn huấn luyện từ đầu (Scratch): IoU đạt 39.35%, phát hiện vết nứt rõ nhưng vi nứt mảnh dễ bị đứt đoạn do chưa có pre-trained backbone.",
            "image_desc_en": "Compact U-Net trained from scratch: IoU reaches 39.35%, detects broad cracks well but fine micro-cracks suffer discontinuities.",
            "video_desc_vi": "TỐI ƯU CHO VIDEO & LIVE CAMERA: Tốc độ cao 42.5 FPS (độ trễ 23.5 ms), tiêu thụ ít VRAM (0.85 GB), rất nhẹ và mượt trên thiết bị di động / drone.",
            "video_desc_en": "TOP CHOICE FOR VIDEO & LIVE CAMERA: High speed 42.5 FPS (latency 23.5 ms), low VRAM footprint (0.85 GB), ideal for mobile / drone feeds.",
            "recommendation_vi": "Phù hợp cho luồng video camera di động và thiết bị có phần cứng giới hạn.",
            "recommendation_en": "Recommended for mobile camera streams and constrained hardware environments."
        },
        {
            "model": "DeepLabV3+ (Frozen Backbone)",
            "model_id": "deeplabv3_frozen",
            "iou": 0.2489,
            "dice": 0.3986,
            "precision": 0.4421,
            "recall": 0.8126,
            "fps": 28.6,
            "latency_ms": 35.0,
            "params": "40.1 M",
            "resolution": "256 x 256",
            "best_for": "ablation",
            "image_score": 5.2,
            "video_score": 6.8,
            "image_desc_vi": "Thử nghiệm Ablation 1: Đóng băng xương sống ResNet-50 ImageNet, chỉ huấn luyện classifier. IoU chỉ đạt 24.89% do đặc trưng ảnh tổng quát không thích nghi tốt với vết nứt.",
            "image_desc_en": "Ablation Study 1: Frozen ImageNet ResNet-50 backbone. IoU is only 24.89% as generic features cannot isolate concrete micro-textures.",
            "video_desc_vi": "Tốc độ 28.6 FPS, mô hình nặng (40.1M params, tốn 3.45 GB VRAM) trong khi độ chính xác thấp do chưa fine-tune.",
            "video_desc_en": "28.6 FPS, heavy model (40.1M params, 3.45 GB VRAM) with low accuracy due to frozen backbone.",
            "recommendation_vi": "Mô hình thực nghiệm đối chứng: Minh chứng việc đóng băng backbone không hiệu quả cho bài toán nứt bê tông.",
            "recommendation_en": "Ablation reference model: Proves that freezing the backbone is insufficient for concrete crack segmentation."
        },
        {
            "model": "Sobel + Otsu (Cổ điển)",
            "model_id": "sobel",
            "iou": 0.2840,
            "dice": 0.4420,
            "precision": 0.3810,
            "recall": 0.5280,
            "fps": 175.4,
            "latency_ms": 5.7,
            "params": "N/A",
            "resolution": "448 x 448",
            "best_for": "filter",
            "image_score": 4.5,
            "video_score": 7.0,
            "image_desc_vi": "Baseline xử lý ảnh cổ điển: IoU thấp (28.40%), dễ nhầm lẫn vân đá, rêu mốc và bụi bẩn thành nứt. Không thể kết luận an toàn kết cấu.",
            "image_desc_en": "Classical baseline: Low IoU (28.40%), easily confuses concrete aggregate, moss and stains with cracks. Unusable for structural sign-off.",
            "video_desc_vi": "Siêu tốc độ (~175 FPS trên GPU, ~187 FPS trên CPU), không phụ thuộc GPU. Phù hợp làm bộ lọc sơ bộ (pre-filter) khung hình trên thiết bị biên IoT.",
            "video_desc_en": "Ultra-fast (~175 FPS on GPU, ~187 FPS on CPU), GPU-free. Ideal as a lightweight pre-filter on edge IoT / low-power CPUs.",
            "recommendation_vi": "Dùng làm giải thuật cơ sở so sánh (Baseline) hoặc bộ lọc sơ bộ trước khi kích hoạt AI.",
            "recommendation_en": "Use as an academic baseline or lightweight pre-screener before activating AI models."
        }
    ]
    return JSONResponse({"success": True, "data": benchmark_data})

# Serve static frontend files
frontend_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "frontend")
if os.path.exists(frontend_path):
    no_cache_headers = {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
    }

    @app.get("/static/assets/{filename:path}")
    async def read_asset(filename: str):
        asset_file = os.path.join(frontend_path, "assets", filename)
        if os.path.exists(asset_file):
            return FileResponse(asset_file, headers=no_cache_headers)
        raise HTTPException(status_code=404, detail="Asset not found")

    app.mount("/static", StaticFiles(directory=frontend_path), name="static")


    @app.get("/style.css")
    async def read_css():
        return FileResponse(os.path.join(frontend_path, "style.css"), media_type="text/css", headers=no_cache_headers)

    @app.get("/script.js")
    async def read_js():
        return FileResponse(os.path.join(frontend_path, "script.js"), media_type="application/javascript", headers=no_cache_headers)

    @app.get("/")
    async def read_index():
        index_file = os.path.join(frontend_path, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file, headers=no_cache_headers)
        return HTMLResponse("<h1>CrackVision Server is Running!</h1>")
