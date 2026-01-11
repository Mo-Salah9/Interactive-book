# Mobile Testing Guide

## Quick Local Network Test (No AR)

### 1. Start Your Server
On your computer, run:
```bash
python -m http.server 8000
```

### 2. Find Your Computer's IP Address

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" (example: 192.168.1.100)

**Mac/Linux:**
```bash
ifconfig | grep "inet "
```
Look for IP starting with 192.168

### 3. Connect Mobile Device
- Connect your phone to the **SAME WiFi** as your computer
- Open browser on phone
- Go to: `http://YOUR_IP:8000`

**Example:** `http://192.168.1.100:8000`

**Note:** AR features won't work on HTTP, only 3D viewing

---

## Deploy for Full AR Testing (HTTPS Required)

### Option 1: Netlify Drop (Easiest - 2 minutes)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your entire "Interactive Book" folder
3. Get instant HTTPS URL: `https://random-name.netlify.app`
4. Open on mobile - AR works! ✅

### Option 2: GitHub Pages (Free Forever)

1. **Create GitHub account** at [github.com](https://github.com)

2. **Create new repository**
   - Name it: `interactive-book`
   - Make it public

3. **Upload files**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/interactive-book.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings
   - Click "Pages" in sidebar
   - Source: Deploy from main branch
   - Save

5. **Access at:**
   `https://USERNAME.github.io/interactive-book`

### Option 3: Vercel (Very Fast)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd "Interactive Book"
   vercel
   ```

3. Follow prompts, get HTTPS URL

### Option 4: Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Initialize:
   ```bash
   firebase login
   firebase init hosting
   ```

3. Deploy:
   ```bash
   firebase deploy
   ```

---

## Testing AR Features

### iOS (iPhone/iPad)
- **Requires:** iOS 12+ (iPhone 6S or newer)
- **Browser:** Safari
- **Format:** Your app should have `.usdz` files in config

**Testing:**
1. Open your HTTPS URL in Safari
2. Tap a hotspot
3. Tap "View in AR" button
4. Point camera at floor/table
5. Model appears in real world! ✨

### Android
- **Requires:** ARCore compatible device ([Check list](https://developers.google.com/ar/devices))
- **Browser:** Chrome
- **Format:** `.glb` files work

**Testing:**
1. Open your HTTPS URL in Chrome
2. Tap a hotspot
3. Tap "View in AR" button
4. Point camera at flat surface
5. Tap to place model

---

## Troubleshooting Mobile Issues

### "Can't connect to server"
- ✅ Check both devices on same WiFi
- ✅ Verify IP address is correct
- ✅ Make sure firewall isn't blocking port 8000
- ✅ Try `0.0.0.0` instead of specific IP when starting server:
  ```bash
  python -m http.server 8000 --bind 0.0.0.0
  ```

### "AR button doesn't appear"
- ✅ Must use HTTPS (deploy online)
- ✅ Check device compatibility
- ✅ iOS needs Safari, Android needs Chrome

### "AR not working on iOS"
- ✅ Add `.usdz` files to your models folder
- ✅ Update config.json with `iosModel` paths
- ✅ Test .usdz file at [AR Quick Look Gallery](https://developer.apple.com/augmented-reality/quick-look/)

### "Model loads slowly on mobile"
- ✅ Optimize model file size (under 3MB recommended)
- ✅ Add `poster` images to config.json
- ✅ Use Draco compression

### "PDF looks weird on mobile"
- ✅ Scale might be too large - adjust in app.js:
  ```javascript
  scale: 1.2,  // Lower for mobile
  ```

---

## Mobile Performance Tips

### Optimize PDFs
- Keep under 10MB
- Reduce image quality if needed
- Limit to essential pages

### Optimize 3D Models
- **Target size:** Under 3MB for mobile
- **Use compression:** [gltf.report](https://gltf.report/)
- **Reduce polygons:** Use Blender to simplify
- **Compress textures:** Max 1024x1024 for mobile

### Test on Real Devices
Test on at least:
- ✅ One iOS device (iPhone/iPad)
- ✅ One Android device
- ✅ Different screen sizes
- ✅ Different network speeds

---

## Quick Deploy Commands

### Netlify (Manual)
1. Go to [netlify.com](https://netlify.com)
2. Drag folder to deploy

### GitHub Pages (Commands)
```bash
# One-time setup
git init
git add .
git commit -m "Interactive book"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main

# Then enable Pages in GitHub settings
```

### Using Python with Network Access
```bash
# Allow network access (Windows might ask for firewall permission)
python -m http.server 8000 --bind 0.0.0.0
```

---

## Mobile Testing Checklist

Before sharing with users:

- [ ] Test PDF loading on mobile
- [ ] Test page navigation (touch swipe)
- [ ] Test all hotspots (touch tap)
- [ ] Test 3D model interaction (pinch zoom, rotate)
- [ ] Test AR on iOS device
- [ ] Test AR on Android device
- [ ] Test on different screen sizes
- [ ] Test on slow network (3G simulation)
- [ ] Verify all models load
- [ ] Check text readability
- [ ] Test portrait and landscape modes

---

## Recommended Testing Tools

### Browser Developer Tools
- **Chrome DevTools:** Device simulation
  - F12 → Toggle device toolbar
  - Test different screen sizes

### Network Throttling
- Chrome DevTools → Network tab
- Set to "Fast 3G" or "Slow 3G"
- See how app performs on slow connections

### Real Device Testing
- **iOS:** Xcode Simulator (Mac only)
- **Android:** Android Studio Emulator
- **Best:** Real physical devices

---

## Sharing Your App

Once deployed to HTTPS, you can:

1. **Share the URL** via QR code
   - Use [qr-code-generator.com](https://www.qr-code-generator.com/)
   - Print QR codes in physical book

2. **Add to Home Screen**
   - iOS: Share → Add to Home Screen
   - Android: Menu → Add to Home Screen
   - Acts like a native app!

3. **Social Media**
   - Share link directly
   - Works on Facebook, Twitter, WhatsApp

---

## Need Help?

- **AR not working?** Make sure you're using HTTPS
- **Can't connect locally?** Check firewall settings
- **Models won't load?** Check file paths in config.json
- **Performance issues?** Optimize model sizes

For more help, check the main [README.md](README.md)
