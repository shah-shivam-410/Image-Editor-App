export function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 KB';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;
  return `${value >= 10 || index === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[index]}`;
}

export function bytesToKb(bytes) {
  return bytes / 1024;
}

export function kbToBytes(kb) {
  return Math.max(1, Math.round(Number(kb) * 1024));
}

export function getDownloadName(fileName, mimeType) {
  const cleanName = fileName.replace(/\.[^.]+$/, '') || 'processed-image';
  const extension = mimeType === 'image/png' ? 'png' : 'jpg';
  return `${cleanName}-optimized.${extension}`;
}
