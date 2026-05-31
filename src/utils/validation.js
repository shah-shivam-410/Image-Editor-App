import { ACCEPTED_TYPES, MAX_UPLOAD_MB } from '../constants/presets.js';

export function validateImageFile(file) {
  if (!file) return 'Choose an image file to continue.';
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return 'Only JPG, JPEG, and PNG images are supported.';
  }
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
    return `Please upload an image smaller than ${MAX_UPLOAD_MB} MB.`;
  }
  return '';
}
