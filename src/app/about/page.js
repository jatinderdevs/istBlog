import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import { categoriesWithCountQuery } from "../../../sanity/lib/queries";
import NewsletterBanner from "@/components/newsletter/NewsletterBanner";
import {
  breadcrumbJsonLd,
  canonicalUrl,
  CONTACT_EMAIL,
  DEFAULT_OG_IMAGE,
  jsonLd,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

export const revalidate = 60;

// ─── Edit these before publishing ────────────────────────────────────────────
// Public details about the person behind the site. Everything on this page that
// speaks in the first person comes from here, so it is easy to adjust.
const AUTHOR = {
  name: "Jazz",
  role: "Founder & writer",
  location: "Melbourne, Australia",
  bio: [
    "I'm a web developer based in Melbourne. Before building this site I worked on the administrative and compliance side of international student services at Australian education providers, where the same questions came up again and again: how many hours can I work, how do I get a TFN, what does my lease actually mean, how do I get my tax back?",
    "International Student Tips is where I answer those questions properly, in plain English, with links to the official source so you can check for yourself.",
  ],
};

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61572900125280",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/internationalstudenttips/",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@internationalstudenttips",
  },
];

const OFFICIAL_SOURCES = [
  {
    name: "Department of Home Affairs",
    use: "Student visa rules, conditions and updates",
    href: "https://immi.homeaffairs.gov.au",
  },
  {
    name: "Australian Taxation Office",
    use: "Tax file numbers, tax returns and residency for tax",
    href: "https://www.ato.gov.au",
  },
  {
    name: "Fair Work Ombudsman",
    use: "Pay rates, work rights and workplace complaints",
    href: "https://www.fairwork.gov.au",
  },
  {
    name: "Study Australia",
    use: "Official study information from the Australian Government",
    href: "https://www.studyaustralia.gov.au",
  },
  {
    name: "Moneysmart",
    use: "Independent money guidance from ASIC",
    href: "https://moneysmart.gov.au",
  },
];

const STANDARDS = [
  {
    title: "Plain English first",
    text: "Government pages are accurate but hard to read, especially in your second language. We explain what a rule means for you, then link to the official page for the exact wording.",
  },
  {
    title: "Official sources, linked",
    text: "Guides on visas, tax and work rights point back to the government source they are based on, so you can verify anything before you act on it.",
  },
  {
    title: "Dated and updated",
    text: "Articles show when they were published and, where we have edited them, when they were last updated. Visa and tax rules change, so always check the date.",
  },
  {
    title: "Honest about what we are",
    text: "We are a free student resource, not a government body, a university or a migration agency. If we ever include sponsored content or affiliate links, we will label them clearly.",
  },
];

const description =
  "International Student Tips is a free, plain-English resource for international students in Australia, covering visas, work rights, housing, banking, tax and student life.";

export const metadata = {
  title: "About Us",
  description,
  alternates: {
    canonical: canonicalUrl("/about"),
  },
  openGraph: {
    title: "About International Student Tips",
    description,
    url: canonicalUrl("/about"),
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "About International Student Tips",
    description,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default async function AboutPage() {
  const categories = await client.fetch(categoriesWithCountQuery);

  const aboutSchema = jsonLd({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About International Student Tips",
    url: canonicalUrl("/about"),
    description,
    inLanguage: "en-AU",
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      founder: { "@type": "Person", name: AUTHOR.name },
      areaServed: { "@type": "Country", name: "Australia" },
      audience: {
        "@type": "Audience",
        audienceType: "International students in Australia",
      },
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: aboutSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: canonicalUrl("/") },
            { name: "About", url: canonicalUrl("/about") },
          ]),
        }}
      />

      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <span className="text-xs font-medium text-[var(--brand-green)] uppercase tracking-widest">
            About
          </span>
          <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mt-2 mb-5 leading-tight">
            Helping international students thrive in Australia
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            International Student Tips is a free, plain-English resource for
            students who have moved to Australia to study. We cover visas, work
            rights, housing, banking, tax and everyday life, so you can spend
            less time decoding rules and more time on your studies.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        {/* Why */}
        <section className="py-12 border-b border-gray-100">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            Why this site exists
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Moving to Australia as an international student is exciting, but it
            comes with a long list of questions that nobody seems to answer
            clearly. What are your actual work rights? How do you get a TFN?
            Which bank is a good fit for a student? How do you lodge a tax
            return? What should you check before signing a lease?
          </p>
          <p className="text-gray-600 leading-relaxed">
            The answers are usually out there, spread across government sites,
            university pages and social media posts of mixed quality. We pull
            them together, explain them in plain English, and point you to the
            official source for the details that matter.
          </p>
        </section>

        {/* Standards */}
        <section className="py-12 border-b border-gray-100">
          <h2 className="text-2xl font-medium text-gray-900 mb-2">
            How we write our guides
          </h2>
          <p className="text-gray-500 mb-6">
            Guidance on visas, tax and money can affect real decisions, so we
            hold every guide to the same standards.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {STANDARDS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-100 p-5"
              >
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Official sources */}
        <section className="py-12 border-b border-gray-100">
          <h2 className="text-2xl font-medium text-gray-900 mb-2">
            Official sources we rely on
          </h2>
          <p className="text-gray-500 mb-6">
            When in doubt, go straight to the source. These are the websites our
            guides most often point back to.
          </p>
          <ul className="divide-y divide-gray-100 rounded-xl border border-gray-100">
            {OFFICIAL_SOURCES.map((source) => (
              <li
                key={source.name}
                className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {source.name}
                  </p>
                  <p className="text-sm text-gray-500">{source.use}</p>
                </div>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[var(--brand-green)] hover:underline"
                >
                  Visit site →
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Topics */}
        <section className="py-12 border-b border-gray-100">
          <h2 className="text-2xl font-medium text-gray-900 mb-2">
            What we cover
          </h2>
          <p className="text-gray-500 mb-6">
            Pick a topic to see every guide on it.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/blog/category/${cat.slug}`}
                className="group rounded-xl border border-gray-100 p-5 transition-colors hover:border-[var(--brand-green)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-[var(--brand-green)]">
                    {cat.title}
                  </h3>
                  {cat.postCount > 0 && (
                    <span className="shrink-0 text-xs text-gray-400">
                      {cat.postCount}{" "}
                      {cat.postCount === 1 ? "article" : "articles"}
                    </span>
                  )}
                </div>
                {cat.description && (
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {cat.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="py-12 border-b border-gray-100">
          <h2 className="text-2xl font-medium text-gray-900 mb-2">
            Free tools
          </h2>
          <p className="text-gray-500 mb-6">
            Alongside the guides, we build simple calculators for the decisions
            students ask about most.
          </p>
          <Link
            href="/tools/rent-checker"
            className="group flex items-center justify-between gap-4 rounded-xl border border-gray-100 p-5 transition-colors hover:border-[var(--brand-green)]"
          >
            <div>
              <p className="text-sm font-medium text-gray-900 group-hover:text-[var(--brand-green)]">
                Rent affordability checker
              </p>
              <p className="text-sm text-gray-500">
                See whether a rent fits your income in each major city.
              </p>
            </div>
            <span className="text-sm font-medium text-[var(--brand-green)]">
              Try it →
            </span>
          </Link>
        </section>

        {/* Disclaimer */}
        <section
          id="disclaimer"
          className="scroll-mt-24 py-12 border-b border-gray-100"
        >
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            Important notice
          </h2>
          <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900">
            <p className="mb-3">
              The content on this site is general information only. It is not
              migration, legal, tax or financial advice, and it does not take
              your personal circumstances into account.
            </p>
            <p className="mb-3">
              Visa, tax and work rules change, sometimes quickly. Always check
              the official source linked in each guide, and look at the
              published and updated dates on the article.
            </p>
            <p>
              For advice about your own visa, speak to a registered migration
              agent or the Department of Home Affairs. For tax, speak to a
              registered tax agent or the ATO. For concerns about your education
              provider, contact them directly or use the complaint pathways they
              are required to provide.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="py-12">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            Get in touch
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Spotted something out of date, or have a topic you would like us to
            cover? We read every message and use them to decide what to write
            and update next.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-block bg-[var(--brand-green)] text-white text-sm px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
            >
              Contact us
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="rounded-lg border border-gray-200 px-5 py-3 text-sm text-gray-600 transition-colors hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
            >
              {CONTACT_EMAIL}
            </a>
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-gray-200 px-5 py-3 text-sm text-gray-600 transition-colors hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
              >
                {social.label}
              </a>
            ))}
          </div>
        </section>
      </div>

      <NewsletterBanner />
    </>
  );
}
