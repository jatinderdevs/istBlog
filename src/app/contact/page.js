import Link from "next/link";
import CopyEmailButton from "@/components/CopyEmailButton";
import {
  breadcrumbJsonLd,
  canonicalUrl,
  CONTACT_EMAIL,
  DEFAULT_OG_IMAGE,
  jsonLd,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

const description =
  "Contact International Student Tips with questions about our guides, corrections, topic suggestions or collaboration. Email hello@internationalstudenttips.com.au.";

export const metadata = {
  title: "Contact Us",
  description,
  alternates: {
    canonical: canonicalUrl("/contact"),
  },
  openGraph: {
    title: "Contact International Student Tips",
    description,
    url: canonicalUrl("/contact"),
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact International Student Tips",
    description,
    images: [DEFAULT_OG_IMAGE],
  },
};

function mailto(subject) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

const REASONS = [
  {
    title: "Questions about our content",
    text: "Not sure what a guide means, or can't find something you expected? Ask and we'll point you in the right direction.",
    subject: "Question about your content",
  },
  {
    title: "Corrections & updates",
    text: "Spotted something out of date or incorrect? Send us the page and, if you can, a link to the official source. Accuracy matters most on visa, tax and work rights.",
    subject: "Correction or update",
  },
  {
    title: "Topic suggestions",
    text: "Tell us what you are struggling to find clear answers on. Student questions help us decide what to write and update next.",
    subject: "Topic suggestion",
  },
  {
    title: "Collaboration & partnerships",
    text: "Education providers, student organisations and service providers are welcome to get in touch about working together.",
    subject: "Collaboration enquiry",
  },
];

const FAQS = [
  {
    q: "Can you give me advice about my own visa?",
    a: "We can't. Our guides are general information, and we are not registered migration agents. For advice about your situation, speak to a registered migration agent or contact the Department of Home Affairs.",
  },
  {
    q: "How do I report a mistake in a guide?",
    a: "Email us with the page address and what you think is wrong. A link to the official source helps us check and fix it faster.",
  },
  {
    q: "Can I write a guest post or share my story?",
    a: "Possibly. Email us a short outline of what you would like to cover and why it would help other international students.",
  },
];

export default function ContactPage() {
  const contactSchema = jsonLd({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact International Student Tips",
    url: canonicalUrl("/contact"),
    description,
    inLanguage: "en-AU",
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT_EMAIL,
        areaServed: "AU",
        availableLanguage: "English",
      },
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: contactSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: canonicalUrl("/") },
            { name: "Contact", url: canonicalUrl("/contact") },
          ]),
        }}
      />

      {/* Hero */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <span className="text-xs font-medium uppercase tracking-widest text-[var(--brand-green)]">
            Contact
          </span>
          <h1 className="mt-2 mb-5 text-4xl font-medium leading-tight text-gray-900 md:text-5xl">
            Get in touch
          </h1>
          <p className="text-lg leading-relaxed text-gray-500">
            Have a question about our content, spotted something that needs
            fixing, or want to work with us? Send us an email. We read every
            message and use your feedback to improve the site.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6">
        {/* Email card */}
        <section className="py-12">
          <div className="rounded-3xl border border-[var(--brand-green)]/20 bg-[var(--brand-green-light)] p-6 md:p-8">
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-green)]">
              Email us
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-2 block text-base font-medium text-gray-900 transition-colors hover:text-[var(--brand-green)] min-[400px]:text-lg sm:text-2xl md:text-3xl"
            >
              {/* Two inline-blocks so on phones it wraps after the @ and never mid-word */}
              <span className="inline-block">{CONTACT_EMAIL.split("@")[0]}@</span>
              <span className="inline-block">{CONTACT_EMAIL.split("@")[1]}</span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Please include as much detail as you can, such as the page
              address if you are writing about an article. We aim to reply
              within a few business days.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-block rounded-full bg-[var(--brand-green)] px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-800"
              >
                Send an email
              </a>
              <CopyEmailButton email={CONTACT_EMAIL} />
            </div>
          </div>
        </section>

        {/* Reasons */}
        <section className="border-t border-gray-100 py-12">
          <h2 className="mb-2 text-2xl font-medium text-gray-900">
            What you can contact us about
          </h2>
          <p className="mb-6 text-gray-500">
            Choose a topic and your email app will open with the subject
            already filled in.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {REASONS.map((reason) => (
              <a
                key={reason.title}
                href={mailto(reason.subject)}
                className="group flex flex-col rounded-2xl border border-gray-100 p-5 transition-colors hover:border-[var(--brand-green)]"
              >
                <h3 className="text-base font-medium text-gray-900 group-hover:text-[var(--brand-green)]">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {reason.text}
                </p>
                <span className="mt-auto pt-4 text-sm font-medium text-[var(--brand-green)]">
                  Email us about this →
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Scope note */}
        <section className="border-t border-gray-100 py-12">
          <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900">
            <p className="mb-2 font-medium">Before you write</p>
            <p>
              We are a student information site, not a migration agency, law
              firm, tax agent or financial adviser, so we can&apos;t give advice
              on your personal visa, legal, tax or money situation. For that,
              speak to a registered professional or the relevant government
              agency. You can read more in our{" "}
              <Link
                href="/about#disclaimer"
                className="font-medium underline underline-offset-2"
              >
                important notice
              </Link>
              .
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-100 py-12">
          <h2 className="mb-6 text-2xl font-medium text-gray-900">
            Quick answers
          </h2>
          <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100">
            {FAQS.map((item) => (
              <details key={item.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-gray-900">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="text-[var(--brand-green)] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Follow */}
        <section className="border-t border-gray-100 py-12">
          <h2 className="mb-2 text-2xl font-medium text-gray-900">
            Prefer social media?
          </h2>
          <p className="mb-5 text-gray-500">
            You can also find us on these channels. For anything that needs a
            proper reply, email is best.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
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
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gray-200 px-5 py-2.5 text-sm text-gray-600 transition-colors hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
              >
                {social.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
