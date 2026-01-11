@echo off
echo ========================================
echo Interactive Book - Starting Server
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Starting server with Python...
    echo Open your browser to: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
) else (
    echo Python is not installed or not in PATH
    echo.
    echo Please install Python from https://www.python.org/
    echo Or use one of these alternatives:
    echo.
    echo 1. Install Node.js and run: npx http-server -p 8000
    echo 2. Use VS Code Live Server extension
    echo.
    pause
)
