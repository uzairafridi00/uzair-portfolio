// Hover label that floats above its child, styled like the reference site.
export default function Tooltip({ label, children, className = 'inline-flex' }) {
  return (
    <span className={`group/tip relative ${className}`}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg bg-tip px-3 py-1.5 font-sans text-[12.5px] font-medium text-[#f0f0f0] opacity-0 shadow-lg transition-all duration-100 ease-out group-hover/tip:translate-y-0 group-hover/tip:opacity-100 group-focus-within/tip:translate-y-0 group-focus-within/tip:opacity-100"
      >
        {label}
        <span className="absolute left-1/2 top-full -mt-px -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent border-t-tip" />
      </span>
    </span>
  )
}
