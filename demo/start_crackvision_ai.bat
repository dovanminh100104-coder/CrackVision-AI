@echo off
title AI CrackVision Pro - May Chu AI (crackvision.ai)
color 0A
cd /d "%~dp0"

:: Dam bao uu tien Python da cai dat thay vi WindowsApps stub
if exist "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" (
    set "PATH=%LOCALAPPDATA%\Programs\Python\Python311\;%LOCALAPPDATA%\Programs\Python\Python311\Scripts\;%PATH%"
)

echo ========================================================================
echo        AI CRACKVISION PRO - SURFACE CRACK INSPECTION SYSTEM
echo ========================================================================
echo.
echo Dang khoi dong may chu tai: http://crackvision.ai ...
echo.

:: Tu dong giai phong cong 80 va 8000 neu con ton tai tien trinh cu
powershell -NoProfile -Command "80, 8000 | ForEach-Object { Get-NetTCPConnection -LocalPort $_ -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue } }"

python -u run.py
pause


