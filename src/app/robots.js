export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/studio/"],
    },
    sitemap: "https://www.internationalstudenttips.com.au/sitemap.xml",
  };
}
