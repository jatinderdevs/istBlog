import { client } from "../../../../sanity/lib/client";
import { postQuery, postsQuery } from "../../../../sanity/lib/queries";
import { guidePageQuery, guidePageSlugsQuery } from "../../../../sanity/queries/guidePageQuery";
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
import FinalCTA from "@/components/blog/FinalCTA";

export const revalidate = 60;

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

  const post = await client.fetch(postQuery, { slug });
  if (post) {
    return {
      title: post.title,
      description: post.excerpt || "Read this guide on International Student Tips.",
      alternates: {
        canonical: `https://www.internationalstudenttips.com.au/blog/${post.slug.current}`,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt || "",
        type: "article",
        publishedTime: post.publishedAt,
        url: `https://www.internationalstudenttips.com.au/blog/${post.slug.current}`,
        images: post.mainImage
          ? [{ url: urlFor(post.mainImage).width(1200).height(630).url() }]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt || "",
      },
    };
  }

  const guide = await client.fetch(guidePageQuery, { slug });
  if (guide) {
    return {
      title: guide.seoTitle || guide.title,
      description: guide.seoDescription || "",
      keywords: guide.seoKeywords || "",
      alternates: {
        canonical: `https://www.internationalstudenttips.com.au/blog/${guide.slug}`,
      },
      openGraph: {
        title: guide.seoTitle || guide.title,
        description: guide.seoDescription || "",
        type: "article",
        publishedTime: guide.publishedAt,
        url: `https://www.internationalstudenttips.com.au/blog/${guide.slug}`,
      },
    };
  }

  return {};
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const AnchorTag = ({ value, children }) => {
  const href = value && value.href ? value.href : "#";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
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
              alt={value.alt || "Blog image"}
              fill
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
        info: { bg: "bg-blue-50", border: "border-blue-400", text: "text-blue-800", emoji: "ℹ️" },
        warning: { bg: "bg-yellow-50", border: "border-yellow-400", text: "text-yellow-800", emoji: "⚠️" },
        success: { bg: "bg-green-50", border: "border-green-400", text: "text-green-800", emoji: "✅" },
        tip: { bg: "bg-purple-50", border: "border-purple-400", text: "text-purple-800", emoji: "💡" },
      };
      const style = styles[value.type] || styles.info;
      return (
        <div className={`${style.bg} ${style.border} border-l-4 rounded-r-xl px-5 py-4 my-6`}>
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
    h1: ({ children }) => (
      <h1 className="text-3xl font-medium text-gray-900 mt-10 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-medium text-gray-900 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium text-gray-900 mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-medium text-gray-900 mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--brand-green)] pl-5 py-1 my-6 text-gray-600 italic bg-[var(--brand-green-light)] rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-5 space-y-2 text-gray-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-5 space-y-2 text-gray-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-lg leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="text-lg leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    "strike-through": ({ children }) => <span className="line-through">{children}</span>,
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
    return <BlogPost post={post} />;
  }

  const guide = await client.fetch(guidePageQuery, { slug });
  if (guide) {
    return <GuidePage guide={guide} />;
  }

  notFound();
}

function BlogPost({ post }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[var(--brand-green)] transition-colors mb-10"
      >
        ← Back to all posts
      </Link>
      <div className="mb-10">
        {post.categories?.[0] && (
          <span className="inline-block text-xs font-medium text-[var(--brand-green)] bg-[var(--brand-green-light)] px-3 py-1 rounded-full mb-4">
            {post.categories[0]}
          </span>
        )}
        <h1 className="text-4xl font-medium text-gray-900 leading-tight mb-5">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          {post.author && <span>By {post.author}</span>}
          {post.publishedAt && (
            <>
              <span>·</span>
              <span>{formatDate(post.publishedAt)}</span>
            </>
          )}
          <span>·</span>
          <span>5 min read</span>
        </div>
      </div>
      <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-12 bg-[var(--brand-green-light)]">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(1200).height(600).url()}
            alt={post.title}
            fill
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
          <PortableText value={post.body} components={portableTextComponents} />
        ) : (
          <p className="text-gray-400">No content yet.</p>
        )}
      </article>
      <div className="border-t border-gray-100 mt-16 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm border border-[var(--brand-green)] text-[var(--brand-green)] px-5 py-2.5 rounded-lg hover:bg-[var(--brand-green)] hover:text-white transition-colors"
        >
          ← Browse more guides
        </Link>
      </div>
    </div>
  );
}

function GuidePage({ guide }) {
  return (
    <>
      <HeroBanner
        title={guide.title}
        subtitle={guide.subtitle}
        category={guide.category}
        readTime={guide.readTime}
        downloadLabel={guide.showDownloadPDF !== false ? "Download PDF" : null}
      />
      <div className="mx-auto max-w-6xl px-4 md:flex md:gap-8 md:px-6">
        <TableOfContents />
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
  const { sectionNumber, emoji, title, anchorId, body, components, relatedPostTitle, relatedPostSlug, isEven } = props;
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
            <PortableText value={body} components={guidePortableTextComponents} />
          </div>
        )}
        {sectionComponents.map((comp, i) => {
          const Comp = sectionComponentMap[comp._type];
          if (!Comp) return null;
          return <Comp key={comp._key || i} {...comp} />;
        })}
        {relatedPostSlug && relatedPostTitle && (
          <InternalLinkCallout href={`/blog/${relatedPostSlug}`} title={relatedPostTitle} />
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
        <div className="rounded-xl border-l-4 border-[#1F5C99] bg-white p-5 shadow-md">
          {label && (
            <span className="mb-2 inline-block rounded bg-[#1F5C99]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#1F5C99]">
              {label}
            </span>
          )}
          {content && (
            <div className="text-sm leading-relaxed text-gray-800">
              <PortableText value={content} components={guidePortableTextComponents} />
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
      <SectionHeader number="10" emoji="🔖" title={title || "Quick Reference Links"} />
      <div className="pl-0 md:pl-18">
        {ctaText && (
          <div className="mb-8 flex items-center gap-3 rounded-xl bg-[#D6E4F0] px-5 py-4">
            <svg className="h-5 w-5 shrink-0 text-[#1F5C99]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <p className="text-sm font-medium text-[#1F5C99]">{ctaText}</p>
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
            className="mt-2 inline-block text-sm font-medium text-[#1F5C99] underline underline-offset-2"
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
  const apps = rows?.map((r) => ({ name: r.col1, description: r.col2, cost: r.col3 })) || [];
  return (
    <div className="my-6">
      <AppTable apps={apps} />
    </div>
  );
}

function CityTabBlockBlock(props) {
  const { tabs } = props;
  const tabData = tabs?.map((t) => ({ label: t.cityName, activities: t.items })) || [];
  return (
    <div className="my-6">
      <CityTabBlock tabs={tabData} />
    </div>
  );
}
