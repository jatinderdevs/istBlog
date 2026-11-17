import Link from "next/link";
import { canonicalUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

const description =
  "Learn about International Student Tips and our practical guides for international students living and studying in Australia.";

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
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <span className="text-xs font-medium text-[var(--brand-green)] uppercase tracking-widest">
          About
        </span>
        <h1 className="text-4xl font-medium text-gray-900 mt-2 mb-5">
          Helping international students thrive in Australia
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          IST Blogs is a practical resource for international students
          navigating life in Australia — from visa rules and work rights to
          housing, banking, and building a life here.
        </p>
      </div>

      {/* Story Section */}
      <div className="border-t border-gray-100 pt-10 mb-10">
        <h2 className="text-2xl font-medium text-gray-900 mb-4">
          Why this blog exists
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Moving to Australia as an international student is exciting — but it
          comes with a lot of questions that nobody seems to answer clearly.
          What are your actual work rights? How do you get a TFN? Which bank is
          actually good for students? How do you do a tax return?
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          This blog exists to answer those questions honestly, in plain English,
          so you can focus on your studies and enjoy your time in Australia.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Every guide is written from real experience — not copied from
          government websites.
        </p>
      </div>

      {/* What We Cover */}
      <div className="border-t border-gray-100 pt-10 mb-10">
        <h2 className="text-2xl font-medium text-gray-900 mb-6">
          What we cover
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              emoji: "📋",
              topic: "Visa & Immigration",
              desc: "Work hours, bridging visas, renewals and conditions explained simply.",
            },
            {
              emoji: "💼",
              topic: "Work Rights",
              desc: "TFN, ABN, minimum wage, your rights as a student worker.",
            },
            {
              emoji: "🏠",
              topic: "Housing",
              desc: "Finding share houses, understanding leases, tenant rights.",
            },
            {
              emoji: "🏦",
              topic: "Banking",
              desc: "Best accounts for students, how to open one, sending money home.",
            },
            {
              emoji: "💰",
              topic: "Tax & Money",
              desc: "How to do your tax return and get back what you are owed.",
            },
            {
              emoji: "🎓",
              topic: "University Life",
              desc: "Academic culture, plagiarism rules, making the most of uni.",
            },
            {
              emoji: "🛂",
              topic: "PR Pathways",
              desc: "Options for staying in Australia after you graduate.",
            },
            {
              emoji: "🌏",
              topic: "Life in Australia",
              desc: "Healthcare, transport, culture and settling in.",
            },
          ].map((item) => (
            <div
              key={item.topic}
              className="flex gap-4 p-4 rounded-xl border border-gray-100"
            >
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <h3 className="text-sm font-medium text-gray-800 mb-1">
                  {item.topic}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-gray-100 pt-10">
        <h2 className="text-2xl font-medium text-gray-900 mb-4">
          Start reading
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Browse our latest guides or jump straight to the topic you need help
          with right now.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-[var(--brand-green)] text-white text-sm px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
        >
          Browse all guides
        </Link>
      </div>
    </div>
  );
}
