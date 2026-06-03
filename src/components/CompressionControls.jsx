import { Gauge } from 'lucide-react';

export default function CompressionControls({ settings, setSettings, disabled }) {
  const targetKb = Number(settings.targetKb);
  const hasValidTargetKb = Number.isFinite(targetKb) && targetKb > 0;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-ink">Compression</h2>
          <p className="mt-1 text-sm text-slate-600">Aim for a maximum file size while preserving clarity.</p>
        </div>
        <Gauge size={19} className="text-slate-500" aria-hidden="true" />
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Target size</span>
        <div className="mt-2 flex">
          <input
            type="number"
            min="1"
            disabled={disabled}
            value={settings.targetKb}
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                targetKb: event.target.value,
              }))
            }
            className="h-11 w-full rounded-l-md border border-slate-300 bg-white px-3 text-ink outline-none focus:border-ink focus:ring-4 focus:ring-slate-200"
          />
          <span className="inline-flex h-11 items-center rounded-r-md border border-l-0 border-slate-300 bg-field px-3 text-sm font-bold text-slate-600">
            KB
          </span>
        </div>
        {!hasValidTargetKb ? (
          <p className="mt-2 text-xs font-semibold text-red-600">
            Enter a target file size before processing.
          </p>
        ) : null}
      </label>

      <label className="mt-5 block">
        <span className="text-sm font-semibold text-slate-700">Output format</span>
        <div className="mt-2 flex h-11 items-center rounded-md border border-slate-300 bg-field px-3 text-sm font-bold text-ink">
          JPG / JPEG for photo and signature
        </div>
      </label>
    </section>
  );
}
