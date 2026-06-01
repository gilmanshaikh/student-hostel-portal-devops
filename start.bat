@echo off
title HostelHub
cd /d "%~dp0"

echo.
echo  ============================================
echo    HostelHub - Starting...
echo  ============================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo  ERROR: Node.js is not installed.
  echo  Install from https://nodejs.org/ then run this file again.
  echo.
  pause
  exit /b 1
)

if not exist "backend\.env" (
  echo  Creating backend\.env from example...
  copy /Y "backend\.env.example" "backend\.env" >nul 2>&1
  echo  IMPORTANT: Edit backend\.env and set your MongoDB Atlas MONGODB_URI
  echo.
)

if not exist "fronted\.env" (
  echo  VITE_API_URL=http://localhost:5000/api> "fronted\.env"
)

echo  Installing dependencies (first time may take 2-3 minutes)...
call npm run setup
if errorlevel 1 (
  echo.
  echo  Setup failed. Check your internet connection and try again.
  pause
  exit /b 1
)

echo.
echo  Starting backend (port 5000) + frontend (port 5173)...
echo  Open in browser: http://localhost:5173
echo.
echo  Press Ctrl+C in this window to stop.
echo  ============================================
echo.

start "" cmd /c "timeout /t 8 /nobreak >nul && start http://localhost:5173"

call npm start

pause
