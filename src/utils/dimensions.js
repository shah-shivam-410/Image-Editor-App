export const DEFAULT_DPI = 300;

export function cmToPixels(cm, dpi = DEFAULT_DPI) {
  return Math.max(1, Math.round((Number(cm) / 2.54) * Number(dpi)));
}

export function pixelsToCm(pixels, dpi = DEFAULT_DPI) {
  return (Number(pixels) / Number(dpi)) * 2.54;
}

export function formatCm(value) {
  return Number(value).toFixed(2).replace(/\.?0+$/, '');
}

export function presetToCm(preset, dpi = DEFAULT_DPI) {
  return {
    widthCm: formatCm(pixelsToCm(preset.width, dpi)),
    heightCm: formatCm(pixelsToCm(preset.height, dpi)),
  };
}
