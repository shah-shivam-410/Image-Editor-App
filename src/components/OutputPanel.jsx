import { Download, RotateCcw } from 'lucide-react';
import Button from './Button.jsx';
import ImagePreview from './ImagePreview.jsx';
import { getDownloadName } from '../utils/fileUtils.js';

export default function OutputPanel({ result, sourceFile, onReset }) {
  if (!result) return null;

  return (
    <div className="space-y-4">
      <ImagePreview
        title="Processed image"
        imageUrl={result.url}
        dimensions={{ width: result.width, height: result.height }}
        size={result.size}
        mimeType={result.mimeType}
      />

      <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-ink">
            {result.reachedTarget ? 'Ready for upload' : 'Best effort optimized'}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Quality {Math.round((result.quality || 1) * 100)}% with browser-only processing.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onReset}>
            <RotateCcw size={17} aria-hidden="true" />
            Reset
          </Button>
          <a
            href={result.url}
            download={getDownloadName(sourceFile?.name || 'image', result.mimeType)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Download size={17} aria-hidden="true" />
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
