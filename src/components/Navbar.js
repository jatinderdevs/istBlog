"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="IST Blogs"
              width={140}
              height={60}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-[#048442] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-600 hover:text-[#048442] transition-colors"
            >
              Blogs
            </Link>
            <Link
              href="/tools/rent-checker"
              className="text-sm text-gray-600 hover:text-[#048442] transition-colors"
            >
              Rent Checker
            </Link>
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-[#048442] transition-colors"
            >
              About
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 -mr-2 text-gray-600 hover:text-[#048442]"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6h12v12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col space-y-4 text-sm">
              <Link
                href="/"
                className="text-gray-600 hover:text-[#048442] py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-gray-600 hover:text-[#048442] py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="/tools/rent-checker"
                className="text-gray-600 hover:text-[#048442] py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Rent Checker
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-[#048442] py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
