import { Sparkles, ShieldCheck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Button from '../components/Button.jsx';
import CompressionControls from '../components/CompressionControls.jsx';
import Dropzone from '../components/Dropzone.jsx';
import ImagePreview from '../components/ImagePreview.jsx';
import OutputPanel from '../components/OutputPanel.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import ResizeControls from '../components/ResizeControls.jsx';
import { RESIZE_PRESETS } from '../constants/presets.js';
import { useImageProcessor } from '../hooks/useImageProcessor.js';
import { useImageUpload } from '../hooks/useImageUpload.js';

const defaultPreset = RESIZE_PRESETS[0];

export default function EditorPage() {
  const upload = useImageUpload();
  const processor = useImageProcessor();
  const [settings, setSettings] = useState({
    preset: defaultPreset.id,
    width: defaultPreset.width,
    height: defaultPreset.height,
    targetKb: defaultPreset.targetKb,
    outputType: defaultPreset.outputType,
    maintainAspectRatio: false,
  });

  useEffect(() => {
    processor.resetResult();
  }, [upload.file, settings.width, settings.height, settings.targetKb, settings.outputType]);

  const canProcess = Boolean(upload.file) && !processor.isProcessing;
  const sourceSize = upload.file?.size ?? 0;
  const sourceType = upload.file?.type?.replace('image/', '') ?? '';

  const helperText = useMemo(() => {
    if (!upload.file) return 'Upload one image to begin.';
    return settings.outputType === 'image/png'
      ? 'PNG is best for signatures, with JPEG fallback if the target is very strict.'
      : 'JPEG compression uses binary search to keep the highest quality under the target.';
  }, [settings.outputType, upload.file]);

  return (
    <main className="min-h-screen bg-mist">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ink text-white">
                <Sparkles size={20} aria-hidden="true" />
              </span>
              <div>
                <h1 className="text-xl font-black text-ink sm:text-2xl">Passport Image Studio</h1>
                <p className="mt-1 text-sm text-slate-600">Resize and compress photos or signatures locally.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-field px-3 py-2 text-sm font-semibold text-slate-700">
            <ShieldCheck size={17} aria-hidden="true" />
            No uploads. Browser-only processing.
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8">
        <section className="space-y-5">
          {!upload.file ? (
            <Dropzone onSelect={upload.selectFile} error={upload.error} />
          ) : (
            <ImagePreview
              title="Original image"
              imageUrl={upload.previewUrl}
              dimensions={upload.dimensions}
              size={sourceSize}
              mimeType={sourceType}
            />
          )}

          {processor.isProcessing ? (
            <ProgressBar value={processor.progress} label="Processing image" />
          ) : null}

          {processor.error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {processor.error}
            </div>
          ) : null}

          <OutputPanel
            result={processor.result}
            sourceFile={upload.file}
            onReset={() => {
              upload.clear();
              processor.resetResult();
            }}
          />
        </section>

        <aside className="space-y-5 lg:sticky lg:top-5 lg:self-start">
          <ResizeControls
            settings={settings}
            setSettings={setSettings}
            originalDimensions={upload.dimensions}
            disabled={processor.isProcessing}
          />
          <CompressionControls
            settings={settings}
            setSettings={setSettings}
            disabled={processor.isProcessing}
          />

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
            <p className="text-sm text-slate-600">{helperText}</p>
            <div className="mt-4 flex gap-2">
              {upload.file ? (
                <Button
                  variant="secondary"
                  className="flex-1"
                  disabled={processor.isProcessing}
                  onClick={() => {
                    upload.clear();
                    processor.resetResult();
                  }}
                >
                  Clear
                </Button>
              ) : null}
              <Button
                className="flex-1"
                disabled={!canProcess}
                onClick={() => processor.run(upload.file, settings)}
              >
                {processor.isProcessing ? 'Processing...' : 'Process image'}
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
