"use client";

import Image from "next/image";
import Link from "next/link";
import useNewsletterForm from "./newsletter/useNewsletterForm";

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export default function Footer({ settings }) {
  const {
    firstName,
    email,
    formState,
    errorMessage,
    handleChange,
    handleSubmit,
  } = useNewsletterForm();

  return (
    <footer className="mt-20">
      <div className="bg-[var(--brand-green)] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white">
                Get Free Tips & Updates
              </h3>
              <p className="text-sm text-white/80 mt-1">
                Visa news, money tips, and housing guides — straight to your
                inbox.
              </p>
            </div>
            {formState === "success" ? (
              <div className="flex items-center gap-2 text-white">
                <svg
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm font-medium">
                  You&apos;re in! Check your inbox.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
              >
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  disabled={formState === "loading"}
                  className="w-full sm:w-36 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/60 focus:border-white focus:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={formState === "loading"}
                  className="w-full sm:w-56 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/60 focus:border-white focus:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[var(--brand-green)] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
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
              </form>
            )}
          </div>
          {formState === "error" && errorMessage && (
            <p className="mt-3 text-center text-sm text-red-200">
              {errorMessage}
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <Image src="/logo.svg" alt="IST Blogs" width={120} height={52} />
              <p className="text-sm text-gray-500 mt-3 max-w-xs">
                {settings?.footerTagline ||
                  "Helping international students thrive in Australia with practical, honest guides."}
              </p>
              <div className="grid py-3 grid-cols-3 gap-1">
                <a
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=61572900125280"
                >
                  <img src="/fb.png" alt="Facebook" />
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/internationalstudenttips/"
                >
                  <img src="/insta.png" alt="Instagram" />
                </a>
                <a
                  target="_blank"
                  href="https://www.tiktok.com/@internationalstudenttips"
                >
                  <img src="/tik-tok.png" alt="TikTok" />
                </a>
              </div>
            </div>
            <div className="flex gap-16">
              <div>
                <h4 className="text-sm font-medium text-gray-800 mb-3">
                  Topics
                </h4>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/blog?category=visa-and-immigration"
                    className="text-sm text-gray-500 hover:text-[#048442]"
                  >
                    Visa & Work
                  </Link>
                  <Link
                    href="/blog?category=housing"
                    className="text-sm text-gray-500 hover:text-[#048442]"
                  >
                    Housing
                  </Link>
                  <Link
                    href="/blog?category=banking"
                    className="text-sm text-gray-500 hover:text-[#048442]"
                  >
                    Banking
                  </Link>
                  <Link
                    href="/blog?category=tax-and-money"
                    className="text-sm text-gray-500 hover:text-[#048442]"
                  >
                    Tax & Money
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-800 mb-3">Site</h4>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/"
                    className="text-sm text-gray-500 hover:text-[#048442]"
                  >
                    Home
                  </Link>
                  <Link
                    href="/blog"
                    className="text-sm text-gray-500 hover:text-[#048442]"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/tools/rent-checker"
                    className="text-sm text-gray-600 hover:text-[#048442] transition-colors"
                  >
                    Rent Checker
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm text-gray-500 hover:text-[#048442]"
                  >
                    About
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-10 pt-6 text-sm text-gray-400">
            © {new Date().getFullYear()} International Student Tips. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
