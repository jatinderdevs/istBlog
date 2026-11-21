import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const popular = [
  { href: "/blog", label: "Browse all guides" },
  { href: "/tools/rent-checker", label: "Rent affordability checker" },
  { href: "/about", label: "About International Student Tips" },
];

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="text-sm font-medium text-[var(--brand-green)] uppercase tracking-widest mb-3">
        404
      </p>
      <h1 className="text-4xl font-medium text-gray-900 mb-4">
        We can&apos;t find that page
      </h1>
      <p className="text-gray-500 leading-relaxed mb-10">
        The link may be old or the guide may have moved. Try one of these
        instead, or head back to the home page.
      </p>
      <div className="flex flex-col gap-3 items-center mb-10">
        {popular.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="w-full max-w-sm rounded-lg border border-gray-200 px-5 py-3 text-sm text-gray-700 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)] transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <Link
        href="/"
        className="inline-block bg-[var(--brand-green)] text-white text-sm px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
