# Architecture & How It Works

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Interactive Book App                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
        ┌──────────────────────────────────────┐
        │         index.html (Main UI)         │
        │  • Navigation controls               │
        │  • PDF canvas container              │
        │  • 3D model modal                    │
        │  • model-viewer component            │
        └──────────────────────────────────────┘
                 │                    │
                 ▼                    ▼
        ┌─────────────┐      ┌─────────────┐
        │  styles.css │      │   app.js    │
        │             │      │             │
        │ • Layout    │      │ • PDF       │
        │ • Hotspots  │      │   rendering │
        │ • Modals    │      │ • Hotspot   │
        │ • Animations│      │   creation  │
        │             │      │ • Model     │
        │             │      │   loading   │
        └─────────────┘      └─────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
            ┌──────────┐    ┌──────────┐    ┌──────────┐
            │ PDF.js   │    │  model-  │    │ config.  │
            │ Library  │    │  viewer  │    │  json    │
            │          │    │ Library  │    │          │
            │ Renders  │    │          │    │ Hotspot  │
            │ PDF to   │    │ 3D Model │    │ coords & │
            │ Canvas   │    │ Display  │    │ settings │
            └──────────┘    └──────────┘    └──────────┘
                                    │
                            ┌───────┴───────┐
                            ▼               ▼
                    ┌──────────┐    ┌──────────┐
                    │ book.pdf │    │  models/ │
                    │ (User's  │    │ *.glb    │
                    │  PDF)    │    │ *.usdz   │
                    └──────────┘    └──────────┘
```

## Data Flow

### 1. Application Initialization
```
User opens index.html
    │
    ▼
Load external libraries (PDF.js, model-viewer)
    │
    ▼
app.js init() function runs
    │
    ▼
Load config.json
    │
    ▼
Load book.pdf
    │
    ▼
Render page 1
```

### 2. PDF Rendering Process
```
renderPage(pageNum)
    │
    ▼
Get page from PDF.js
    │
    ▼
Calculate viewport dimensions
    │
    ▼
Render PDF to canvas
    │
    ▼
Update navigation buttons
    │
    ▼
Render hotspots for current page
```

### 3. Hotspot Creation Process
```
Find hotspots in config for current page
    │
    ▼
For each hotspot:
    │
    ▼
Create div element
    │
    ▼
Calculate position from percentages
    │
    ▼
Apply styles (border, background)
    │
    ▼
Add click event listener
    │
    ▼
Append to hotspot container
```

### 4. Model Viewing Flow
```
User clicks hotspot
    │
    ▼
openModelViewer(hotspot)
    │
    ▼
Set model-viewer src attribute
    │
    ▼
Set iOS USDZ model (if available)
    │
    ▼
Set poster image (if available)
    │
    ▼
Display title and description
    │
    ▼
Show modal
    │
    ▼
model-viewer loads and renders 3D model
```

### 5. AR Viewing Flow
```
User clicks "View in AR" button
    │
    ▼
model-viewer detects device/browser
    │
    ├─────────────────┬─────────────────┐
    ▼                 ▼                 ▼
iOS Device      Android Device    Unsupported
    │                 │                 │
    ▼                 ▼                 ▼
Quick Look      Scene Viewer      Fallback
(ARKit)         (ARCore)          message
    │                 │
    ▼                 ▼
Uses .usdz      Uses .glb
    │                 │
    ▼                 ▼
Native AR       Native AR
Experience      Experience
```

## Component Breakdown

### index.html Components
```html
<div class="container">
    │
    ├── <div class="navigation">
    │   ├── Previous button
    │   ├── Page indicator
    │   └── Next button
    │
    ├── <div class="book-container">
    │   └── <div class="pdf-viewer">
    │       ├── <canvas> (PDF rendered here)
    │       └── <div class="hotspot-container">
    │           └── [Dynamically created hotspots]
    │
    └── <div class="modal">
        └── <div class="modal-content">
            ├── Close button
            ├── Title
            ├── <model-viewer>
            │   └── AR button (slot)
            └── Description
```

### app.js State Management
```javascript
state = {
    pdfDoc: null,        // PDF.js document object
    currentPage: 1,      // Current page number
    totalPages: 0,       // Total pages in PDF
    scale: 1.5,         // Rendering scale
    config: null        // Loaded configuration
}
```

### config.json Structure
```json
{
  "pages": [
    {
      "page": 1,
      "hotspots": [
        {
          "x": 20,              // % from left
          "y": 30,              // % from top
          "width": 25,          // % of page width
          "height": 20,         // % of page height
          "label": "...",       // Hover text
          "title": "...",       // Modal title
          "description": "...", // Model description
          "model": "...",       // Path to GLB
          "iosModel": "...",    // Optional USDZ
          "poster": "..."       // Optional preview
        }
      ]
    }
  ]
}
```

## Event Flow Diagram

```
User Actions                 Application Response
─────────────               ────────────────────

Page Load
    │
    └──────────────────────> Load libraries
                              Load config
                              Load PDF
                              Render page 1
                              Create hotspots

Click Previous/Next
    │
    └──────────────────────> Update currentPage
                              Render new page
                              Clear old hotspots
                              Create new hotspots

Click Hotspot
    │
    └──────────────────────> Get hotspot config
                              Set model source
                              Show modal
                              Load 3D model

Rotate/Zoom Model
    │
    └──────────────────────> model-viewer handles
                              Camera controls
                              Touch/mouse events

Click "View in AR"
    │
    └──────────────────────> Detect device
                              Launch AR viewer
                              Display model in space

Click Close/ESC
    │
    └──────────────────────> Hide modal
                              Clear model source
                              Return to book

Keyboard Arrow Keys
    │
    └──────────────────────> Navigate pages
```

## File Dependencies

```
index.html
├── Requires: PDF.js (CDN)
├── Requires: model-viewer (CDN)
├── Requires: styles.css
├── Requires: app.js
└── Requires: config.json (loaded by app.js)

app.js
├── Requires: book.pdf
├── Requires: config.json
└── Requires: models/*.glb (paths from config)

config.json
└── References: models/*.glb, *.usdz, *.jpg
```

## Performance Considerations

### Lazy Loading Strategy
```
Initial Load:
├── HTML, CSS, JS (< 50KB total)
├── PDF.js library (~500KB)
├── model-viewer library (~200KB)
└── config.json (< 10KB)

On Demand:
├── PDF rendering (per page)
└── 3D models (only when clicked)
```

### Optimization Points

1. **PDF Rendering**
   - Only renders current page
   - Previous renders cached by browser
   - Responsive resize with debouncing

2. **Hotspot Positioning**
   - Uses percentages (scales automatically)
   - CSS transforms for positioning
   - No JavaScript calculation per frame

3. **3D Model Loading**
   - Lazy loaded on click
   - Poster images for preview
   - model-viewer handles caching

4. **Memory Management**
   - Modal content cleared on close
   - Only one page rendered at a time
   - Event listeners properly managed

## Security Considerations

### Content Security
- PDF.js runs in sandboxed mode
- No eval() or inline scripts
- External resources from trusted CDNs

### File Access
- All resources served via HTTP(S)
- No direct file system access
- CORS-friendly configuration

### AR Privacy
- AR requires user permission
- Camera access handled by OS
- No data collection

## Extension Points

Want to add features? Here's where to modify:

### Add Page Thumbnails
- Modify: [app.js](app.js)
- Add thumbnail rendering function
- Update UI in [index.html](index.html)

### Add Audio
- Modify: [config.json](config.json) - add audio paths
- Modify: [app.js](app.js) - add Audio API
- Update hotspot click handler

### Add Animations
- Modify: [styles.css](styles.css)
- Add CSS animations/transitions
- Trigger via JavaScript in [app.js](app.js)

### Add Search
- Modify: [app.js](app.js)
- Use PDF.js text extraction
- Add search UI to [index.html](index.html)

### Multi-PDF Support
- Modify: [config.json](config.json) - add PDF list
- Modify: [app.js](app.js) - add PDF switching
- Add selector UI to [index.html](index.html)

## Testing Strategy

### Unit Testing Areas
1. Config loading and parsing
2. Coordinate calculation (% to px)
3. Page navigation logic
4. Hotspot creation

### Integration Testing
1. PDF loading and rendering
2. Model viewer integration
3. AR mode activation
4. Keyboard navigation

### User Testing
1. Click all hotspots on all pages
2. Test on different screen sizes
3. Test AR on real devices
4. Cross-browser compatibility

## Debugging Tips

### Browser Console
```javascript
// Check current state
console.log(state);

// Check loaded config
console.log(state.config);

// Test page rendering
renderPage(2);

// Check canvas dimensions
console.log(canvas.width, canvas.height);
```

### Common Issues

**Hotspots not appearing?**
- Check browser console for errors
- Verify page number in config matches PDF page
- Check coordinates are 0-100

**Models not loading?**
- Check file paths in config
- Verify .glb files exist
- Test model at https://modelviewer.dev/

**AR not working?**
- Requires HTTPS
- Check device compatibility
- Verify .usdz for iOS, .glb for Android

---

For implementation details, see [README.md](README.md)

For quick start, see [QUICK_START.md](QUICK_START.md)
