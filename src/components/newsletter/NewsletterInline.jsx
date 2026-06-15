"use client";

import useNewsletterForm from "./useNewsletterForm";

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export default function NewsletterInline() {
  const { firstName, email, formState, errorMessage, handleChange, handleSubmit } = useNewsletterForm();

  if (formState === "success") {
    return (
      <section className="my-12 rounded-2xl border-l-4 border-[var(--brand-green)] bg-white p-8 shadow-md">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">You&apos;re in! Welcome to the community.</h3>
          <p className="mt-2 text-sm text-gray-500">Check your inbox for a confirmation email.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="my-12 rounded-2xl border-l-4 border-[var(--brand-green)] bg-white p-8 shadow-md">
      <h3 className="text-xl font-bold text-gray-900">Get More Guides Like This</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">
        Join thousands of international students getting free tips, visa updates and money-saving advice straight to their inbox.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            disabled={formState === "loading"}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[var(--brand-green)] focus:ring-1 focus:ring-[var(--brand-green)] disabled:cursor-not-allowed disabled:opacity-60"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            disabled={formState === "loading"}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[var(--brand-green)] focus:ring-1 focus:ring-[var(--brand-green)] disabled:cursor-not-allowed disabled:opacity-60"
          />
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
            "Send Me Free Tips →"
          )}
        </button>

        {formState === "error" && errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}
      </form>

      <p className="mt-4 text-xs text-gray-400">
        No spam. Unsubscribe anytime. We respect your privacy.
      </p>
    </section>
  );
}
