"use client";

import useNewsletterForm from "./useNewsletterForm";
import { DEFAULT_OFFER } from "@/lib/newsletter";

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[var(--brand-green)] focus:ring-1 focus:ring-[var(--brand-green)] disabled:cursor-not-allowed disabled:opacity-60";

// Inline signup card. `offer` comes from src/lib/newsletter.js; `source`
// records where the form sits (see useNewsletterForm).
export default function NewsletterInline({ offer = DEFAULT_OFFER, source = "inline" }) {
  const { firstName, email, formState, errorMessage, handleChange, handleSubmit } =
    useNewsletterForm(source);

  if (formState === "success") {
    return (
      <section
        data-newsletter-form
        className="my-12 rounded-2xl border-l-4 border-[var(--brand-green)] bg-white p-8 shadow-md"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-xl font-bold text-gray-900">You&apos;re subscribed. Welcome!</p>
          <p className="mt-2 text-sm text-gray-500">
            Our next guide will land in your inbox. Add our email to your contacts so it doesn&apos;t go to spam.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      data-newsletter-form
      aria-label="Newsletter signup"
      className="my-12 rounded-2xl border-l-4 border-[var(--brand-green)] bg-white p-8 shadow-md"
    >
      {/* A <p>, not a heading, so the form doesn't add to the post's heading outline. */}
      <p className="text-xl font-bold text-gray-900">{offer.headline}</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{offer.description}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <div className="flex flex-col gap-4 sm:flex-row">
          <label className="w-full">
            <span className="sr-only">First name (optional)</span>
            <input
              type="text"
              name="firstName"
              autoComplete="given-name"
              placeholder="First name (optional)"
              value={firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              disabled={formState === "loading"}
              className={inputClass}
            />
          </label>
          <label className="w-full">
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
              className={inputClass}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={formState === "loading"}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--brand-green)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#046a35] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {formState === "loading" ? (
            <>
              <Spinner />
              Subscribing...
            </>
          ) : (
            `${offer.button} →`
          )}
        </button>

        {formState === "error" && errorMessage && (
          <p className="text-sm text-red-600" role="alert">{errorMessage}</p>
        )}
      </form>

      <p className="mt-4 text-xs text-gray-400">
        Free. No spam. Unsubscribe anytime. We respect your privacy.
      </p>
    </section>
  );
}
