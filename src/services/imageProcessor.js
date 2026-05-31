import imageCompression from 'browser-image-compression';
import Pica from 'pica';
import { fileToImageBitmap } from '../utils/imageMeta.js';
import { bytesToKb, kbToBytes } from '../utils/fileUtils.js';

const pica = Pica({
  features: ['js', 'wasm', 'ww'],
});

function createCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  return canvas;
}

function flattenForJpeg(canvas) {
  const flattenedCanvas = createCanvas(canvas.width, canvas.height);
  const context = flattenedCanvas.getContext('2d', { alpha: false });
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, flattenedCanvas.width, flattenedCanvas.height);
  context.drawImage(canvas, 0, 0);
  return flattenedCanvas;
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Could not encode the processed image.'));
      },
      type,
      quality,
    );
  });
}

async function sourceToCanvas(source, width, height) {
  const sourceWidth = source.width || source.naturalWidth;
  const sourceHeight = source.height || source.naturalHeight;
  const sourceCanvas = createCanvas(sourceWidth, sourceHeight);
  const context = sourceCanvas.getContext('2d', { alpha: true });
  context.drawImage(source, 0, 0);

  const targetCanvas = createCanvas(width, height);
  await pica.resize(sourceCanvas, targetCanvas, {
    quality: 3,
    alpha: true,
    unsharpAmount: 80,
    unsharpRadius: 0.6,
    unsharpThreshold: 2,
  });

  if (typeof source.close === 'function') source.close();
  return targetCanvas;
}

async function runBrowserImageCompression(blob, targetBytes, type) {
  const file = new File([blob], `compressed.${type === 'image/png' ? 'png' : 'jpg'}`, {
    type,
  });

  return imageCompression(file, {
    maxSizeMB: targetBytes / (1024 * 1024),
    useWebWorker: true,
    fileType: type,
    initialQuality: 0.92,
    alwaysKeepResolution: true,
  });
}

async function binarySearchJpeg(canvas, targetBytes, onProgress) {
  const jpegCanvas = flattenForJpeg(canvas);
  let low = 0.35;
  let high = 0.96;
  let bestBlob = await canvasToBlob(jpegCanvas, 'image/jpeg', high);
  let bestQuality = high;

  if (bestBlob.size <= targetBytes) {
    return { blob: bestBlob, quality: high, reachedTarget: true };
  }

  for (let step = 1; step <= 9; step += 1) {
    const quality = (low + high) / 2;
    const candidate = await canvasToBlob(jpegCanvas, 'image/jpeg', quality);
    onProgress?.(45 + Math.round((step / 9) * 45));

    if (candidate.size <= targetBytes) {
      bestBlob = candidate;
      bestQuality = quality;
      low = quality;
    } else {
      high = quality;
    }

    await new Promise((resolve) => window.setTimeout(resolve, 0));
  }

  if (bestBlob.size > targetBytes) {
    const fallback = await runBrowserImageCompression(bestBlob, targetBytes, 'image/jpeg');
    return {
      blob: fallback,
      quality: bestQuality,
      reachedTarget: fallback.size <= targetBytes,
    };
  }

  return { blob: bestBlob, quality: bestQuality, reachedTarget: true };
}

async function encodePngOrFallback(canvas, targetBytes, onProgress) {
  const pngBlob = await canvasToBlob(canvas, 'image/png');
  if (pngBlob.size <= targetBytes) {
    return { blob: pngBlob, quality: 1, type: 'image/png', reachedTarget: true };
  }

  onProgress?.(55);
  const compressedPng = await runBrowserImageCompression(pngBlob, targetBytes, 'image/png');
  if (compressedPng.size <= targetBytes) {
    return { blob: compressedPng, quality: 1, type: 'image/png', reachedTarget: true };
  }

  // PNG has limited quality controls in browsers. JPEG fallback protects strict form limits.
  const jpeg = await binarySearchJpeg(canvas, targetBytes, onProgress);
  return {
    ...jpeg,
    type: 'image/jpeg',
    reachedTarget: jpeg.blob.size <= targetBytes,
  };
}

export async function processImage(file, options, onProgress) {
  onProgress?.(8);
  const source = await fileToImageBitmap(file);

  onProgress?.(20);
  const canvas = await sourceToCanvas(source, options.width, options.height);

  onProgress?.(42);
  const targetBytes = kbToBytes(options.targetKb);
  const outputType = options.outputType === 'image/png' ? 'image/png' : 'image/jpeg';
  const result =
    outputType === 'image/png'
      ? await encodePngOrFallback(canvas, targetBytes, onProgress)
      : {
          ...(await binarySearchJpeg(canvas, targetBytes, onProgress)),
          type: 'image/jpeg',
        };

  onProgress?.(100);

  return {
    blob: result.blob,
    url: URL.createObjectURL(result.blob),
    width: canvas.width,
    height: canvas.height,
    size: result.blob.size,
    sizeKb: bytesToKb(result.blob.size),
    mimeType: result.type || result.blob.type || outputType,
    quality: result.quality,
    reachedTarget: result.reachedTarget,
  };
}
