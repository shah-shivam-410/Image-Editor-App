export default function ProgressBar({ value, label }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-ink">{label}</span>
        <span className="font-bold text-slate-600">{Math.round(value)}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-field">
        <div
          className="h-full rounded-full bg-ink transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
