# Image-Resizer-App

Image-Resizer-App is a modern, frontend-only web application for resizing and compressing photos and signature images for online forms. It is designed for cases where portals require strict dimensions and file-size limits, such as `15 KB`, while still maintaining maximum possible clarity.

The application runs entirely in the browser. Images are not uploaded to any server, and no backend is required.

## Live Demo

This project is hosted on GitHub Pages.

Use below URL to open the live application.

```text
https://shah-shivam-410.github.io/Image-Resizer-App/
```

## Why This App

Many online portals require scanned photos and signatures in exact dimensions and very small file sizes. Manually resizing images with generic tools often makes them blurry, stretched, or too large to upload.

Image-Resizer-App solves this by allowing users to:

- Enter dimensions in centimeters or pixels
- Set DPI/PPI for accurate centimeter-to-pixel conversion
- Compress images to a target size in KB
- Preview the output before downloading
- Keep processing private inside the browser

## Important Usage Note

This app is focused on resizing and compressing already-prepared images.

Before uploading an image to this app, the user should manually crop and adjust the photo or signature using another tool if needed. For best results:

- Crop the photo or signature to the required visible area first
- Make sure the face/photo or signature is properly centered
- Make sure the background and lighting are acceptable
- For signatures, use a clear black or blue signature on white paper
- Then upload the prepared image to this app
- Use this app to set the required centimeter dimensions and target KB file size

Crop, rotate, background cleanup, and image filters are not currently supported in this app.

## Common Use Cases

- Government exam application forms
- Government scheme application forms
- Scholarship and admission portals
- Job application portals
- School, college, and university forms
- Passport photo and signature preparation
- Identity verification forms
- Recruitment and eligibility forms
- Banking, insurance, and financial service forms
- Any online portal that asks for a photo or signature under a fixed KB limit

## Default Presets

The current defaults are configured for a common form requirement:

| Preset | Size | DPI | Pixel Output | Target Size | Output |
|---|---:|---:|---:|---:|---|
| Passport Photo | 3.6 cm x 5 cm | 300 | 425 x 591 px | 15 KB | JPG |
| Signature | 7.5 cm x 2.5 cm | 300 | 886 x 295 px | 15 KB | JPG |

Users can change the dimensions, DPI, and target size as needed.

## Privacy

Image processing happens completely in the browser using Canvas APIs and JavaScript libraries. The app does not send the selected image to any backend server.

This makes it useful for sensitive documents where users may not want to upload photos or signatures to third-party compression websites.

## How It Works

The processing flow is:

1. User uploads an image.
2. App reads the original dimensions and file size.
3. User selects or enters the required dimensions.
4. If centimeters are used, the app converts them to pixels using:

```text
centimeters / 2.54 x DPI = pixels
```

5. The image is resized using Pica for high-quality resampling.
6. The resized image is compressed using a binary-search quality algorithm.
7. The best possible JPG output is generated under, or as close as possible to, the target KB size.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Browser Canvas APIs
- Pica
- browser-image-compression
- lucide-react

## Local Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the production version:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## GitHub Pages Deployment

This project is configured for GitHub Pages deployment. The Vite config uses:

```js
base: './'
```

That allows the built assets to work correctly from a GitHub Pages repository subpath.

The included workflow is located at:

```text
.github/workflows/deploy-pages.yml
```

## Future Improvements

The architecture is organized to support future features such as:

- Crop image
- Background removal
- Format conversion
- Brightness and contrast controls
- Rotate and flip
- Bulk image processing
- PDF generation
- More exam and portal-specific presets

## Created With Codex by OpenAI

This project was created with the help of **Codex by OpenAI**.

Codex assisted in designing and implementing the frontend-only architecture, reusable React components, browser-based image processing flow, Tailwind CSS interface, and GitHub Pages deployment setup.

The goal of using Codex was to build a practical, user-friendly tool that can help people resize and compress photos or signatures for online forms without needing a backend server or external image upload service.
