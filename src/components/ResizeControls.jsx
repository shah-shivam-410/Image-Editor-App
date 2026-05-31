import { Link, Lock, Unlock } from 'lucide-react';
import { RESIZE_PRESETS } from '../constants/presets.js';

export default function ResizeControls({
  settings,
  setSettings,
  originalDimensions,
  disabled,
}) {
  function updateDimension(field, value) {
    const nextValue = Math.max(1, Number(value) || 1);
    setSettings((current) => {
      if (!current.maintainAspectRatio || !originalDimensions) {
        return { ...current, preset: 'custom', [field]: nextValue };
      }

      const ratio = originalDimensions.width / originalDimensions.height;
      return field === 'width'
        ? {
            ...current,
            preset: 'custom',
            width: nextValue,
            height: Math.max(1, Math.round(nextValue / ratio)),
          }
        : {
            ...current,
            preset: 'custom',
            height: nextValue,
            width: Math.max(1, Math.round(nextValue * ratio)),
          };
    });
  }

  function applyPreset(preset) {
    setSettings((current) => ({
      ...current,
      preset: preset.id,
      width: preset.width,
      height: preset.height,
      targetKb: preset.targetKb,
      outputType: preset.outputType,
      maintainAspectRatio: preset.id === 'custom' ? current.maintainAspectRatio : false,
    }));
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-ink">Resize</h2>
          <p className="mt-1 text-sm text-slate-600">Set final pixel dimensions before compression.</p>
        </div>
        <Link size={18} className="text-slate-500" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {RESIZE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            disabled={disabled}
            onClick={() => applyPreset(preset)}
            className={`min-h-10 rounded-md border px-2 text-sm font-semibold transition ${
              settings.preset === preset.id
                ? 'border-ink bg-ink text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Width</span>
          <input
            type="number"
            min="1"
            disabled={disabled}
            value={settings.width}
            onChange={(event) => updateDimension('width', event.target.value)}
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-ink outline-none focus:border-ink focus:ring-4 focus:ring-slate-200"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Height</span>
          <input
            type="number"
            min="1"
            disabled={disabled}
            value={settings.height}
            onChange={(event) => updateDimension('height', event.target.value)}
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-ink outline-none focus:border-ink focus:ring-4 focus:ring-slate-200"
          />
        </label>
      </div>

      <label className="mt-4 flex cursor-pointer items-center justify-between gap-4 rounded-md bg-field px-3 py-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-ink">
          {settings.maintainAspectRatio ? <Lock size={17} /> : <Unlock size={17} />}
          Maintain aspect ratio
        </span>
        <input
          type="checkbox"
          disabled={disabled}
          checked={settings.maintainAspectRatio}
          onChange={(event) =>
            setSettings((current) => ({ ...current, maintainAspectRatio: event.target.checked }))
          }
          className="h-5 w-5 accent-ink"
        />
      </label>
    </section>
  );
}
