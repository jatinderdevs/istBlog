import Link from "next/link";

/**
 * Card for a long-form "guide page" (the structured, sectioned guides).
 * Guides live at /blog/[slug] alongside regular posts.
 */
export default function GuideCard({ guide, variant = "default" }) {
  const featured = variant === "featured";

  return (
    <Link
      href={`/blog/${guide.slug}`}
      className={`group flex flex-col rounded-2xl border transition-all hover:shadow-sm ${
        featured
          ? "border-[var(--brand-green)]/30 bg-[var(--brand-green-light)] p-6 hover:border-[var(--brand-green)]"
          : "border-gray-100 bg-white p-6 hover:border-[var(--brand-green)]"
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-[var(--brand-green)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
          Complete guide
        </span>
        {guide.category && (
          <span className="text-xs font-medium text-[var(--brand-green)]">
            {guide.category}
          </span>
        )}
      </div>
      <h3 className="text-lg font-medium leading-snug text-gray-900 transition-colors group-hover:text-[var(--brand-green)]">
        {guide.title}
      </h3>
      {guide.subtitle && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500">
          {guide.subtitle}
        </p>
      )}
      <div className="mt-auto flex items-center justify-between pt-4 text-xs text-gray-400">
        <span>{guide.readTime || ""}</span>
        <span className="font-medium text-[var(--brand-green)]">
          Read the guide →
        </span>
      </div>
    </Link>
  );
}
