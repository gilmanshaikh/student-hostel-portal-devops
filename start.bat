@echo off
title HostelHub
cd /d "%~dp0"

echo.
echo  HostelHub - starting backend and frontend...
echo  Do NOT open index.html in the browser. Use http://localhost:5173
echo.

if not exist "backend\node_modules\" (
  echo Installing backend dependencies...
  cd backend
  call npm install
  cd ..
)

if not exist "fronted\node_modules\" (
  echo Installing frontend dependencies...
  cd fronted
  call npm install
  cd ..
)

start "HostelHub Backend" cmd /k "cd /d "%~dp0backend" && npm run dev"
timeout /t 2 /nobreak >nul
start "HostelHub Frontend" cmd /k "cd /d "%~dp0fronted" && npm run dev"
timeout /t 4 /nobreak >nul
start http://localhost:5173

echo.
echo  Open http://localhost:5173 if the browser did not open.
echo  Keep both black terminal windows open while using the app.
echo.
pause
