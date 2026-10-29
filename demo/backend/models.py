import os
import glob
import torch
import torch.nn as nn
import torch.nn.functional as F
import cv2
import numpy as np

try:
    import segmentation_models_pytorch as smp
    SMP_AVAILABLE = True
except ImportError:
    SMP_AVAILABLE = False

class DoubleConv(nn.Module):
    """Two Conv-BatchNorm-ReLU layers matching Seg03 Notebook."""
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, padding=1, bias=False),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_ch, out_ch, 3, padding=1, bias=False),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
        )
    def forward(self, x):
        return self.net(x)

class Down(nn.Module):
    """Max-pooling followed by DoubleConv."""
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.net = nn.Sequential(nn.MaxPool2d(2), DoubleConv(in_ch, out_ch))
    def forward(self, x):
        return self.net(x)

class Up(nn.Module):
    """Upsampling, skip concatenation, and DoubleConv."""
    def __init__(self, in_ch, skip_ch, out_ch):
        super().__init__()
        self.up = nn.ConvTranspose2d(in_ch, out_ch, 2, stride=2)
        self.conv = DoubleConv(out_ch + skip_ch, out_ch)
    def forward(self, x, skip):
        x = self.up(x)
        dy, dx = skip.size(2) - x.size(2), skip.size(3) - x.size(3)
        x = F.pad(x, [dx // 2, dx - dx // 2, dy // 2, dy - dy // 2])
        return self.conv(torch.cat([skip, x], dim=1))

class CompactUNet(nn.Module):
    """Compact U-Net matching Seg03 Kaggle Notebook structure."""
    def __init__(self, in_channels=3, out_channels=1, base=32):
        super().__init__()
        self.inc = DoubleConv(in_channels, base)
        self.d1 = Down(base, base * 2)
        self.d2 = Down(base * 2, base * 4)
        self.d3 = Down(base * 4, base * 8)
        self.bottom = Down(base * 8, base * 16)
        self.u3 = Up(base * 16, base * 8, base * 8)
        self.u2 = Up(base * 8, base * 4, base * 4)
        self.u1 = Up(base * 4, base * 2, base * 2)
        self.u0 = Up(base * 2, base, base)
        self.out = nn.Conv2d(base, out_channels, 1)

    def forward(self, x):
        x0 = self.inc(x)
        x1 = self.d1(x0)
        x2 = self.d2(x1)
        x3 = self.d3(x2)
        xb = self.bottom(x3)
        x = self.u3(xb, x3)
        x = self.u2(x, x2)
        x = self.u1(x, x1)
        x = self.u0(x, x0)
        return self.out(x)

def build_deeplab_binary(weights_path=None, device="cpu"):
    """Build DeepLabV3-ResNet50 with binary crack segmentation head matching Seg04 Notebook."""
    from torchvision.models.segmentation import deeplabv3_resnet50
    model = deeplabv3_resnet50(weights=None, weights_backbone=None, aux_loss=True)
    in_channels = model.classifier[-1].in_channels
    model.classifier[-1] = nn.Conv2d(in_channels, 1, kernel_size=1)
    if hasattr(model, "aux_classifier") and model.aux_classifier is not None:
        aux_in_channels = model.aux_classifier[-1].in_channels
        model.aux_classifier[-1] = nn.Conv2d(aux_in_channels, 1, kernel_size=1)
    if weights_path and os.path.exists(weights_path):
        try:
            sd = torch.load(weights_path, map_location=device)
            if isinstance(sd, dict) and "model_state_dict" in sd:
                sd = sd["model_state_dict"]
            model.load_state_dict(sd)
            print(f"[DeepLabV3] Successfully loaded Seg04 weights from {weights_path}")
        except Exception as e:
            print(f"[DeepLabV3] Warning loading weights: {e}")
    return model

_LOADED_MODELS_CACHE = {}

def get_deep_learning_model(model_key, device, custom_weights=None):
    """Build or load PyTorch models based on model key with automatic weight binding and in-memory caching"""
    import os
    import glob

    weights_dir = os.path.join(os.path.dirname(__file__), "weights")
    root_model_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "Model", "U_Net_resnet34_512", "checkpoints"))
    weights_to_load = custom_weights

    # Normalize alias
    if model_key in ["unet_resnet34", "resunet34", "unet_resnet34_512"]:
        canonical_key = "unet_resnet34_512"
    elif model_key in ["deeplabv3_frozen", "deeplab_frozen", "deeplabv3plus_frozen"]:
        canonical_key = "deeplabv3_frozen"
    elif model_key in ["deeplabv3_finetuned", "deeplabv3plus", "deeplabv3", "deeplab", "deeplabv3plus_finetuned"]:
        canonical_key = "deeplabv3_finetuned"
    else:
        canonical_key = model_key

    if weights_to_load is None:
        if canonical_key == "compact_unet":
            candidates = glob.glob(os.path.join(weights_dir, "*compact*.pt*")) + \
                         glob.glob(os.path.join(weights_dir, "*unet*.pt*"))
        elif canonical_key == "deeplabv3_frozen":
            candidates = glob.glob(os.path.join(weights_dir, "*deeplabv3_frozen*.pth")) + \
                         glob.glob(os.path.join(weights_dir, "*frozen*.pth"))
        elif canonical_key == "deeplabv3_finetuned":
            candidates = glob.glob(os.path.join(weights_dir, "*deeplabv3_finetuned*.pth")) + \
                         glob.glob(os.path.join(weights_dir, "*finetuned*.pth")) + \
                         glob.glob(os.path.join(weights_dir, "*deeplab*.pth"))
        elif canonical_key == "unet_resnet34_512":
            candidates = glob.glob(os.path.join(weights_dir, "*resnet34*.pt*")) + \
                         glob.glob(os.path.join(weights_dir, "*resunet*.pt*")) + \
                         glob.glob(os.path.join(root_model_dir, "best_model_epoch059_iou0.5981.pth")) + \
                         glob.glob(os.path.join(root_model_dir, "*.pth"))
        else:
            candidates = []

        if candidates:
            weights_to_load = candidates[0]

    cache_key = (canonical_key, str(device), weights_to_load)
    if cache_key in _LOADED_MODELS_CACHE:
        return _LOADED_MODELS_CACHE[cache_key]

    if weights_to_load:
        print(f"[{canonical_key}] Auto-bound weights file: {weights_to_load}")

    model = None
    if canonical_key == "compact_unet":
        model = CompactUNet(in_channels=3, out_channels=1, base=32)
        if weights_to_load and os.path.exists(weights_to_load):
            try:
                ckpt = torch.load(weights_to_load, map_location=device)
                sd = ckpt["model_state_dict"] if (isinstance(ckpt, dict) and "model_state_dict" in ckpt) else ckpt
                model.load_state_dict(sd, strict=False)
                print(f"[CompactUNet] Successfully loaded trained weights from {weights_to_load}")
            except Exception as e:
                print(f"[CompactUNet] Error loading weights: {e}")

    elif canonical_key in ["deeplabv3_finetuned", "deeplabv3_frozen"]:
        try:
            model = build_deeplab_binary(weights_path=weights_to_load, device=device)
        except Exception as e:
            print(f"Fallback to SMP/CompactUNet: {e}")
            if SMP_AVAILABLE:
                model = smp.DeepLabV3Plus(encoder_name="resnet50", encoder_weights="imagenet", in_channels=3, classes=1)
            else:
                model = CompactUNet(in_channels=3, out_channels=1, base=32)

    elif canonical_key == "unet_resnet34_512":
        if SMP_AVAILABLE:
            model = smp.Unet(encoder_name="resnet34", encoder_weights=None, in_channels=3, classes=1)
        else:
            model = CompactUNet(in_channels=3, out_channels=1, base=32)
        if weights_to_load and os.path.exists(weights_to_load):
            try:
                ckpt = torch.load(weights_to_load, map_location=device)
                if isinstance(ckpt, dict) and "model_state" in ckpt:
                    sd = ckpt["model_state"]
                elif isinstance(ckpt, dict) and "model_state_dict" in ckpt:
                    sd = ckpt["model_state_dict"]
                elif isinstance(ckpt, dict) and "state_dict" in ckpt:
                    sd = ckpt["state_dict"]
                else:
                    sd = ckpt
                model.load_state_dict(sd, strict=True if SMP_AVAILABLE else False)
                print(f"[U-Net ResNet34 512] Successfully loaded trained weights: {weights_to_load}")
            except Exception as e:
                print(f"[U-Net ResNet34 512] Error loading weights: {e}")
    else:
        model = CompactUNet(in_channels=3, out_channels=1, base=32)

    model = model.to(device)
    model.eval()
    _LOADED_MODELS_CACHE[cache_key] = model
    return model

# Classical Edge Detection & Thresholding Algorithms
def process_classical_sobel(image_np, threshold=80):
    gray = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    sobelx = cv2.Sobel(blurred, cv2.CV_64F, 1, 0, ksize=3)
    sobely = cv2.Sobel(blurred, cv2.CV_64F, 0, 1, ksize=3)
    magnitude = np.sqrt(sobelx**2 + sobely**2)
    if np.max(magnitude) > 0:
        magnitude = np.uint8(255 * magnitude / np.max(magnitude))
    else:
        magnitude = np.uint8(magnitude)
    _, binary = cv2.threshold(magnitude, threshold, 255, cv2.THRESH_BINARY)
    return binary

def process_classical_canny(image_np, low_t=40, high_t=120):
    gray = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blurred, low_t, high_t)
    return edges
