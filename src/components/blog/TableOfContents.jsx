"use client";

import { useEffect, useState, useRef } from "react";

const SECTIONS = [
  { id: "government-hubs", title: "Government Hubs" },
  { id: "social-cultural-programs", title: "Social & Cultural Programs" },
  { id: "free-mental-health", title: "Free Mental Health Support" },
  { id: "free-legal-help", title: "Free Legal Help" },
  { id: "career-programs", title: "Career Programs" },
  { id: "free-things-to-do", title: "Free Things To Do" },
  { id: "discounts-cards", title: "Discounts & Cards" },
  { id: "essential-apps", title: "Essential Apps" },
  { id: "australian-culture-tips", title: "Australian Culture Tips" },
  { id: "quick-reference", title: "Quick Reference Links" },
];

export default function TableOfContents() {
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
    for (const section of SECTIONS) {
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
  }, []);

  return (
    <>
      {/* Mobile: horizontally scrollable chips */}
      <nav className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur md:hidden">
        <div
          ref={tocRef}
          className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {SECTIONS.map((s) => (
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
            {SECTIONS.map((s) => (
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
