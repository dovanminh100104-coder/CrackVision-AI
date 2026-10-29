import ctypes
import os
import sys
import subprocess

def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin() != 0
    except Exception:
        return False

def main():
    if not is_admin():
        print("[INFO] Yeu cau quyen Administrator de them ten mien vao Windows...")
        print("Dang mo hop thoai xac nhan UAC (Vui long bam YES tren man hinh)...")
        # Elevate using native Windows API
        script_path = os.path.abspath(__file__)
        ret = ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, f'"{script_path}"', None, 1)
        if ret <= 32:
            print("[LOI] Ban da bam No hoac khong the cap quyen Administrator.")
            input("\nNhan Enter de thoat...")
        return

    # When elevated:
    system_root = os.environ.get("SystemRoot", r"C:\Windows")
    hosts_path = os.path.join(system_root, "System32", "drivers", "etc", "hosts")

    try:
        os.chmod(hosts_path, 0o666)
    except Exception:
        pass

    with open(hosts_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    entries = [
        "127.0.0.1 crackvision.ai",
        "127.0.0.1 www.crackvision.ai",
        "127.0.0.1 crackvision.local",
        "127.0.0.1 www.crackvision.local"
    ]

    to_add = [e for e in entries if e not in content]

    if to_add:
        with open(hosts_path, "a", encoding="utf-8") as f:
            f.write("\n\n# AI CrackVision Pro Official Domain\n")
            for e in to_add:
                f.write(e + "\n")
        print("[OK] Da them cac ten mien vao file hosts he thong thanh cong!")
    else:
        print("[OK] Ten mien crackvision.ai da ton tai trong file hosts.")

    # Flush DNS cache
    subprocess.run(["ipconfig", "/flushdns"], capture_output=True)

    print("\n" + "=" * 66)
    print("   [THANH CONG RUC RO] CAI DAT TEN MIEN CHINH THUC HOAN TAT!")
    print("=" * 66)
    print("  Bay gio ban da co the truy cap bang:")
    print("    👉 http://crackvision.ai")
    print("    👉 http://crackvision.local")
    print("=" * 66 + "\n")
    input("Nhan Enter de hoan tat va dong cua so nay...")

if __name__ == "__main__":
    main()
