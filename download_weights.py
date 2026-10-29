#!/usr/bin/env python3
"""
CrackVision AI - Model Weights Downloader
Downloads pretrained model checkpoints from official GitHub Releases into demo/backend/weights/
"""

import os
import sys
import urllib.request
import shutil

RELEASE_TAG = "v1.0.0"
REPO_OWNER = "dovanminh100104-coder"
REPO_NAME = "CrackVision-AI"
BASE_URL = f"https://github.com/{REPO_OWNER}/{REPO_NAME}/releases/download/{RELEASE_TAG}"

WEIGHTS_FILES = {
    "unet_resnet34_512.pth": {
        "url": f"{BASE_URL}/unet_resnet34_512.pth",
        "desc": "U-Net ResNet-34 512x512 (Recommended - High Accuracy IoU 0.598)",
        "size_mb": 280
    },
    "deeplabv3_finetuned_binary_crack.pth": {
        "url": f"{BASE_URL}/deeplabv3_finetuned_binary_crack.pth",
        "desc": "DeepLabV3+ Fine-Tuned Backbone",
        "size_mb": 160
    },
    "deeplabv3_frozen_backbone_binary_crack.pth": {
        "url": f"{BASE_URL}/deeplabv3_frozen_backbone_binary_crack.pth",
        "desc": "DeepLabV3+ Frozen Backbone",
        "size_mb": 160
    }
}

def format_progress(block_num, block_size, total_size):
    downloaded = block_num * block_size
    if total_size > 0:
        percent = min(100.0, downloaded * 100.0 / total_size)
        mb_down = downloaded / (1024 * 1024)
        mb_total = total_size / (1024 * 1024)
        bar_len = 30
        filled = int(bar_len * percent / 100.0)
        bar = "=" * filled + "-" * (bar_len - filled)
        sys.stdout.write(f"\r  [{bar}] {percent:5.1f}% ({mb_down:6.1f} MB / {mb_total:6.1f} MB)")
        sys.stdout.flush()

def download_all_weights():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    target_dir = os.path.join(script_dir, "demo", "backend", "weights")
    os.makedirs(target_dir, exist_ok=True)

    print("=" * 70)
    print("  CrackVision AI - Checkpoint Weights Downloader")
    print(f"  Target directory: {target_dir}")
    print("=" * 70)

    for filename, info in WEIGHTS_FILES.items():
        dest_path = os.path.join(target_dir, filename)
        if os.path.exists(dest_path) and os.path.getsize(dest_path) > 1024 * 1024 * 10:
            print(f"\n[OK] {filename} is already present ({os.path.getsize(dest_path)/(1024*1024):.1f} MB). Skipping.")
            continue

        print(f"\n[DOWNLOADING] {info['desc']}")
        print(f"  Source: {info['url']}")
        temp_dest = dest_path + ".download"
        try:
            urllib.request.urlretrieve(info["url"], temp_dest, reporthook=format_progress)
            print()
            shutil.move(temp_dest, dest_path)
            print(f"  [SUCCESS] Saved {filename}")
        except Exception as e:
            if os.path.exists(temp_dest):
                try: os.remove(temp_dest)
                except Exception: pass
            print(f"\n  [ERROR] Failed to download {filename}: {e}")
            print(f"  You can manually download this file from: {info['url']}")
            print(f"  and place it into: {target_dir}")

    print("\n" + "=" * 70)
    print("  All weights processed. You can now launch the application:")
    print("  python demo/run.py")
    print("=" * 70)

if __name__ == "__main__":
    download_all_weights()
