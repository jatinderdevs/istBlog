import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/seo";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61572900125280",
    path: "M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0022 12z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/internationalstudenttips/",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@internationalstudenttips",
    path: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z",
  },
];

const FALLBACK_TOPICS = [
  { slug: "visa-and-immigration", title: "Visa & Immigration" },
  { slug: "housing", title: "Housing" },
  { slug: "banking", title: "Banking" },
  { slug: "tax-and-money", title: "Tax & Money" },
];

const EXPLORE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "All guides & posts" },
  { href: "/tools/rent-checker", label: "Rent Checker" },
];

const SUPPORT_LINKS = [
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact us" },
  { href: "/about#disclaimer", label: "Important notice" },
];

const columnHeading =
  "mb-4 text-xs font-semibold uppercase tracking-widest text-white/50";
const columnLink = "text-sm text-white/70 transition-colors hover:text-white";

export default function Footer({ settings, categories }) {
  const topics = categories?.length ? categories : FALLBACK_TOPICS;

  return (
    <footer className="mt-24 bg-green-800 text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-block rounded-lg bg-white px-3 py-2"
            >
              <Image
                src="/logo.png"
                alt="International Student Tips"
                width={116}
                height={49}
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {settings?.footerTagline ||
                "Helping international students thrive in Australia with practical, honest guides."}
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
            >
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                />
              </svg>
              {CONTACT_EMAIL}
            </a>

            <ul className="mt-6 flex items-center gap-3">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-[var(--brand-green)] hover:text-white"
                  >
                    <svg
                      className="h-[18px] w-[18px]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <nav aria-label="Topics">
              <h3 className={columnHeading}>Topics</h3>
              <ul className="flex flex-col gap-3">
                {topics.map((topic) => (
                  <li key={topic.slug}>
                    <Link
                      href={`/blog/category/${topic.slug}`}
                      className={columnLink}
                    >
                      {topic.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Explore">
              <h3 className={columnHeading}>Explore</h3>
              <ul className="flex flex-col gap-3">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={columnLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Support">
              <h3 className={columnHeading}>Support</h3>
              <ul className="flex flex-col gap-3">
                {SUPPORT_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={columnLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-white/50">
            Our guides are general information for international students, not
            migration, legal, tax or financial advice. Rules change, so always
            check the official source or speak to a registered professional
            before making decisions.{" "}
            <Link
              href="/about#disclaimer"
              className="underline underline-offset-2 transition-colors hover:text-white"
            >
              Read our full notice
            </Link>
            .
          </p>
          <p className="mt-4 text-xs text-white/50">
            © {new Date().getFullYear()} International Student Tips. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
