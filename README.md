# Image-Resizer-App

Image-Resizer-App is a modern, frontend-only web application for resizing and compressing photos and signature images for online forms. It is designed for cases where portals require strict dimensions and file-size limits, such as `15 KB`, while still keeping the image clear and readable.

The application runs entirely in the browser. Images are not uploaded to any server, and no backend is required.

## Live Demo

This project is ready to host on GitHub Pages.

After deployment, the app will be available at:

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

## Key Features

- JPG, JPEG, and PNG upload support
- Drag-and-drop image upload
- Original image preview
- Original dimensions and file size display
- Centimeter and pixel input modes
- DPI/PPI-based conversion
- Passport Photo, Signature, and Custom presets
- Target file size input in KB
- Quick target-size buttons including `15 KB`
- High-quality resizing using Pica
- Binary-search JPEG compression for better clarity
- Processed image preview
- Final dimensions and final file size display
- Download button for the optimized image
- Mobile responsive interface
- Error messages with practical suggestions, such as lowering DPI when the target size is too strict
- Fully static and GitHub Pages compatible

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

## Project Structure

```text
src/
  components/      Reusable UI controls and preview panels
  constants/       Presets and upload limits
  hooks/           Upload and processing state hooks
  pages/           Page-level app layout
  services/        Image processing pipeline
  styles/          Tailwind CSS entry file
  utils/           File, validation, dimension, and metadata helpers
```

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

### Recommended Deployment Steps

1. Push the project to a GitHub repository.
2. Open the repository on GitHub.
3. Go to **Settings**.
4. Open **Pages**.
5. Under **Build and deployment**, set **Source** to **GitHub Actions**.
6. Push to the `main` branch.
7. GitHub Actions will build and deploy the app automatically.

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

## Created With Codex

This project was created with Codex as a coding assistant, with a focus on a clean frontend-only architecture, reusable React components, browser-based image processing, and GitHub Pages deployment.
