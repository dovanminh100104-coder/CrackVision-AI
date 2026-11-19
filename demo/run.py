import os
import sys
import time
import socket
import threading
import webbrowser
import uvicorn

DEMO_DIR = os.path.dirname(os.path.abspath(__file__))
if DEMO_DIR not in sys.path:
    sys.path.insert(0, DEMO_DIR)

def is_port_available(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.bind(('0.0.0.0', port))
            return True
        except Exception:
            return False

def free_port(port):
    """Release port if occupied by previous process"""
    if is_port_available(port):
        return
    try:
        cmd = f'powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort {port} -ErrorAction SilentlyContinue | ForEach-Object {{ Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }}"'
        import subprocess
        subprocess.run(cmd, shell=True, capture_output=True)
        time.sleep(0.5)
    except Exception:
        pass

def is_domain_configured(domain="crackvision.ai"):
    try:
        ip = socket.gethostbyname(domain)
        return ip.startswith("127.")
    except Exception:
        return False

def open_browser_when_ready(port_80_active):
    time.sleep(1.8)
    domain_ok = is_domain_configured("crackvision.ai")
    if domain_ok:
        target_url = "http://crackvision.ai" if port_80_active else "http://crackvision.ai:8000"
    else:
        target_url = "http://localhost:8000"
    backup_url = "http://localhost:8000"

    print(f"\n[TRINH DUYET] Dang tu dong mo: {target_url}", flush=True)
    if not domain_ok:
        print("[LƯU Ý] Chưa kích hoạt tên miền ảo, đang chạy trên: http://localhost:8000", flush=True)
        print("        Để dùng tên miền http://crackvision.ai, chạy setup_domain.bat với quyền Admin.\n", flush=True)
    else:
        print(f"[CHU Y] Neu trinh duyet chan Webcam tren ten mien rieng, ban chi can mo: {backup_url}\n", flush=True)
    try:
        import subprocess
        # Su dung user-data-dir rieng de Chrome ap dung co bao mat bat Webcam cho ten mien rieng ke ca khi Chrome dang bat
        temp_profile = os.path.join(os.environ.get("TEMP", "C:\\Temp"), "crackvision_chrome")
        cmd = f'start "" chrome --user-data-dir="{temp_profile}" --unsafely-treat-insecure-origin-as-secure="http://crackvision.ai,http://crackvision.ai:8000,http://localhost:8000" "{target_url}"'
        subprocess.run(cmd, shell=True)
    except Exception:
        webbrowser.open(target_url)

if __name__ == "__main__":
    from backend.main import app

    free_port(8000)
    free_port(80)
    port_80_ok = is_port_available(80)

    print("\n" + "=" * 70, flush=True)
    print("   AI CRACKVISION PRO - HE THONG KIEM DINH KET CAU BE TONG", flush=True)
    print("=" * 70, flush=True)
    print("  [TEN MIEN CHINH THUC]:  http://crackvision.ai", flush=True)
    print("  [TEN MIEN NOI BO]:      http://crackvision.local", flush=True)
    print("  [DU PHONG]:             http://localhost:8000", flush=True)
    print("=" * 70 + "\n", flush=True)

    # Launch browser thread
    b_thread = threading.Thread(target=open_browser_when_ready, args=(port_80_ok,), daemon=True)
    b_thread.start()

    # If Port 80 is available, bind it so http://crackvision.ai works without :8000
    if port_80_ok:
        t80 = threading.Thread(
            target=uvicorn.run,
            args=(app,),
            kwargs={"host": "0.0.0.0", "port": 80, "log_level": "warning"},
            daemon=True
        )
        t80.start()

    # Main thread on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="warning")

