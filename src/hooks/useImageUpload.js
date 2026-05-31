import { useCallback, useEffect, useState } from 'react';
import { readImageDimensions } from '../utils/imageMeta.js';
import { validateImageFile } from '../utils/validation.js';

export function useImageUpload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [dimensions, setDimensions] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const clear = useCallback(() => {
    setFile(null);
    setDimensions(null);
    setError('');
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return '';
    });
  }, []);

  const selectFile = useCallback(async (nextFile) => {
    const validationError = validateImageFile(nextFile);
    if (validationError) {
      setError(validationError);
      return false;
    }

    const url = URL.createObjectURL(nextFile);
    try {
      const nextDimensions = await readImageDimensions(url);
      setFile(nextFile);
      setDimensions(nextDimensions);
      setError('');
      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return url;
      });
      return true;
    } catch (caughtError) {
      URL.revokeObjectURL(url);
      setError(caughtError.message);
      return false;
    }
  }, []);

  return {
    file,
    previewUrl,
    dimensions,
    error,
    setError,
    selectFile,
    clear,
  };
}
