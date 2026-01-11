# Quick Start Guide

Get your interactive book running in 5 minutes!

## Step 1: Add Your Files

1. Place your PDF file in this folder and rename it to `book.pdf`
2. Create a `models` folder
3. Add your 3D models to the models folder

## Step 2: Configure Hotspots (Easy Way)

1. Open `configurator.html` in your browser
2. Load your PDF file
3. Click and drag to select clickable areas
4. Fill in the model information
5. Copy the generated JSON
6. Paste it into `config.json`

## Step 3: Run the App

### Option A: Using Python (Recommended)
```bash
python -m http.server 8000
```
Then open: http://localhost:8000

### Option B: Using Node.js
```bash
npx http-server -p 8000
```
Then open: http://localhost:8000

### Option C: Using VS Code
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## Step 4: Test It!

1. Navigate through your PDF pages
2. Click on the hotspots you configured
3. View the 3D models
4. Try the AR mode on your phone!

## Need 3D Models?

### Free Models:
- https://sketchfab.com/
- https://poly.pizza/
- https://free3d.com/

### Convert Your Models:
- To GLB: Use Blender (File → Export → glTF 2.0)
- To USDZ: Use Reality Converter (Mac only) or online converters

## Troubleshooting

### PDF not showing?
- Make sure it's named `book.pdf`
- Check that you're using a web server (not opening the HTML file directly)

### Models not loading?
- Verify the file paths in config.json
- Make sure the .glb files are in the models folder
- Check browser console (F12) for errors

### Need help?
See the full [README.md](README.md) for detailed instructions.
