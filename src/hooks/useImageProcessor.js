import { useCallback, useEffect, useState } from 'react';
import { processImage } from '../services/imageProcessor.js';

export function useImageProcessor() {
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    return () => {
      if (result?.url) URL.revokeObjectURL(result.url);
    };
  }, [result]);

  const resetResult = useCallback(() => {
    setResult((current) => {
      if (current?.url) URL.revokeObjectURL(current.url);
      return null;
    });
    setError('');
    setProgress(0);
  }, []);

  const run = useCallback(
    async (file, options) => {
      if (!file) {
        setError('Upload an image before processing.');
        return null;
      }

      setIsProcessing(true);
      setError('');
      setProgress(0);

      try {
        const processed = await processImage(file, options, setProgress);
        setResult((current) => {
          if (current?.url) URL.revokeObjectURL(current.url);
          return processed;
        });

        if (!processed.reachedTarget) {
          setError(
            'The image is optimized, but the selected dimensions may be too large for that exact target size.',
          );
        }

        return processed;
      } catch (caughtError) {
        setError(caughtError.message || 'Processing failed. Try a smaller image or target size.');
        return null;
      } finally {
        setIsProcessing(false);
      }
    },
    [],
  );

  return {
    result,
    isProcessing,
    progress,
    error,
    run,
    resetResult,
    setError,
  };
}
