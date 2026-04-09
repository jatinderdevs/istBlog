import Image from "next/image";
import Link from "next/link";

export default function Footer({ settings }) {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 mt-20">
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
                <img src="/fb.png"></img>
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/internationalstudenttips/"
              >
                <img src="/insta.png"></img>
              </a>
              <a
                target="_blank"
                href="https://www.tiktok.com/@internationalstudenttips"
              >
                <img src="/tik-tok.png"></img>
              </a>
            </div>
          </div>
          <div className="flex gap-16">
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-3">Topics</h4>
              <div className="flex flex-col gap-2">
                <Link
                  href="/blog?category=visa-immigration"
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
                  href="/blog?category=tax-money"
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
    </footer>
  );
}
