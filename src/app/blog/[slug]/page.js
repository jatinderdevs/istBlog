import { client } from "../../../../sanity/lib/client";
import {
  postQuery,
  postsQuery,
  relatedPostsQuery,
} from "../../../../sanity/lib/queries";
import {
  guidePageQuery,
  guidePageSlugsQuery,
} from "../../../../sanity/queries/guidePageQuery";
import { PortableText } from "@portabletext/react";
import { guidePortableTextComponents } from "../../../../lib/portableTextComponents";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { urlFor } from "../../../../sanity/lib/image";
import HeroBanner from "@/components/blog/HeroBanner";
import TableOfContents from "@/components/blog/TableOfContents";
import SectionHeader from "@/components/blog/SectionHeader";
import InfoCard from "@/components/blog/InfoCard";
import CalloutBox from "@/components/blog/CalloutBox";
import InternalLinkCallout from "@/components/blog/InternalLinkCallout";
import QuickReferenceTable from "@/components/blog/QuickReferenceTable";
import AppTable from "@/components/blog/AppTable";
import BulletListBlock from "@/components/blog/BulletListBlock";
import CityTabBlock from "@/components/blog/CityTabBlock";
import NewsletterInline from "@/components/newsletter/NewsletterInline";
import FinalCTA from "@/components/blog/FinalCTA";
import NewsletterBanner from "@/components/newsletter/NewsletterBanner";
import AuthorBox from "@/components/blog/AuthorBox";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  canonicalUrl,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  descriptionFrom,
  faqJsonLd,
  keywordList,
  portableTextToText,
  readTimeLabel,
  SITE_NAME,
} from "@/lib/seo";

export const revalidate = 60;
export const dynamicParams = true;

const sectionComponentMap = {
  guideSection: GuideSectionBlock,
  calloutBox: CalloutBoxBlock,
  quickReferenceSection: QuickReferenceSectionBlock,
};

export async function generateStaticParams() {
  const [posts, guidePages] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(guidePageSlugsQuery),
  ]);
  return [
    ...posts.map((post) => ({ slug: post.slug.current })),
    ...guidePages.map((page) => ({ slug: page.slug })),
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const canonical = canonicalUrl(`/blog/${slug}`);

  const post = await client.fetch(postQuery, { slug });
  if (post) {
    const title = postSeoTitle(post);
    const description = postDescription(post);
    const images = post.mainImage
      ? [
          {
            url: urlFor(post.mainImage).width(1200).height(630).url(),
            width: 1200,
            height: 630,
            alt: post.mainImage.alt || title,
          },
        ]
      : [DEFAULT_OG_IMAGE];

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: post.publishedAt,
        url: canonical,
        images,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images,
      },
    };
  }


  const guide = await client.fetch(guidePageQuery, { slug });
  if (guide) {
    const title = guide.seoTitle?.trim() || guide.title?.trim() || SITE_NAME;
    const description = descriptionFrom(
      guideDescription(guide),
      DEFAULT_DESCRIPTION,
    );
    const keywords = keywordList(guide.seoKeywords);

    return {
      title,
      description,
      ...(keywords.length ? { keywords } : {}),
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: guide.publishedAt,
        url: canonical,
        images: [DEFAULT_OG_IMAGE],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [DEFAULT_OG_IMAGE],
      },
    };
  }

  return { robots: { index: false, follow: false } };
}

function postSeoTitle(post) {
  return post.seoTitle?.trim() || post.title?.trim() || SITE_NAME;
}

// SEO description → excerpt → first paragraphs of the body, so no post
// falls back to the generic site description.
function postDescription(post) {
  return descriptionFrom(
    post.seoDescription?.trim() || post.excerpt?.trim() || post.body,
    DEFAULT_DESCRIPTION,
  );
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function guideDescription(guide) {
  const seoDescription = guide.seoDescription?.trim();
  if (seoDescription && seoDescription.length <= 160) return seoDescription;
  return (
    guide.subtitle?.trim() ||
    seoDescription ||
    portableTextToText(guide.sections?.[0]?.body)
  );
}

const AnchorTag = ({ value, children }) => {
  const href = value?.href;
  if (!href) return <span>{children}</span>;

  const newTab = value?.blank === true || /^https?:\/\//i.test(href);
  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className="text-[var(--brand-green)] underline underline-offset-2 hover:opacity-80"
    >
      {children}
    </a>
  );
};

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full h-96 rounded-2xl overflow-hidden">
            <Image
              src={urlFor(value).width(1200).height(800).url()}
              alt={value.alt || value.caption || ""}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-400 mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    table: ({ value }) => {
      if (!value?.rows?.length) return null;
      return (
        <div className="overflow-x-auto my-8">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {value.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={
                    rowIndex === 0
                      ? "bg-[var(--brand-green)] text-white"
                      : rowIndex % 2 === 0
                        ? "bg-gray-50"
                        : "bg-white"
                  }
                >
                  {row.cells.map((cell, cellIndex) =>
                    rowIndex === 0 ? (
                      <th
                        key={cellIndex}
                        className="border border-gray-200 px-4 py-3 text-left font-medium"
                      >
                        {cell}
                      </th>
                    ) : (
                      <td
                        key={cellIndex}
                        className="border border-gray-200 px-4 py-3"
                      >
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    callout: ({ value }) => {
      const styles = {
        info: {
          bg: "bg-blue-50",
          border: "border-blue-400",
          text: "text-blue-800",
          emoji: "ℹ️",
        },
        warning: {
          bg: "bg-yellow-50",
          border: "border-yellow-400",
          text: "text-yellow-800",
          emoji: "⚠️",
        },
        success: {
          bg: "bg-green-50",
          border: "border-green-400",
          text: "text-green-800",
          emoji: "✅",
        },
        tip: {
          bg: "bg-purple-50",
          border: "border-purple-400",
          text: "text-purple-800",
          emoji: "💡",
        },
      };
      const style = styles[value.type] || styles.info;
      return (
        <div
          className={`${style.bg} ${style.border} border-l-4 rounded-r-xl px-5 py-4 my-6`}
        >
          <p className={`${style.text} text-sm leading-relaxed`}>
            <span className="mr-2">{style.emoji}</span>
            {value.text}
          </p>
        </div>
      );
    },
    codeBlock: ({ value }) => (
      <div className="my-6">
        {value.language && (
          <div className="bg-gray-800 text-gray-400 text-xs px-4 py-2 rounded-t-lg">
            {value.language}
          </div>
        )}
        <pre className="bg-gray-900 text-green-400 text-sm p-4 rounded-b-lg overflow-x-auto">
          <code>{value.code}</code>
        </pre>
      </div>
    ),
  },
  block: {
    normal: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-5 text-lg">{children}</p>
    ),
    // The page title is already the <h1>; an h1 inside the body renders as <h2>
    // so there is only ever one H1 per page.
    h1: ({ children }) => (
      <h2 className="text-3xl font-medium text-gray-900 mt-10 mb-4">
        {children}
      </h2>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-medium text-gray-900 mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium text-gray-900 mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-medium text-gray-900 mt-6 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--brand-green)] pl-5 py-1 my-6 text-gray-600 italic bg-[var(--brand-green-light)] rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-5 space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-5 space-y-2 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    "strike-through": ({ children }) => (
      <span className="line-through">{children}</span>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 text-[var(--brand-green)] px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: AnchorTag,
  },
};

export default async function Page({ params }) {
  const { slug } = await params;

  const post = await client.fetch(postQuery, { slug });
  if (post) {
    const related = post.categorySlugs?.length
      ? await client.fetch(relatedPostsQuery, {
          slug,
          categorySlugs: post.categorySlugs.filter(Boolean),
        })
      : [];
    return <BlogPost post={post} related={related || []} />;
  }

  const guide = await client.fetch(guidePageQuery, { slug });
  if (guide) {
    return <GuidePage guide={guide} />;
  }

  notFound();
}

function BlogPost({ post, related = [] }) {
  const canonical = canonicalUrl(`/blog/${post.slug.current}`);
  const title = post.title?.trim() || SITE_NAME;
  const seoTitle = postSeoTitle(post);
  const description = postDescription(post);
  const image = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : DEFAULT_OG_IMAGE.url;
  const readTime = readTimeLabel(post.wordCount);
  const authorPath = post.authorSlug ? `/author/${post.authorSlug}` : "/about";
  const categoryTitle = post.categories?.[0];
  const categorySlug = post.categorySlugs?.[0];
  const faq = (post.faq || []).filter((item) => item?.question && item?.answer);
  const sources = (post.sources || []).filter((item) => item?.url);

  // "Reviewed" wins when set; otherwise show "Updated" only when the post was
  // edited at least a day after publishing.
  const reviewedAt = post.lastReviewedAt;
  const showUpdated =
    !reviewedAt &&
    post._updatedAt &&
    post.publishedAt &&
    new Date(post._updatedAt) - new Date(post.publishedAt) > 24 * 60 * 60 * 1000;

  const breadcrumbs = [
    { name: "Home", url: canonicalUrl("/") },
    { name: "Blog", url: canonicalUrl("/blog") },
    ...(categoryTitle && categorySlug
      ? [
          {
            name: categoryTitle,
            url: canonicalUrl(`/blog/category/${categorySlug}`),
          },
        ]
      : []),
    { name: title, url: canonical },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: articleJsonLd({
            type: "BlogPosting",
            title: seoTitle,
            description,
            url: canonical,
            datePublished: post.publishedAt,
            dateModified: reviewedAt || post._updatedAt,
            image,
            author: post.author,
            authorUrl: canonicalUrl(authorPath),
            authorImage: post.authorImage
              ? urlFor(post.authorImage).width(320).height(320).url()
              : undefined,
            authorJobTitle: post.authorRole,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(breadcrumbs) }}
      />
      {faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJsonLd(faq) }}
        />
      )}
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-400">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link href="/" className="hover:text-[var(--brand-green)]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href="/blog" className="hover:text-[var(--brand-green)]">
                Blog
              </Link>
            </li>
            {categoryTitle && categorySlug && (
              <>
                <li aria-hidden="true">›</li>
                <li>
                  <Link
                    href={`/blog/category/${categorySlug}`}
                    className="hover:text-[var(--brand-green)]"
                  >
                    {categoryTitle}
                  </Link>
                </li>
              </>
            )}
          </ol>
        </nav>
        <div className="mb-10">
          {categoryTitle &&
            (categorySlug ? (
              <Link
                href={`/blog/category/${categorySlug}`}
                className="inline-block text-xs font-medium text-[var(--brand-green)] bg-[var(--brand-green-light)] px-3 py-1 rounded-full mb-4 hover:opacity-80"
              >
                {categoryTitle}
              </Link>
            ) : (
              <span className="inline-block text-xs font-medium text-[var(--brand-green)] bg-[var(--brand-green-light)] px-3 py-1 rounded-full mb-4">
                {categoryTitle}
              </span>
            ))}
          <h1 className="text-4xl font-medium text-gray-900 leading-tight mb-5">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
            {post.author && (
              <span>
                By{" "}
                <Link
                  href={authorPath}
                  rel="author"
                  className="hover:text-[var(--brand-green)]"
                >
                  {post.author}
                </Link>
                {post.authorRole && <>, {post.authorRole}</>}
              </span>
            )}
            {post.publishedAt && (
              <>
                <span>·</span>
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </>
            )}
            {reviewedAt && (
              <>
                <span>·</span>
                <time dateTime={reviewedAt}>
                  Reviewed {formatDate(reviewedAt)}
                </time>
              </>
            )}
            {showUpdated && (
              <>
                <span>·</span>
                <time dateTime={post._updatedAt}>
                  Updated {formatDate(post._updatedAt)}
                </time>
              </>
            )}
            {readTime && (
              <>
                <span>·</span>
                <span>{readTime}</span>
              </>
            )}
          </div>
        </div>
        <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-12 bg-[var(--brand-green-light)]">
          {post.mainImage ? (
            <Image
              src={urlFor(post.mainImage).width(1200).height(600).url()}
              alt={post.mainImage.alt || post.title}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <span className="text-6xl">📖</span>
            </div>
          )}
        </div>
        <article>
          {post.body ? (
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          ) : (
            <p className="text-gray-400">No content yet.</p>
          )}
        </article>

        {faq.length > 0 && (
          <section aria-labelledby="faq" className="mt-14">
            <h2 id="faq" className="text-2xl font-medium text-gray-900 mb-6">
              Frequently asked questions
            </h2>
            <div className="divide-y divide-gray-100 border-y border-gray-100">
              {faq.map((item) => (
                <details key={item._key || item.question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-medium text-gray-900">
                    {item.question}
                    <span className="mt-1 text-[var(--brand-green)] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-gray-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {sources.length > 0 && (
          <section aria-labelledby="sources" className="mt-12">
            <h2 id="sources" className="text-lg font-medium text-gray-900 mb-3">
              Official sources
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
              {sources.map((source) => (
                <li key={source._key || source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--brand-green)] underline underline-offset-2 hover:opacity-80"
                  >
                    {source.title || source.url}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {post.author && (
          <AuthorBox
            name={post.author}
            role={post.authorRole}
            image={post.authorImage}
            credentials={post.authorCredentials}
            bioText={post.authorBioText}
            href={authorPath}
          />
        )}
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-14">
        {related.length > 0 && (
          <section aria-labelledby="related" className="mb-12">
            <h2 id="related" className="text-2xl font-medium text-gray-900 mb-6">
              Related guides
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item._id}
                  href={`/blog/${item.slug.current}`}
                  className="group rounded-2xl border border-gray-100 p-5 transition-all hover:border-[var(--brand-green)] hover:shadow-sm"
                >
                  {item.categories?.[0] && (
                    <span className="text-xs font-medium text-[var(--brand-green)]">
                      {item.categories[0]}
                    </span>
                  )}
                  <h3 className="mt-1 text-base font-medium leading-snug text-gray-800 group-hover:text-[var(--brand-green)]">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                      {item.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
        <div className="border-t border-gray-100 pt-8">
          <p className="mb-6 rounded-xl bg-gray-50 px-5 py-4 text-sm leading-relaxed text-gray-500">
            This article is general information for international students, not
            migration, legal, tax or financial advice. Rules change, so check
            the official source before you act.{" "}
            <Link
              href="/about#disclaimer"
              className="text-[var(--brand-green)] underline underline-offset-2"
            >
              How we write and check our guides
            </Link>
            .
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm border border-[var(--brand-green)] text-[var(--brand-green)] px-5 py-2.5 rounded-lg hover:bg-[var(--brand-green)] hover:text-white transition-colors"
          >
            ← Browse more guides
          </Link>
        </div>
      </div>
    </>
  );
}

function GuidePage({ guide }) {
  const canonical = canonicalUrl(`/blog/${guide.slug}`);
  const title = guide.seoTitle?.trim() || guide.title?.trim() || SITE_NAME;
  const description = descriptionFrom(
    guideDescription(guide),
    DEFAULT_DESCRIPTION,
  );
  const tocSections = (guide.sections || [])
    .filter((section) => section.anchorId || section._type === "quickReferenceSection")
    .map((section) => ({
      id: section.anchorId || "quick-reference",
      title: section.title?.trim() || "Quick Reference Links",
    }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: articleJsonLd({
            title,
            description,
            url: canonical,
            datePublished: guide.publishedAt,
            dateModified: guide._updatedAt,
            image: DEFAULT_OG_IMAGE.url,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: canonicalUrl("/") },
            { name: "Blog", url: canonicalUrl("/blog") },
            { name: title, url: canonical },
          ]),
        }}
      />
      <HeroBanner
        title={guide.title}
        subtitle={guide.subtitle}
        category={guide.category}
        readTime={guide.readTime}
      />
      <div className="mx-auto max-w-6xl px-4 md:flex md:gap-8 md:px-6">
        <TableOfContents sections={tocSections} />
        <article className="min-w-0 flex-1 md:max-w-3xl">
          {guide.sections?.map((section, idx) => {
            const Component = sectionComponentMap[section._type];
            if (!Component) return null;
            return (
              <Component
                key={section._key || idx}
                {...section}
                isEven={idx % 2 !== 0}
              />
            );
          })}
        </article>
      </div>
      <FinalCTA />
    </>
  );
}

function GuideSectionBlock(props) {
  const {
    sectionNumber,
    emoji,
    title,
    anchorId,
    body,
    components,
    relatedPostTitle,
    relatedPostSlug,
    isEven,
  } = props;
  const sectionComponents = components || [];

  const sectionComponentMap = {
    infoCard: InfoCardBlock,
    twoColumnTable: TwoColumnTableBlock,
    threeColumnTable: ThreeColumnTableBlock,
    bulletList: BulletListBlock,
    cityTabBlock: CityTabBlockBlock,
  };

  return (
    <section
      id={anchorId || ""}
      className={`${isEven ? "bg-[#F5F7FA]" : "bg-white"} rounded-2xl px-4 py-12 md:px-8 md:py-16`}
    >
      <SectionHeader number={sectionNumber} emoji={emoji} title={title} />
      <div className="pl-0 md:pl-18">
        {body && (
          <div className="mb-6">
            <PortableText
              value={body}
              components={guidePortableTextComponents}
            />
          </div>
        )}
        {sectionComponents.map((comp, i) => {
          const Comp = sectionComponentMap[comp._type];
          if (!Comp) return null;
          return <Comp key={comp._key || i} {...comp} />;
        })}
        {relatedPostSlug && relatedPostTitle && (
          <InternalLinkCallout
            href={`/blog/${relatedPostSlug}`}
            title={relatedPostTitle}
          />
        )}
      </div>
    </section>
  );
}

function CalloutBoxBlock(props) {
  const { label, content, style } = props;
  return (
    <section className="bg-white px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border-l-4 border-[var(--brand-green)] bg-white p-5 shadow-md">
          {label && (
            <span className="mb-2 inline-block rounded bg-[var(--brand-green-light)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[var(--brand-green)]">
              {label}
            </span>
          )}
          {content && (
            <div className="text-sm leading-relaxed text-gray-800">
              <PortableText
                value={content}
                components={guidePortableTextComponents}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function QuickReferenceSectionBlock(props) {
  const { title, ctaText, rows } = props;
  const tableRows = rows?.map((r) => [r.resource, r.link]) || [];

  return (
    <section
      id="quick-reference"
      className="bg-white rounded-2xl px-4 py-12 md:px-8 md:py-16"
    >
      <SectionHeader
        number="10"
        emoji="🔖"
        title={title || "Quick Reference Links"}
      />
      <div className="pl-0 md:pl-18">
        {ctaText && (
          <div className="mb-8 flex items-center gap-3 rounded-xl bg-[var(--brand-green-light)] px-5 py-4">
            <svg
              className="h-5 w-5 shrink-0 text-[var(--brand-green)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <p className="text-sm font-medium text-[var(--brand-green)]">{ctaText}</p>
          </div>
        )}
        <QuickReferenceTable rows={tableRows} />
      </div>
    </section>
  );
}

function InfoCardBlock(props) {
  const { content, linkLabel, linkUrl } = props;
  return (
    <div className="my-6">
      <InfoCard>
        <p className="text-sm">{content}</p>
        {linkLabel && linkUrl && (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-medium text-[var(--brand-green)] underline underline-offset-2"
          >
            {linkLabel} →
          </a>
        )}
      </InfoCard>
    </div>
  );
}

function TwoColumnTableBlock(props) {
  const { headers, rows } = props;
  const tableRows = rows?.map((r) => [r.col1, r.col2]) || [];
  return (
    <div className="my-6">
      <QuickReferenceTable rows={tableRows} />
    </div>
  );
}

function ThreeColumnTableBlock(props) {
  const { headers, rows } = props;
  const apps =
    rows?.map((r) => ({ name: r.col1, description: r.col2, cost: r.col3 })) ||
    [];
  return (
    <div className="my-6">
      <AppTable apps={apps} />
    </div>
  );
}

function CityTabBlockBlock(props) {
  const { tabs } = props;
  const tabData =
    tabs?.map((t) => ({ label: t.cityName, activities: t.items })) || [];
  return (
    <div className="my-6">
      <CityTabBlock tabs={tabData} />
    </div>
  );
}
