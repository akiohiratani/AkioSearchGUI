@echo off
start /B flask-app.exe
timeout /t 3 >nul
start my-app-server.exe
