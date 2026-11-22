import { NextResponse } from "next/server";
import { OLD_CATEGORY_REDIRECTS } from "@/lib/categoryRedirects.mjs";

// Old filter URLs like /blog?category=housing now live at
// /blog/category/housing. Redirecting here (rather than reading searchParams in
// the page) keeps /blog fully static and gives one canonical URL per topic.
// Categories removed in the Nov 2026 restructure go straight to their new
// home, so there is never a redirect chain.
export function proxy(request) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");

  if (category === null) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.search = "";

  const slug = category.toLowerCase();
  if (Object.hasOwn(OLD_CATEGORY_REDIRECTS, slug)) {
    url.pathname = OLD_CATEGORY_REDIRECTS[slug];
  } else {
    url.pathname = /^[a-z0-9-]+$/.test(slug) ? `/blog/category/${slug}` : "/blog";
  }

  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: "/blog",
};
