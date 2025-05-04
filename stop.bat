@echo off
taskkill /IM flask-app.exe /F >nul 2>&1
echo Flaskアプリケーションを終了しました
timeout /t 3 >nul
