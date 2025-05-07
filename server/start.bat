@echo off
start /B akio-local-engine.exe
timeout /t 3 >nul
start my-app-server.exe
