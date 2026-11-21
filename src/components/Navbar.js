"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Guides" },
  { href: "/tools/rent-checker", label: "Rent Checker" },
  { href: "/about", label: "About" },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const [menuState, setMenuState] = useState({ open: false, path: "" });
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // The menu counts as open only on the page it was opened on, so navigating
  // anywhere closes it without needing an effect to reset state.
  const isOpen = menuState.open && menuState.path === pathname;

  function toggleMenu() {
    setMenuState({ open: !isOpen, path: pathname });
  }

  function closeMenu() {
    setMenuState({ open: false, path: pathname });
  }

  // Subtle shadow once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuState({ open: false, path: pathname });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-shadow ${
        scrolled
          ? "border-gray-200/80 bg-white/90 shadow-sm"
          : "border-gray-100 bg-white/80"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        {/* Logo */}
        <Link href="/" className="shrink-0" aria-label="International Student Tips home">
          <Image
            src="/logo.png"
            alt="International Student Tips"
            width={128}
            height={54}
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    active
                      ? "bg-[var(--brand-green-light)] font-medium text-[var(--brand-green)]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[var(--brand-green)]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contact"
            aria-current={isActive(pathname, "/contact") ? "page" : undefined}
            className="rounded-full bg-[var(--brand-green)] px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-800"
          >
            Contact us
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={toggleMenu}
          className="-mr-2 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-[var(--brand-green)] md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="border-t border-gray-100 bg-white md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-lg px-4 py-3 text-sm transition-colors ${
                      active
                        ? "bg-[var(--brand-green-light)] font-medium text-[var(--brand-green)]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                href="/contact"
                onClick={closeMenu}
                className="block rounded-lg bg-[var(--brand-green)] px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-green-800"
              >
                Contact us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
