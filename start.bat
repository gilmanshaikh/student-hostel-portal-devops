@echo off
title HostelHub
cd /d "%~dp0"

echo.
echo  HostelHub - Starting backend + frontend...
echo.

if not exist "backend\node_modules\" (
  echo Installing backend...
  pushd backend && call npm install && popd
)

if not exist "fronted\node_modules\" (
  echo Installing frontend...
  pushd fronted && call npm install && popd
)

echo Starting BACKEND on http://localhost:5000 ...
start "HostelHub Backend" cmd /k "cd /d "%~dp0backend" && npm run dev"

echo Waiting for backend...
timeout /t 5 /nobreak >nul

echo Starting FRONTEND on http://localhost:5173 ...
start "HostelHub Frontend" cmd /k "cd /d "%~dp0fronted" && npm run dev"

echo Waiting for frontend...
timeout /t 6 /nobreak >nul

start http://localhost:5173

echo.
echo  Website:  http://localhost:5173
echo  API:      http://localhost:5000
echo.
echo  Keep BOTH terminal windows open.
echo  If you see "Connection failed", backend or frontend is not running.
echo.
pause
