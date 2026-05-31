export const RESIZE_PRESETS = [
  {
    id: 'passport',
    label: 'Passport Photo',
    width: 413,
    height: 531,
    targetKb: 50,
    outputType: 'image/jpeg',
  },
  {
    id: 'signature',
    label: 'Signature',
    width: 600,
    height: 200,
    targetKb: 20,
    outputType: 'image/png',
  },
  {
    id: 'custom',
    label: 'Custom',
    width: 800,
    height: 800,
    targetKb: 100,
    outputType: 'image/jpeg',
  },
];

export const ACCEPTED_TYPES = ['image/jpeg', 'image/png'];
export const MAX_UPLOAD_MB = 12;
