export default function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const variants = {
    primary:
      'bg-ink text-white hover:bg-slate-800 disabled:bg-slate-400 disabled:text-slate-100',
    secondary:
      'border border-slate-300 bg-white text-ink hover:bg-slate-50 disabled:text-slate-400',
    ghost: 'text-slate-700 hover:bg-slate-100 disabled:text-slate-400',
  };

  return (
    <button
      type={type}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
