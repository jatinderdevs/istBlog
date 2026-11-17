import { canonicalUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

const title = "Rent Affordability Checker";
const description =
  "Check whether your rent is affordable on a student income in Australia, with typical rents across major cities and the 30% guideline explained.";

export const metadata = {
  title,
  description,
  keywords: [
    "rent affordability calculator australia",
    "international student rent australia",
    "student rent sydney melbourne brisbane",
    "how much rent can i afford australia",
    "student visa work hours rent calculator",
    "affordable rent international student",
    "share house cost australia student",
  ],
  openGraph: {
    title,
    description,
    url: canonicalUrl("/tools/rent-checker"),
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: canonicalUrl("/tools/rent-checker"),
  },
};
