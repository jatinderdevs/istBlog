import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../../sanity/lib/image";

/**
 * "About the author" card shown at the end of a post.
 * Uses the author's credentials line, falling back to the first bio paragraph.
 */
export default function AuthorBox({ name, role, image, credentials, bioText, href }) {
  if (!name) return null;

  const summary = credentials?.trim() || bioText?.trim();
  const imageUrl = image ? urlFor(image).width(160).height(160).url() : null;
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside
      aria-labelledby="about-the-author"
      className="mt-14 flex flex-col gap-5 rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:flex-row sm:items-start"
    >
      <Link
        href={href}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[var(--brand-green-light)]"
        aria-label={`More about ${name}`}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill sizes="80px" className="object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-xl font-medium text-[var(--brand-green)]">
            {initials}
          </span>
        )}
      </Link>
      <div>
        <p
          id="about-the-author"
          className="text-xs font-medium uppercase tracking-wide text-gray-400"
        >
          About the author
        </p>
        <p className="mt-1 text-lg font-medium text-gray-900">
          <Link href={href} rel="author" className="hover:text-[var(--brand-green)]">
            {name}
          </Link>
          {role && <span className="text-base font-normal text-[var(--brand-green)]">, {role}</span>}
        </p>
        {summary && (
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{summary}</p>
        )}
        <Link
          href={href}
          className="mt-3 inline-block text-sm text-[var(--brand-green)] underline underline-offset-2 hover:opacity-80"
        >
          Read more guides by {name.split(" ")[0]} →
        </Link>
      </div>
    </aside>
  );
}
