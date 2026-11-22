import { OLD_CATEGORY_REDIRECTS } from "./src/lib/categoryRedirects.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Tell Next.js not to bundle these on server side
  serverExternalPackages: ["sanity"],

  async redirects() {
    return [
      // Old or mistyped post slugs that still collect Google impressions
      {
        source: "/blog/cash-in-hand-jobs-in-australia-are-legal",
        destination: "/blog/cash-in-hand-jobs-in-australia-are-they-legal",
        permanent: true,
      },
      {
        source: "/blog/cash-in-hand-jobs-in-australia-are-the-legal",
        destination: "/blog/cash-in-hand-jobs-in-australia-are-they-legal",
        permanent: true,
      },
      {
        source: "/blog/how-to-see-a-doctor-as-an-international-student",
        destination:
          "/blog/how-to-see-a-doctor-in-australia-as-an-international-student",
        permanent: true,
      },
      {
        source: "/blog/how-to-see-a-doctor-in-australia-as-international-student",
        destination:
          "/blog/how-to-see-a-doctor-in-australia-as-an-international-student",
        permanent: true,
      },
      {
        source: "/blog/best-bank-account-for-international-students-in-australia",
        destination:
          "/blog/best-bank-account-for-international-students-in-australia-2026",
        permanent: true,
      },
      {
        source: "/blog/what-happens-if-your-visa-hours",
        destination: "/blog/what-happens-if-you-work-more-than-your-visa-hours",
        permanent: true,
      },

      // Note: old filter URLs (/blog?category=housing) are redirected to the
      // clean category pages in src/proxy.js, which can drop the query string.
      {
        source: "/blog/top-student-discounts-and-perks-in-australia",
        destination: "/blog",
        permanent: true,
      },
      {
        source:
          "/blog/how-to-find-internships-in-australia-tips-for-international-students",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/summer-break-activities-to-do-in-australia-2025",
        destination: "/blog",
        permanent: true,
      },
      {
        source:
          "/blog/how-to-make-friends-as-an-international-student-in-australia",
        destination: "/blog",
        permanent: true,
      },

      {
        source:
          "/blog/australia%27s-new-visa-rules%3A-what-international-students-need-to-know-after-election",
        destination: "/blog",
        permanent: true,
      },
      {
        source:
          "/blog/how-to-apply-for-an-international-student-visa-for-australia%3A-the-complete-guide",
        destination: "/blog",
        permanent: true,
      },
      {
        source:
          "/blog/australia%27s-september-2025-student-visa-update-understanding-the-new-evidence-levels-for-countries",
        destination: "/blog",
        permanent: true,
      },

      {
        source: "/category/Travel-and-Explore",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/category/Money-Management",
          destination: "/blog/category/tax-and-money",

        permanent: true,
      },
      {
        source: "/category/Work-in-Australia",
        destination: "/blog/category/jobs-and-work-rights",
        permanent: true,
      },
      {
        source: "/category/Student-Visa",
          destination: "/blog/category/visa-and-immigration",

        permanent: true,
      },
      // November 2026 category restructure: 12 categories -> 7 topic hubs
      // (+ Melbourne). Each removed category 301s straight to its new home.
      ...Object.entries(OLD_CATEGORY_REDIRECTS).map(([oldSlug, destination]) => ({
        source: `/blog/category/${oldSlug}`,
        destination,
        statusCode: 301,
      })),

      // Catch-all for any other /category/* pages
      {
        source: "/category/:slug*",
        destination: "/blog",
        permanent: true,
      },

      {
        source: "/tag/:slug*",
        destination: "/blog",
        permanent: true,
      },

      {
        source: "/latest-blogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
