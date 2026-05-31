import { ImageUp, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { ACCEPTED_TYPES } from '../constants/presets.js';

export default function Dropzone({ onSelect, error }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const accept = ACCEPTED_TYPES.join(',');

  function handleFiles(files) {
    const [file] = Array.from(files || []);
    if (file) onSelect(file);
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={`flex min-h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white p-6 text-center shadow-soft transition ${
          isDragging ? 'border-ink ring-4 ring-slate-200' : 'border-slate-300 hover:border-slate-500'
        }`}
      >
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-field text-ink">
          <ImageUp size={26} aria-hidden="true" />
        </span>
        <span className="text-base font-semibold text-ink">Drop a passport photo or signature</span>
        <span className="mt-2 text-sm text-slate-600">JPG, JPEG, or PNG up to 12 MB</span>
        <span className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white">
          <Upload size={17} aria-hidden="true" />
          Choose image
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />
      {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}
    </div>
  );
}
