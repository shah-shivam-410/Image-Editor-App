import { Calculator, Link, Lock, Ruler, Unlock } from 'lucide-react';
import { RESIZE_PRESETS } from '../constants/presets.js';
import { DEFAULT_DPI, cmToPixels, formatCm, pixelsToCm, presetToCm } from '../utils/dimensions.js';

export default function ResizeControls({
  settings,
  setSettings,
  originalDimensions,
  disabled,
}) {
  const isCmMode = settings.dimensionMode === 'cm';
  const dpiNumber = Number(settings.dpi);
  const hasValidDpi = Number.isFinite(dpiNumber) && dpiNumber > 0;
  const displayDpi = hasValidDpi ? dpiNumber : DEFAULT_DPI;
  const widthCmDisplay = formatCm(pixelsToCm(settings.width, displayDpi));
  const heightCmDisplay = formatCm(pixelsToCm(settings.height, displayDpi));

  function updateDimensionMode(mode) {
    setSettings((current) => ({
      ...current,
      dimensionMode: mode,
      widthCm: formatCm(pixelsToCm(current.width, Number(current.dpi) || DEFAULT_DPI)),
      heightCm: formatCm(pixelsToCm(current.height, Number(current.dpi) || DEFAULT_DPI)),
    }));
  }

  function updateDimension(field, value) {
    const nextValue = Math.max(1, Number(value) || 1);
    setSettings((current) => {
      if (!current.maintainAspectRatio || !originalDimensions) {
        return {
          ...current,
          preset: 'custom',
          [field]: nextValue,
          widthCm:
            field === 'width'
              ? formatCm(pixelsToCm(nextValue, Number(current.dpi) || DEFAULT_DPI))
              : current.widthCm,
          heightCm:
            field === 'height'
              ? formatCm(pixelsToCm(nextValue, Number(current.dpi) || DEFAULT_DPI))
              : current.heightCm,
        };
      }

      const ratio = originalDimensions.width / originalDimensions.height;
      const nextPixels =
        field === 'width'
          ? { width: nextValue, height: Math.max(1, Math.round(nextValue / ratio)) }
          : { height: nextValue, width: Math.max(1, Math.round(nextValue * ratio)) };

      return {
        ...current,
        preset: 'custom',
        ...nextPixels,
        widthCm: formatCm(pixelsToCm(nextPixels.width, Number(current.dpi) || DEFAULT_DPI)),
        heightCm: formatCm(pixelsToCm(nextPixels.height, Number(current.dpi) || DEFAULT_DPI)),
      };
    });
  }

  function updateCmDimension(field, value) {
    const nextCm = Math.max(0.01, Number(value) || 0.01);
    setSettings((current) => {
      const nextPixels = cmToPixels(nextCm, Number(current.dpi) || DEFAULT_DPI);
      if (!current.maintainAspectRatio || !originalDimensions) {
        return {
          ...current,
          preset: 'custom',
          [field]: nextPixels,
          [field === 'width' ? 'widthCm' : 'heightCm']: String(nextCm),
        };
      }

      const ratio = originalDimensions.width / originalDimensions.height;
      const dimensions =
        field === 'width'
          ? {
              width: nextPixels,
              height: Math.max(1, Math.round(nextPixels / ratio)),
            }
          : {
              height: nextPixels,
              width: Math.max(1, Math.round(nextPixels * ratio)),
            };

      return {
        ...current,
        preset: 'custom',
        ...dimensions,
        widthCm:
          field === 'width'
            ? String(nextCm)
            : formatCm(pixelsToCm(dimensions.width, Number(current.dpi) || DEFAULT_DPI)),
        heightCm:
          field === 'height'
            ? String(nextCm)
            : formatCm(pixelsToCm(dimensions.height, Number(current.dpi) || DEFAULT_DPI)),
      };
    });
  }

  function updateDpi(value) {
    if (value === '') {
      setSettings((current) => ({ ...current, dpi: '' }));
      return;
    }

    const nextDpi = Number(value);
    if (!Number.isFinite(nextDpi) || nextDpi <= 0) {
      setSettings((current) => ({ ...current, dpi: value }));
      return;
    }

    setSettings((current) => {
      if (current.dimensionMode !== 'cm') {
        return {
          ...current,
          dpi: nextDpi,
          widthCm: formatCm(pixelsToCm(current.width, nextDpi)),
          heightCm: formatCm(pixelsToCm(current.height, nextDpi)),
        };
      }

      return {
        ...current,
        dpi: nextDpi,
        width: cmToPixels(current.widthCm, nextDpi),
        height: cmToPixels(current.heightCm, nextDpi),
      };
    });
  }

  function applyPreset(preset) {
    setSettings((current) => ({
      ...current,
      preset: preset.id,
      width: preset.width,
      height: preset.height,
      ...presetToCm(preset, Number(current.dpi) || DEFAULT_DPI),
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
          <p className="mt-1 text-sm text-slate-600">Enter dimensions in pixels or centimeters.</p>
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

      <div className="mt-5 grid grid-cols-2 gap-2 rounded-md bg-field p-1">
        <button
          type="button"
          disabled={disabled}
          onClick={() => updateDimensionMode('px')}
          className={`flex h-10 items-center justify-center gap-2 rounded px-3 text-sm font-bold transition ${
            !isCmMode ? 'bg-white text-ink shadow-sm' : 'text-slate-600 hover:text-ink'
          }`}
        >
          <Ruler size={16} aria-hidden="true" />
          Pixels
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => updateDimensionMode('cm')}
          className={`flex h-10 items-center justify-center gap-2 rounded px-3 text-sm font-bold transition ${
            isCmMode ? 'bg-white text-ink shadow-sm' : 'text-slate-600 hover:text-ink'
          }`}
        >
          <Calculator size={16} aria-hidden="true" />
          Centimeters
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Width {isCmMode ? '(cm)' : '(px)'}
          </span>
          <input
            type="number"
            min={isCmMode ? '0.01' : '1'}
            step={isCmMode ? '0.01' : '1'}
            disabled={disabled}
            value={isCmMode ? settings.widthCm : settings.width}
            onChange={(event) =>
              isCmMode
                ? updateCmDimension('width', event.target.value)
                : updateDimension('width', event.target.value)
            }
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-ink outline-none focus:border-ink focus:ring-4 focus:ring-slate-200"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Height {isCmMode ? '(cm)' : '(px)'}
          </span>
          <input
            type="number"
            min={isCmMode ? '0.01' : '1'}
            step={isCmMode ? '0.01' : '1'}
            disabled={disabled}
            value={isCmMode ? settings.heightCm : settings.height}
            onChange={(event) =>
              isCmMode
                ? updateCmDimension('height', event.target.value)
                : updateDimension('height', event.target.value)
            }
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-ink outline-none focus:border-ink focus:ring-4 focus:ring-slate-200"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-semibold text-slate-700">DPI / PPI</span>
        <input
          type="number"
          min="1"
          step="1"
          disabled={disabled}
          value={settings.dpi}
          onChange={(event) => updateDpi(event.target.value)}
          className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-ink outline-none focus:border-ink focus:ring-4 focus:ring-slate-200"
        />
      </label>

      <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="font-bold text-ink">Final pixel size</span>
          <span className="font-black text-ink">
            {settings.width} x {settings.height} px
          </span>
        </div>
        <p className="mt-2 text-slate-600">
          {widthCmDisplay} cm x {heightCmDisplay} cm at {hasValidDpi ? settings.dpi : '--'} DPI
        </p>
        {!hasValidDpi ? (
          <p className="mt-1 text-xs font-semibold text-red-600">
            Enter a DPI value before processing.
          </p>
        ) : null}
        <p className="mt-1 text-xs text-slate-500">
          Formula: centimeters / 2.54 x DPI = pixels
        </p>
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
