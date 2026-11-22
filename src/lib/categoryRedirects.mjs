// November 2026 category restructure: 12 categories -> 7 topic hubs
// (+ Student Life in Melbourne). Each removed category slug maps straight to
// where its content now lives, so every old URL is a single 301 hop.
//
// Used by next.config.mjs (path redirects) and src/proxy.js
// (old /blog?category=<slug> links). If you remove or rename a category in
// Sanity again, add its old slug here.
export const OLD_CATEGORY_REDIRECTS = {
  "student-jobs": "/blog/category/jobs-and-work-rights",
  "work-rights": "/blog/category/jobs-and-work-rights",
  banking: "/blog/category/arriving-and-settling-in",
  "student-life-in-australia": "/blog/category/arriving-and-settling-in",
  "discounts-and-perks": "/blog/category/saving-money",
  "public-transport": "/blog/category/saving-money",
  "student-resources": "/blog",
  "university-life": "/blog",
};
