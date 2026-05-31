# Passport Image Studio

A modern frontend-only image editor for resizing and compressing passport photos and signature images to strict KB limits. The app runs entirely in the browser and is ready for static hosting on GitHub Pages.

## Features

- Drag-and-drop upload for JPG, JPEG, and PNG images
- Original image preview with dimensions and file size
- Width and height controls with optional aspect-ratio locking
- Passport Photo, Signature, and Custom presets
- Target file size input in KB
- High-quality resizing with Pica
- Binary-search JPEG compression using `canvas.toBlob()`
- PNG handling for signatures with strict-size fallback
- Processed preview, final dimensions, final size, and download
- Mobile responsive Tailwind CSS interface
- No backend, no server-side processing, no image upload

## Tech Stack

- React + Vite
- Tailwind CSS
- Browser Canvas APIs
- Pica
- browser-image-compression

## Project Structure

```text
src/
  components/      Reusable UI controls and preview panels
  constants/       Presets and upload limits
  hooks/           Upload and processing state hooks
  pages/           Page-level composition
  services/        Image processing pipeline
  styles/          Tailwind entry CSS
  utils/           File, validation, and image metadata helpers
```

## Setup

```bash
npm install
npm run dev
```

Build the production static site:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## GitHub Pages Deployment

This project uses `base: './'` in `vite.config.js`, so the generated assets work when hosted from a repository subpath on GitHub Pages.

1. Push the repository to GitHub.
2. Run `npm run build`.
3. Deploy the `dist/` folder with one of these approaches:
   - Use a GitHub Actions workflow that builds and publishes `dist/`.
   - Use the `gh-pages` package to publish the build output.
   - Configure Pages to publish from a branch containing the static `dist/` output.

Example GitHub Actions workflow:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm install
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Processing Notes

The app resizes first and then compresses. JPEG output uses a binary search over quality values to find the highest quality image under the requested target size. Pica is used for cleaner resampling than basic canvas resizing, which helps preserve passport photo detail and signature readability.

PNG output is kept for signatures when possible. If a strict target cannot be achieved with PNG encoding, the app falls back to JPEG so form upload size limits can still be met.

## Future Extensions

The app is organized so these features can be added without changing the core upload and processing flow:

- Crop image
- Background removal
- Convert image format
- Brightness and contrast adjustments
- Rotate and flip
- Bulk processing
- PDF generation
