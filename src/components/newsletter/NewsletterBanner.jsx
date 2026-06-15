"use client";

import useNewsletterForm from "./useNewsletterForm";

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export default function NewsletterBanner() {
  const { firstName, email, formState, errorMessage, handleChange, handleSubmit } = useNewsletterForm();

  if (formState === "success") {
    return (
      <section className="bg-green-600 px-6 py-16 text-white">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold md:text-3xl">You&apos;re in! Welcome to the community.</h2>
          <p className="mt-3 text-white/80">Check your inbox for a confirmation email.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-green-700 px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold md:text-3xl">You Belong Here. Let Us Help.</h2>
        <p className="mt-3 text-base leading-relaxed text-white/80">
          Free guides, visa tips and student life advice — delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              disabled={formState === "loading"}
              className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/50 focus:border-white/60 focus:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={formState === "loading"}
              className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/50 focus:border-white/60 focus:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={formState === "loading"}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-bold text-[var(--brand-green)] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70 sm:shrink-0"
            >
              {formState === "loading" ? (
                <>
                  <Spinner />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>

          {formState === "error" && errorMessage && (
            <p className="mt-3 text-sm text-red-200">{errorMessage}</p>
          )}
        </form>

        <p className="mt-4 text-xs text-white/70">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
