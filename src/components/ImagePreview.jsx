import { FileImage } from 'lucide-react';
import { formatBytes } from '../utils/fileUtils.js';

export default function ImagePreview({ title, imageUrl, dimensions, size, mimeType }) {
  if (!imageUrl) return null;

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-soft">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <FileImage size={18} aria-hidden="true" />
          <h2 className="text-sm font-bold text-ink">{title}</h2>
        </div>
        {mimeType ? <span className="text-xs font-semibold uppercase text-slate-500">{mimeType}</span> : null}
      </div>
      <div className="checkerboard flex min-h-72 items-center justify-center p-4">
        <img
          src={imageUrl}
          alt={title}
          className="max-h-[420px] max-w-full rounded-md object-contain shadow-sm"
        />
      </div>
      <dl className="grid grid-cols-2 gap-3 border-t border-slate-200 p-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-slate-500">Width</dt>
          <dd className="font-semibold text-ink">{dimensions?.width ?? '-'} px</dd>
        </div>
        <div>
          <dt className="text-slate-500">Height</dt>
          <dd className="font-semibold text-ink">{dimensions?.height ?? '-'} px</dd>
        </div>
        <div>
          <dt className="text-slate-500">File size</dt>
          <dd className="font-semibold text-ink">{formatBytes(size)}</dd>
        </div>
      </dl>
    </section>
  );
}
