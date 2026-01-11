#!/bin/bash

echo "========================================"
echo "Interactive Book - Starting Server"
echo "========================================"
echo ""

# Check if Python 3 is installed
if command -v python3 &> /dev/null; then
    echo "Starting server with Python..."
    echo "Open your browser to: http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
# Check if Python 2 is installed
elif command -v python &> /dev/null; then
    echo "Starting server with Python..."
    echo "Open your browser to: http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000
# Check if Node.js is installed
elif command -v npx &> /dev/null; then
    echo "Starting server with Node.js..."
    echo "Open your browser to: http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    echo ""
    npx http-server -p 8000
else
    echo "No suitable HTTP server found!"
    echo ""
    echo "Please install one of the following:"
    echo "1. Python: https://www.python.org/"
    echo "2. Node.js: https://nodejs.org/"
    echo ""
    echo "Or use VS Code Live Server extension"
fi
