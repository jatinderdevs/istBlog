import { NextResponse } from "next/server";

// Old filter URLs like /blog?category=housing now live at
// /blog/category/housing. Redirecting here (rather than reading searchParams in
// the page) keeps /blog fully static and gives one canonical URL per topic.
export function proxy(request) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");

  if (category === null) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.search = "";
  url.pathname = /^[a-z0-9-]+$/i.test(category)
    ? `/blog/category/${category.toLowerCase()}`
    : "/blog";

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: "/blog",
};
