// app/tools/rent-checker/metadata.js
// Next.js requires metadata exports to come from a Server Component.
// Because page.js uses "use client", we export metadata from here
// and re-export it from a thin layout.js wrapper at the same route level.
// See: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

export const metadata = {
  title: "Rent Affordability Calculator for International Students in Australia",
  description:
    "Free tool to check if your rent is affordable on a student visa income. Compare typical rents across Sydney, Melbourne, Brisbane, Perth, Adelaide and Canberra — with the 30% guideline explained.",
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
    title:
      "Rent Affordability Calculator for International Students in Australia",
    description:
      "Enter your weekly income and rent to see if your housing costs are sustainable — with real rental ranges for every major Australian city.",
    url: "https://www.internationalstudenttips.com.au/tools/rent-checker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rent Affordability Calculator — International Student Tips",
    description:
      "Free tool: is your rent affordable on a student income in Australia?",
  },
  alternates: {
    canonical:
      "https://www.internationalstudenttips.com.au/tools/rent-checker",
  },
};
