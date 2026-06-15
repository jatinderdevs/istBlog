import Link from "next/link";

export const guidePortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-sm leading-relaxed text-gray-700 last:mb-0 md:text-base">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 text-xl font-bold text-gray-900 md:text-2xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-lg font-bold text-gray-900 md:text-xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-6 text-base font-bold text-gray-900 md:text-lg">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-[var(--brand-green)] bg-[var(--brand-green-light)]/50 py-3 pl-5 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-5 list-disc space-y-1.5 text-sm text-gray-700 md:text-base">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-5 list-decimal space-y-1.5 text-sm text-gray-700 md:text-base">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ value, children }) => {
      const href = value?.href || "#";
      return (
        <a
          href={href}
          target={value?.blank ? "_blank" : undefined}
          rel={value?.blank ? "noopener noreferrer" : undefined}
          className="text-[var(--brand-green)] underline underline-offset-2 hover:opacity-80"
        >
          {children}
        </a>
      );
    },
    internalLink: ({ value, children }) => {
      const slug = value?.slug;
      if (!slug) return <span className="text-gray-400">{children}</span>;
      return (
        <Link
          href={`/blog/${slug}`}
          className="text-[var(--brand-green)] underline underline-offset-2 hover:opacity-80"
        >
          {children}
        </Link>
      );
    },
  },
};
