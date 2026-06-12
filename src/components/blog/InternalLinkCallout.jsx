import Link from "next/link";

export default function InternalLinkCallout({ href, title }) {
  return (
    <div className="my-6">
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3 text-sm font-medium text-[#1F5C99] transition-colors hover:bg-[#1F5C99]/5"
      >
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span>
          <span className="text-gray-500">Related: </span>
          {title} <span className="text-gray-400">→</span>
        </span>
      </Link>
    </div>
  );
}
