import Link from "next/link";
import NewsletterInline from "@/components/newsletter/NewsletterInline";
import { DEFAULT_OFFER } from "@/lib/newsletter";
import {
  breadcrumbJsonLd,
  canonicalUrl,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
} from "@/lib/seo";

// Landing page for every social bio link, QR code and partner link.
// Use UTM links so GA4 shows where people came from, e.g.
// /newsletter?utm_source=instagram&utm_medium=bio
// /newsletter?utm_source=oweek-monash&utm_medium=flyer

const title = "Free Newsletter for International Students in Australia";
const description =
  "Plain-English guides on visas, work rights, tax, renting and money for international students in Australia, sent to your inbox. Free, unsubscribe anytime.";

export const metadata = {
  title: "Newsletter",
  description,
  alternates: {
    canonical: canonicalUrl("/newsletter"),
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl("/newsletter"),
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [DEFAULT_OG_IMAGE],
  },
};

const WHAT_YOU_GET = [
  {
    title: "Visa and work-rights changes",
    text: "When rules change for student visa holders, we explain what it means for you in plain English.",
  },
  {
    title: "Money, tax and renting guides",
    text: "TFNs, tax returns, super, bonds, rental scams and budgeting, written for international students.",
  },
  {
    title: "Checked against official sources",
    text: "We check our guides against government sources like Home Affairs, the ATO and Fair Work.",
  },
  {
    title: "No spam",
    text: "We only email when we have something useful. Unsubscribe in one click, anytime.",
  },
];

export default function NewsletterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: canonicalUrl("/") },
            { name: "Newsletter", url: canonicalUrl("/newsletter") },
          ]),
        }}
      />
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <span className="mb-4 inline-block rounded-full bg-[var(--brand-green-light)] px-3 py-1 text-xs font-medium text-[var(--brand-green)]">
            Free newsletter
          </span>
          <h1 className="mb-4 text-3xl font-medium leading-tight text-gray-900 md:text-4xl">
            Clear answers for international students in Australia, sent to your inbox
          </h1>
          <p className="text-lg leading-relaxed text-gray-500">
            Visas, work rights, tax, renting and money, explained in plain
            English. Join the {SITE_NAME} newsletter.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <NewsletterInline offer={DEFAULT_OFFER} source="newsletter-page" />

        <section aria-labelledby="what-you-get" className="mt-14">
          <h2 id="what-you-get" className="mb-6 text-2xl font-medium text-gray-900">
            What you&apos;ll get
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {WHAT_YOU_GET.map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 p-5">
                <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="who-writes" className="mt-14">
          <h2 id="who-writes" className="mb-4 text-2xl font-medium text-gray-900">
            Who writes it
          </h2>
          <p className="text-base leading-relaxed text-gray-600">
            {SITE_NAME} was started by Somin Byun, who moved from South Korea
            to Melbourne in 2023 to study a Master of Data Analytics at Monash
            University. She saw how hard it was for international students to
            find clear answers when official information is complex and English
            isn&apos;t your first language. So we write the guides we wish we
            had.{" "}
            <Link
              href="/about"
              className="text-[var(--brand-green)] underline underline-offset-2"
            >
              More about us
            </Link>
            .
          </p>
        </section>

        <p className="mt-10 rounded-xl bg-gray-50 px-5 py-4 text-sm leading-relaxed text-gray-500">
          Our emails are general information, not migration, legal, tax or
          financial advice. You can unsubscribe at any time using the link in
          every email.
        </p>
      </div>
    </>
  );
}
