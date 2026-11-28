"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const SITE_DOMAIN = "internationalstudenttips.com.au";
const PUBLISHER_SCRIPT = "https://news.google.com/swg/js/v1/publisher.js";

// GA4 event. Mark "preferred_source_click" as a key event in GA4 Admin if wanted.
function trackClick(location, pathname) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "preferred_source_click", {
      button_location: location,
      page_path: pathname || "",
    });
  }
}

export default function PreferredSourceButton({ location = "post-end" }) {
  const wrapperRef = useRef(null);
  const pathname = usePathname();

  // Google's script only scans the page once, on load. After a client-side
  // navigation the new button is never drawn, so ask the script to scan again.
  useEffect(() => {
    const queue = (window.PREFERRED_SOURCE = window.PREFERRED_SOURCE || []);
    queue.push((preferredSource) => {
      const btn = wrapperRef.current?.querySelector(
        "[google-add-preferred-source-btn]",
      );
      if (btn && !btn.hasAttribute("data-initialized")) {
        preferredSource.init({ theme: "light" });
      }
    });
  }, [pathname]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Ignore repeat events from one click (pointer + blur can both fire).
    let lastTracked = 0;
    const track = () => {
      const now = Date.now();
      if (now - lastTracked < 1500) return;
      lastTracked = now;
      trackClick(location, pathname);
    };

    // Google draws the badge in a shadow root; its clicks bubble up to the
    // wrapper (retargeted to the host element).
    const onClick = () => track();
    wrapper.addEventListener("click", onClick, true);

    // Fallback in case Google ever switches to a cross-origin iframe: its
    // clicks don't bubble, but the window loses focus to the iframe.
    const onBlur = () => {
      setTimeout(() => {
        const active = document.activeElement;
        if (active?.tagName === "IFRAME" && wrapper.contains(active)) track();
      }, 0);
    };
    window.addEventListener("blur", onBlur);

    return () => {
      wrapper.removeEventListener("click", onClick, true);
      window.removeEventListener("blur", onBlur);
    };
  }, [location, pathname]);

  return (
    <section
      aria-label="Add us as a preferred source on Google"
      className="mt-12 rounded-2xl border border-gray-100 bg-[var(--brand-green-light)] px-6 py-6 text-center"
    >
      <p className="mb-4 text-base text-gray-700">
        Want our guides to show up first when you search on Google? Add us as a
        preferred source.
      </p>
      <div ref={wrapperRef} className="flex justify-center">
        <div google-add-preferred-source-btn="" data-theme="light"></div>
      </div>
      <noscript>
        <a
          href={`https://www.google.com/preferences/source?q=${SITE_DOMAIN}`}
          target="_blank"
          rel="noopener"
          className="text-[var(--brand-green)] underline underline-offset-2"
        >
          Add as Preferred Source on Google
        </a>
      </noscript>
      <Script src={PUBLISHER_SCRIPT} strategy="afterInteractive" />
    </section>
  );
}
