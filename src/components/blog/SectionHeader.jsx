export default function SectionHeader({ number, emoji, title, children }) {
  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--brand-green)] text-sm font-bold text-white md:h-14 md:w-14 md:text-base">
          {number}
        </span>
        <div className="flex items-center gap-3">
          {emoji && <span className="text-2xl md:text-3xl">{emoji}</span>}
          <h2 className="text-xl font-bold text-gray-900 md:text-2xl">{title}</h2>
        </div>
      </div>
      {children && <div className="pl-0 md:pl-18">{children}</div>}
    </div>
  );
}
