"use client";

export default function FinalCTA() {
  return (
    <section className="mt-16 bg-gradient-to-br from-[#1F5C99] to-[#2E75B6] px-6 py-16 text-center text-white">
      <div className="mx-auto max-w-xl">
        <h2 className="text-2xl font-bold md:text-3xl">Was this helpful?</h2>
        <p className="mt-2 text-white/80">Share it with a friend who just arrived in Australia.</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/?text=${encodeURIComponent("Check out this guide for international students in Australia!")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border-2 border-white/60 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://internationalstudenttips.com.au/blog/international-student-guide-explore-australia")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border-2 border-white/60 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Facebook
          </a>
          <button
            onClick={() => { navigator.clipboard.writeText("https://internationalstudenttips.com.au/blog/international-student-guide-explore-australia"); }}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border-2 border-white/60 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Copy Link
          </button>
        </div>

        <div className="mx-auto mt-10 max-w-md border-t border-white/20 pt-8">
          <p className="mb-3 text-sm font-medium">Get more guides like this</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/50 outline-none focus:border-white/60"
            />
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#1F5C99] transition-colors hover:bg-white/90"
            >
              Get more guides
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
