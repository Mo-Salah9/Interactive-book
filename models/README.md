# 3D Models Folder

Place your 3D model files here.

## Required Files

For each interactive element, you need:
- **GLB file** (required): Universal 3D format that works everywhere
  - Example: `model1.glb`

## Optional Files

- **USDZ file** (optional): For iOS AR support
  - Example: `model1.usdz`
- **Poster/Preview image** (optional): Shows before model loads
  - Example: `poster1.jpg`

## File Naming

Use descriptive names that match your config.json:
```
models/
├── astronaut.glb
├── astronaut.usdz
├── astronaut-poster.jpg
├── robot.glb
├── robot.usdz
└── robot-poster.jpg
```

## Where to Get Models

### Free 3D Models
- **Sketchfab**: https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount
- **Poly Pizza**: https://poly.pizza/
- **Free3D**: https://free3d.com/

### Create Your Own
- **Blender** (Free): https://www.blender.org/
- Export as glTF 2.0 (.glb)

### Convert Models

**To GLB:**
1. Blender: File → Export → glTF 2.0 (.glb)
2. Online: https://products.aspose.app/3d/conversion

**To USDZ (for iOS AR):**
1. Reality Converter (Mac): https://developer.apple.com/augmented-reality/tools/
2. Online: https://products.aspose.app/3d/conversion/glb-to-usdz

## File Size Recommendations

- **Web viewing**: Under 5MB
- **AR viewing**: Under 3MB
- **Mobile devices**: Under 2MB

Compress large models using:
- https://gltf.report/
- Blender with Draco compression

## Testing Your Models

Before adding to your book, test at:
- https://modelviewer.dev/editor/

Make sure:
- Model appears correctly
- Textures are visible
- File size is reasonable
- AR mode works (on phone)
