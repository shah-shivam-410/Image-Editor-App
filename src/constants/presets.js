export const RESIZE_PRESETS = [
  {
    id: 'passport',
    label: 'Passport Photo',
    width: 425,
    height: 591,
    targetKb: 15,
    outputType: 'image/jpeg',
  },
  {
    id: 'signature',
    label: 'Signature',
    width: 886,
    height: 295,
    targetKb: 15,
    outputType: 'image/jpeg',
  },
  {
    id: 'custom',
    label: 'Custom',
    width: 800,
    height: 800,
    targetKb: 15,
    outputType: 'image/jpeg',
  },
];

export const ACCEPTED_TYPES = ['image/jpeg', 'image/png'];
export const MAX_UPLOAD_MB = 12;
