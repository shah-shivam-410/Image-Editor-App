import { Gauge } from 'lucide-react';

const targetOptions = [20, 50, 100];

export default function CompressionControls({ settings, setSettings, disabled }) {
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
                targetKb: Math.max(1, Number(event.target.value) || 1),
              }))
            }
            className="h-11 w-full rounded-l-md border border-slate-300 bg-white px-3 text-ink outline-none focus:border-ink focus:ring-4 focus:ring-slate-200"
          />
          <span className="inline-flex h-11 items-center rounded-r-md border border-l-0 border-slate-300 bg-field px-3 text-sm font-bold text-slate-600">
            KB
          </span>
        </div>
      </label>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {targetOptions.map((target) => (
          <button
            key={target}
            type="button"
            disabled={disabled}
            onClick={() => setSettings((current) => ({ ...current, targetKb: target }))}
            className={`h-10 rounded-md border text-sm font-semibold transition ${
              Number(settings.targetKb) === target
                ? 'border-ink bg-ink text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {target} KB
          </button>
        ))}
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-semibold text-slate-700">Output format</span>
        <select
          disabled={disabled}
          value={settings.outputType}
          onChange={(event) => setSettings((current) => ({ ...current, outputType: event.target.value }))}
          className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-ink outline-none focus:border-ink focus:ring-4 focus:ring-slate-200"
        >
          <option value="image/jpeg">JPG for photos</option>
          <option value="image/png">PNG for signatures</option>
        </select>
      </label>
    </section>
  );
}
