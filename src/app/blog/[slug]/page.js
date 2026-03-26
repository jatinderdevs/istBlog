import { client } from "../../../../sanity/lib/client";
import { postQuery, postsQuery } from "../../../../sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { urlFor } from "../../../../sanity/lib/image";
export const revalidate = 3600;
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
    h1: ({ children }) => (
      <h1 className="text-3xl font-medium text-gray-900 mt-10 mb-4">
        {children}
      </h1>
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

export async function generateStaticParams() {
  const posts = await client.fetch(postsQuery);
  return posts.map((post) => ({ slug: post.slug.current }));
}
function generateStructuredData(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    author: {
      "@type": "Person",
      name: post.author || "International Student Tips",
    },
    publisher: {
      "@type": "Organization",
      name: "International Student Tips",
      url: "https://www.internationalstudenttips.com.au",
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.internationalstudenttips.com.au/blog/${post.slug.current}`,
    },
  };
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await client.fetch(postQuery, { slug: resolvedParams.slug });
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || "",
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

export default async function PostPage({ params }) {
  const resolvedParams = await params;
  const post = await client.fetch(postQuery, { slug: resolvedParams.slug });

  if (!post) notFound();

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
        <h1 className="text-4xl font-medium text-gray-900 leading-tight mb-5">
          {post.title}
        </h1>
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
