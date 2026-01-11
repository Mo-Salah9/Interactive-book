# Interactive Book Web App

A web application that transforms your PDF into an interactive experience with clickable 3D models and AR viewing capabilities.

## Features

- PDF page rendering with navigation
- Clickable hotspots on PDF pages
- 3D model viewer using Google's model-viewer
- AR (Augmented Reality) support for mobile devices
- Responsive design
- Keyboard navigation support
- Animated interactions

## Setup Instructions

### 1. Add Your PDF File

Place your PDF file in the project directory and name it `book.pdf`, or update the filename in [app.js:42](app.js#L42):

```javascript
await loadPDF('your-filename.pdf');
```

### 2. Add Your 3D Models

Create a `models` folder and add your 3D model files:

```
Interactive Book/
├── models/
│   ├── model1.glb
│   ├── model1.usdz (for iOS AR)
│   ├── poster1.jpg (preview image)
│   ├── model2.glb
│   └── ...
```

**Supported 3D formats:**
- `.glb` / `.gltf` - Standard format (works on all platforms)
- `.usdz` - For iOS AR support (optional but recommended for iOS devices)

### 3. Configure Clickable Areas

Edit [config.json](config.json) to define clickable hotspots on your PDF pages.

**Configuration Format:**

```json
{
  "pages": [
    {
      "page": 1,
      "hotspots": [
        {
          "x": 20,          // X position (percentage from left)
          "y": 30,          // Y position (percentage from top)
          "width": 25,      // Width (percentage of page width)
          "height": 20,     // Height (percentage of page height)
          "label": "Click to view 3D model",
          "title": "Model Title",
          "description": "Model description text",
          "model": "models/model1.glb",
          "iosModel": "models/model1.usdz",  // Optional: for iOS AR
          "poster": "models/poster1.jpg"      // Optional: preview image
        }
      ]
    }
  ]
}
```

**How to find coordinates:**

1. Open your PDF in the app
2. Use browser developer tools (F12)
3. In the console, calculate coordinates:
   - Hover over the desired area
   - Note the position relative to the page
   - Convert to percentages (e.g., 200px on a 1000px wide page = 20%)

### 4. Run the Application

Since this uses external resources (PDF.js, model-viewer), you need to run it through a local web server.

**Option 1: Using Python**
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

**Option 2: Using Node.js (http-server)**
```bash
npm install -g http-server
http-server -p 8000

# Then open: http://localhost:8000
```

**Option 3: Using VS Code Live Server**
- Install "Live Server" extension
- Right-click on [index.html](index.html)
- Select "Open with Live Server"

## How to Use

### Navigation
- **Next/Previous buttons** - Navigate between pages
- **Arrow keys** - Left/Right to change pages
- **ESC key** - Close the 3D model viewer

### Viewing 3D Models
1. Click on any highlighted hotspot area
2. The 3D model viewer will open
3. Interact with the model:
   - **Drag** to rotate
   - **Pinch/scroll** to zoom
   - **Two-finger drag** to pan

### AR Mode
1. Open the app on a mobile device (iOS or Android)
2. Click on a hotspot to open the 3D viewer
3. Tap the "View in AR" button
4. Point your camera at a flat surface
5. The model will appear in your real environment

**AR Requirements:**
- iOS: ARKit-enabled device (iPhone 6S or newer)
- Android: ARCore-enabled device with Chrome

## Creating 3D Models

### Where to Get Models
- **Free models:** [Sketchfab](https://sketchfab.com/), [Poly Pizza](https://poly.pizza/)
- **Create your own:** Blender, Maya, 3ds Max
- **Convert existing models:** Use online converters

### Converting to GLB/USDZ

**To GLB (universal format):**
1. Use Blender (free):
   - Import your model
   - Export → glTF 2.0 (.glb)

2. Online converters:
   - https://products.aspose.app/3d/conversion
   - https://imagetostl.com/convert/file/obj/to/glb

**To USDZ (for iOS AR):**
1. Use Reality Converter (macOS only):
   - Download from Apple
   - Drag and drop your .glb file
   - Export as .usdz

2. Online converters:
   - https://products.aspose.app/3d/conversion/glb-to-usdz

### Optimizing Models
- Keep file size under 5MB for web performance
- Reduce polygon count for mobile devices
- Compress textures
- Use tools like [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline)

## Customization

### Styling
Edit [styles.css](styles.css) to customize:
- Colors and themes
- Hotspot appearance
- Modal design
- Animations

### Model Viewer Options
Edit [index.html](index.html) to add more model-viewer features:

```html
<model-viewer
    camera-controls
    auto-rotate
    auto-rotate-delay="0"
    rotation-per-second="30deg"
    environment-image="neutral"
    shadow-intensity="1"
    exposure="1"
    ...>
</model-viewer>
```

See [model-viewer documentation](https://modelviewer.dev/docs/) for all options.

## Troubleshooting

### PDF not loading
- Ensure `book.pdf` exists in the project directory
- Check browser console for errors
- Make sure you're running through a web server (not opening index.html directly)

### 3D models not showing
- Verify model paths in [config.json](config.json)
- Check that .glb files exist in the models folder
- Open browser console to see any loading errors
- Test models at https://modelviewer.dev/ to ensure they're valid

### AR not working
- Ensure you're on HTTPS (required for AR)
- Check device AR compatibility
- For iOS, include .usdz file
- For Android, use Chrome browser

### Hotspots not clickable
- Verify coordinates are within 0-100 range
- Check that the page number in config matches the PDF page
- Inspect element to ensure hotspot is positioned correctly

## Browser Compatibility

- **Chrome/Edge:** Full support
- **Firefox:** Full support (AR limited)
- **Safari:** Full support including AR on iOS
- **Mobile browsers:** Full support with AR capabilities

## File Structure

```
Interactive Book/
├── index.html          # Main HTML file
├── styles.css          # Styling
├── app.js             # Application logic
├── config.json        # Hotspot configuration
├── book.pdf           # Your PDF file
├── models/            # 3D model files
│   ├── *.glb
│   ├── *.usdz
│   └── *.jpg
└── README.md          # This file
```

## Credits

- [PDF.js](https://mozilla.github.io/pdf.js/) - Mozilla's PDF rendering library
- [model-viewer](https://modelviewer.dev/) - Google's 3D model viewer web component

## License

This project is free to use and modify for your needs.
