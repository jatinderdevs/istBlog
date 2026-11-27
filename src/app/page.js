import Link from "next/link";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import {
  postsQuery,
  categoriesWithCountQuery,
  featuredPostQuery,
  settingsQuery,
  guidesListQuery,
} from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";
import NewsletterBanner from "@/components/newsletter/NewsletterBanner";
import GuideCard from "@/components/blog/GuideCard";
import { readTimeLabel } from "@/lib/seo";

export const revalidate = 60;

const FAQS = [
  {
    q: "Is International Student Tips free?",
    a: "Yes. Every guide and tool on the site is free to read and use. There is no sign-up needed, although you can join our newsletter if you want new guides sent to your inbox.",
  },
  {
    q: "Is this migration or legal advice?",
    a: "No. Our guides are general information to help you understand the basics. They do not take your personal circumstances into account. For advice about your own visa, speak to a registered migration agent or the Department of Home Affairs.",
  },
  {
    q: "Where does the information come from?",
    a: "We base our guides on official sources such as the Department of Home Affairs, the Australian Taxation Office and the Fair Work Ombudsman, and we link to them so you can check the details yourself.",
  },
  {
    q: "How do I know a guide is still current?",
    a: "Each article shows when it was published and, where it has been edited, when it was last updated. Visa, tax and work rules can change quickly, so always confirm with the official source before you act.",
  },
  {
    q: "Can I suggest a topic?",
    a: "Please do. Use our contact page to tell us what you are struggling to find answers on. Student questions decide what we write and update next.",
  },
];

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function SectionHeading({ eyebrow, title, intro }) {
  return (
    <div className="mb-8 max-w-2xl">
      {eyebrow && (
        <p className="text-xs font-medium text-[var(--brand-green)] uppercase tracking-widest mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl md:text-3xl font-medium text-gray-900">
        {title}
      </h2>
      {intro && <p className="mt-3 text-gray-500 leading-relaxed">{intro}</p>}
    </div>
  );
}

export default async function Home() {
  const [posts, categories, featuredPost, settings, guides] = await Promise.all(
    [
      client.fetch(postsQuery),
      client.fetch(categoriesWithCountQuery),
      client.fetch(featuredPostQuery),
      client.fetch(settingsQuery),
      client.fetch(guidesListQuery),
    ],
  );

  const heroPost = featuredPost || posts[0];
  const otherPosts = posts.filter((p) => p._id !== heroPost?._id);
  const sidePosts = otherPosts.slice(0, 3);
  // Latest grid continues after the side list so no post appears twice
  const recentPosts = otherPosts.slice(3, 9);
  const startGuides = guides.slice(0, 3);

  // Hero photo comes from Site Settings; without one, a topic panel is shown
  const heroImage = settings?.heroImage?.asset ? settings.heroImage : null;
  const heroImageAlt =
    heroImage?.alt || "International students studying in Australia";
  const heroTopics = [
    { icon: "🛂", label: "Visas" },
    { icon: "💼", label: "Work rights" },
    { icon: "🏠", label: "Housing" },
    { icon: "💰", label: "Money & tax" },
  ];

  const totalContent = posts.length + guides.length;
  const trustStats = [
    totalContent > 0 && {
      value: `${totalContent}`,
      label: totalContent === 1 ? "Guide & article" : "guides & articles",
    },
    categories.length > 0 && {
      value: `${categories.length}`,
      label: "topics covered",
    },
    { value: "Official", label: "sources linked" },
    { value: "Free", label: "to read, always" },
  ].filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fdf7ee] via-[#fbf3e6] to-[var(--brand-green-light)]">
        {/* Soft decorative glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-[var(--brand-yellow)]/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[var(--brand-green)]/15 blur-3xl"
        />

        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            {/* Copy */}
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-green)]/15 bg-white/80 px-3 py-1 text-xs font-medium text-[var(--brand-green)] shadow-sm backdrop-blur mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" />
                For International Students in Australia
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-semibold tracking-tight text-gray-900 leading-[1.1] mb-6">
                {settings?.heroHeading ||
                  "Your guide to life & study in Australia"}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-9">
                {settings?.heroSubtext ||
                  "Practical guides on visa rules, work rights, housing, banking and everything you need to thrive as an international student."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-green)] px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-[var(--brand-green)]/20 transition-all hover:-translate-y-0.5 hover:bg-green-800"
                >
                  {settings?.heroButtonText || "Browse all guides"}
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/tools/rent-checker"
                  className="inline-flex items-center rounded-full border border-gray-300/80 bg-white/70 px-7 py-3.5 text-sm font-medium text-gray-700 backdrop-blur transition-colors hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
                >
                  Try the rent checker
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rotate-3 rounded-[2rem] bg-[var(--brand-yellow)]/40"
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[var(--brand-green-light)] shadow-2xl shadow-[var(--brand-green)]/15 ring-1 ring-black/5">
                {heroImage ? (
                  <Image
                    src={urlFor(heroImage).width(1200).height(900).url()}
                    alt={heroImageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col justify-center bg-gradient-to-br from-[var(--brand-green)] to-[#03643a] p-8 sm:p-10">
                    <span className="mb-5 text-5xl" aria-hidden="true">
                      🎓
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {heroTopics.map((t) => (
                        <div
                          key={t.label}
                          className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-3 text-sm font-medium text-white ring-1 ring-white/15 backdrop-blur"
                        >
                          <span aria-hidden="true">{t.icon}</span>
                          {t.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {heroImage && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                )}
              </div>

              {/* Floating trust chips */}
              {trustStats[0] && (
                <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5 sm:-left-6">
                  <span className="text-xs leading-tight text-gray-600">
                    {trustStats[0].label}
                    <br />
                    <span className="text-gray-400">written for students</span>
                  </span>
                </div>
              )}
              <div className="absolute -top-4 right-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-lg ring-1 ring-black/5 sm:-right-4">
                <span className="text-[var(--brand-green)]">✓</span>
                Official sources linked · Free
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-6xl mx-auto px-6 py-5">
          {/* Featured post */}
          {heroPost && (
            <section className="pt-16">
              <SectionHeading eyebrow="Featured" title="Read this first" />
              <div className="grid md:grid-cols-2 gap-8">
                <Link href={`/blog/${heroPost.slug.current}`} className="group">
                  <div className="relative bg-[var(--brand-green-light)] rounded-2xl h-64 overflow-hidden mb-5">
                    {heroPost.mainImage ? (
                      <Image
                        src={urlFor(heroPost.mainImage)
                          .width(800)
                          .height(500)
                          .url()}
                        alt={heroPost.mainImage.alt || heroPost.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <span className="text-5xl">📖</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    {heroPost.categories?.[0] && (
                      <span className="text-xs font-medium text-[var(--brand-green)] bg-[var(--brand-green-light)] px-2 py-0.5 rounded-full">
                        {heroPost.categories[0]}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-medium text-gray-900 leading-snug mb-3 group-hover:text-[var(--brand-green)] transition-colors">
                    {heroPost.title}
                  </h3>
                  {heroPost.excerpt && (
                    <p className="text-gray-500 leading-relaxed text-sm mb-3">
                      {heroPost.excerpt}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">
                    {[
                      heroPost.publishedAt && formatDate(heroPost.publishedAt),
                      readTimeLabel(heroPost.wordCount),
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </Link>

                {/* Side posts */}
                <div className="flex flex-col gap-5">
                  {sidePosts.map((post, i) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug.current}`}
                      className="group flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-[var(--brand-green)] transition-colors"
                    >
                      <span className="text-2xl font-medium text-gray-200 min-w-[32px]">
                        0{i + 1}
                      </span>
                      <div>
                        {post.categories?.[0] && (
                          <span className="text-xs font-medium text-[var(--brand-green)]">
                            {post.categories[0]}
                          </span>
                        )}
                        <h3 className="text-sm font-medium text-gray-800 leading-snug mt-1 group-hover:text-[var(--brand-green)] transition-colors">
                          {post.title}
                        </h3>
                        {readTimeLabel(post.wordCount) && (
                          <p className="text-xs text-gray-400 mt-1">
                            {readTimeLabel(post.wordCount)}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        {/* Start here: complete guides */}
        {startGuides.length > 0 && (
          <section className="pt-16">
            <SectionHeading
              eyebrow="Start here"
              title="Complete guides"
              intro="New to Australia, or tackling something big? These in-depth guides walk you through it step by step."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {startGuides.map((guide, i) => (
                <GuideCard
                  key={guide._id}
                  guide={guide}
                  variant={i === 0 ? "featured" : "default"}
                />
              ))}
            </div>
          </section>
        )}

        {/* Browse by topic */}
        {categories.length > 0 && (
          <section className="pt-16">
            <SectionHeading
              eyebrow="Browse by topic"
              title="Find answers by what you need"
              intro="Every guide is filed under a topic, so you can go straight to visas, work rights, housing, money or student life."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/blog/category/${cat.slug}`}
                  className="group flex flex-col rounded-2xl border border-gray-100 p-5 transition-colors hover:border-[var(--brand-green)]"
                >
                  <h3 className="text-base font-medium text-gray-900 group-hover:text-[var(--brand-green)]">
                    {cat.title}
                  </h3>
                  {cat.description && (
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500">
                      {cat.description}
                    </p>
                  )}
                  <p className="mt-auto pt-4 text-xs text-gray-400">
                    {cat.postCount}{" "}
                    {cat.postCount === 1 ? "article" : "articles"}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Latest posts */}
        {recentPosts.length > 0 && (
          <section className="pt-16">
            <SectionHeading
              eyebrow="Latest posts"
              title="Fresh from the blog"
            />
            <div className="grid md:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group border border-gray-100 rounded-2xl overflow-hidden hover:border-[var(--brand-green)] transition-colors"
                >
                  <div className="relative bg-[var(--brand-green-light)] h-44 overflow-hidden">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage)
                          .width(600)
                          .height(400)
                          .url()}
                        alt={post.mainImage.alt || post.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <span className="text-4xl">📝</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    {post.categories?.[0] && (
                      <span className="text-xs font-medium text-[var(--brand-green)]">
                        {post.categories[0]}
                      </span>
                    )}
                    <h3 className="text-base font-medium text-gray-800 leading-snug mt-1 mb-3 group-hover:text-[var(--brand-green)] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {[
                        post.publishedAt && formatDate(post.publishedAt),
                        readTimeLabel(post.wordCount),
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-block border border-[var(--brand-green)] text-[var(--brand-green)] text-sm px-6 py-3 rounded-lg hover:bg-[var(--brand-green)] hover:text-white transition-colors"
              >
                View all guides &amp; posts
              </Link>
            </div>
          </section>
        )}

        {/* Tool */}
        <section className="pt-16">
          <div className="rounded-2xl bg-[var(--brand-green)] px-6 py-10 md:px-10">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-white/70 mb-2">
                  Free tool
                </p>
                <h2 className="text-2xl font-medium text-white md:text-3xl">
                  Can you afford the rent?
                </h2>
                <p className="mt-3 max-w-xl text-white/80 leading-relaxed">
                  Enter your weekly income and rent to see how it compares with
                  the common 30% guideline, and with typical rents in each major
                  city.
                </p>
              </div>
              <Link
                href="/tools/rent-checker"
                className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-medium text-[var(--brand-green)] transition-colors hover:bg-white/90"
              >
                Check your rent →
              </Link>
            </div>
          </div>
        </section>

        {/* Why trust us */}
        <section className="py-16">
          <SectionHeading
            eyebrow="Why students use us"
            title="Clear answers you can check"
            intro="Advice about visas, tax and money has to be reliable. Here is how we try to earn your trust."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Plain English",
                text: "We explain what the rules mean for you, without legal jargon.",
              },
              {
                title: "Official sources, linked",
                text: "Our guides point to the government pages they are based on so you can verify everything.",
              },
              {
                title: "Dated and open about limits",
                text: "Articles show when they were published or updated, and we are clear that this is general information, not advice.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 p-6"
              >
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Want to know more?{" "}
            <Link
              href="/about"
              className="font-medium text-[var(--brand-green)] hover:underline"
            >
              See how we write our guides →
            </Link>
          </p>
        </section>

        <NewsletterBanner />

        {/* FAQ */}
        <section className="pt-16 pb-16">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions"
            intro="A few quick answers about the site."
          />
          <div className="max-w-3xl divide-y divide-gray-100 rounded-2xl border border-gray-100">
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
      </div>
    </div>
  );
}
