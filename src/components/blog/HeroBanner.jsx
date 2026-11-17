export default function HeroBanner({ title, subtitle, category, readTime }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--brand-green)] to-[#046a35] px-6 py-20 md:py-28">
      <div className="absolute inset-0">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute right-1/4 top-1/3 h-32 w-32 rounded-full bg-[var(--brand-yellow)]/10" />
      </div>
      <div className="relative mx-auto max-w-4xl">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          {category && (
            <span className="inline-block rounded-full bg-[var(--brand-green-light)] px-3 py-1 text-xs font-semibold tracking-wide text-[var(--brand-green)]">
              {category}
            </span>
          )}
          {readTime && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium tracking-wide text-white/90 backdrop-blur-sm">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readTime}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl md:leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
