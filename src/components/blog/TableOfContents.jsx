"use client";

import { useEffect, useState, useRef } from "react";

export default function TableOfContents({ sections = [] }) {
  const [activeId, setActiveId] = useState("");
  const tocRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    const elements = [];
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    }

    return () => {
      for (const el of elements) {
        observer.unobserve(el);
      }
    };
  }, [sections]);

  return (
    <>
      {/* Mobile: horizontally scrollable chips */}
      <nav className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur md:hidden">
        <div
          ref={tocRef}
          className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeId === s.id
                  ? "bg-[var(--brand-green)] text-white"
                  : "border border-gray-300 text-gray-600 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
              }`}
            >
              {s.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Desktop: sticky left sidebar */}
      <aside className="hidden mt-3 md:block">
        <div className="sticky mt-10 top-24 w-56">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
            On this page
          </p>
          <nav className="space-y-1 border-l-2 border-gray-200 pl-4">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`block my-3 text-sm leading-snug transition-colors ${
                  activeId === s.id
                    ? "font-medium text-[var(--brand-green)]"
                    : "text-gray-500 hover:text-[var(--brand-green)]"
                }`}
              >
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
