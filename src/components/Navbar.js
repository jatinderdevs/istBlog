import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-100 bg-white top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="IST Blogs"
            width={140}
            height={60}
            priority
          />
        </Link>
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
            Blog
          </Link>
          <Link
            href="/blog?category=visa"
            className="text-sm text-gray-600 hover:text-[#048442] transition-colors"
          >
            Visa & Work
          </Link>
          <Link
            href="/blog?category=housing"
            className="text-sm text-gray-600 hover:text-[#048442] transition-colors"
          >
            Housing
          </Link>
          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-[#048442] transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
