export default function HeroBanner({ title, subtitle, category, readTime, downloadLabel }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1F5C99] to-[#2E75B6] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {category && (
            <span className="inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
              {category}
            </span>
          )}
          {readTime && (
            <span className="inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
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
        {downloadLabel && (
          <div className="mt-8">
            <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg border-2 border-white/60 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {downloadLabel}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
