"use client";

import { useEffect, useState } from "react";
import useNewsletterForm from "./useNewsletterForm";
import {
  DEFAULT_OFFER,
  SLIDE_IN_DISMISSED_KEY,
  SUBSCRIBED_KEY,
  readStorage,
  writeStorage,
} from "@/lib/newsletter";

const SHOW_AFTER_SCROLL = 0.5; // share of the page scrolled
const HIDE_FOR_DAYS = 14; // after the reader closes it

// Small slide-in card (bottom sheet on mobile, corner card on desktop).
// It is not a full-screen popup, so it doesn't count as an intrusive
// interstitial for Google. It never shows to subscribers, stays hidden for
// HIDE_FOR_DAYS after being closed, and gets out of the way while an inline
// signup form is on screen.
export default function NewsletterSlideIn({ offer = DEFAULT_OFFER }) {
  const [eligible, setEligible] = useState(false);
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const [inlineVisible, setInlineVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  const { email, formState, errorMessage, handleChange, handleSubmit } =
    useNewsletterForm("slide-in");

  // Decide once, after mount, whether this reader should ever see it.
  useEffect(() => {
    if (readStorage(SUBSCRIBED_KEY)) return;
    const dismissedAt = Number(readStorage(SLIDE_IN_DISMISSED_KEY) || 0);
    if (dismissedAt && Date.now() - dismissedAt < HIDE_FOR_DAYS * 86400000) return;
    const id = window.setTimeout(() => setEligible(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!eligible) return;
    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= SHOW_AFTER_SCROLL) {
        setScrolledEnough(true);
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    const frame = window.requestAnimationFrame(onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [eligible]);

  useEffect(() => {
    if (!eligible || typeof IntersectionObserver === "undefined") return;
    const forms = document.querySelectorAll("[data-newsletter-form]");
    if (!forms.length) return;
    const onScreen = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      });
      setInlineVisible(onScreen.size > 0);
    });
    forms.forEach((form) => observer.observe(form));
    return () => observer.disconnect();
  }, [eligible]);

  // Close a few seconds after a successful signup.
  useEffect(() => {
    if (formState !== "success") return;
    const id = window.setTimeout(() => setClosed(true), 4000);
    return () => window.clearTimeout(id);
  }, [formState]);

  function close() {
    setClosed(true);
    if (formState !== "success") {
      writeStorage(SLIDE_IN_DISMISSED_KEY, String(Date.now()));
    }
  }

  const open = eligible && scrolledEnough && !closed && (!inlineVisible || formState !== "idle");
  if (!open) return null;

  return (
    <aside
      aria-label="Newsletter signup"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white p-5 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-96 sm:rounded-2xl sm:border"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close newsletter signup"
        className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {formState === "success" ? (
        <p className="pr-8 text-base font-semibold text-gray-900">
          You&apos;re subscribed. Thanks for joining!
        </p>
      ) : (
        <>
          <p className="pr-8 text-base font-semibold text-gray-900">{offer.headline}</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-500">{offer.description}</p>
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2" noValidate>
            <label className="min-w-0 flex-1">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={formState === "loading"}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[var(--brand-green)] focus:ring-1 focus:ring-[var(--brand-green)] disabled:opacity-60"
              />
            </label>
            <button
              type="submit"
              disabled={formState === "loading"}
              className="shrink-0 cursor-pointer rounded-lg bg-[var(--brand-green)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#046a35] disabled:opacity-70"
            >
              {formState === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
          {formState === "error" && errorMessage && (
            <p className="mt-2 text-sm text-red-600" role="alert">{errorMessage}</p>
          )}
          <p className="mt-2 text-xs text-gray-400">Free. Unsubscribe anytime.</p>
        </>
      )}
    </aside>
  );
}
