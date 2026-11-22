import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "../../../../sanity/lib/client";
import { authorBySlugQuery, authorsQuery } from "../../../../sanity/lib/queries";
import { urlFor } from "../../../../sanity/lib/image";
import {
  breadcrumbJsonLd,
  canonicalUrl,
  DEFAULT_OG_IMAGE,
  descriptionFrom,
  personJsonLd,
  portableTextToText,
  readTimeLabel,
  SITE_NAME,
} from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const authors = await client.fetch(authorsQuery);
  return authors.map((author) => ({ slug: author.slug }));
}

function authorDescription(author) {
  return descriptionFrom(
    author.credentials?.trim() || portableTextToText(author.bio),
    `${author.name} writes practical guides for international students in Australia at ${SITE_NAME}.`,
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = await client.fetch(authorBySlugQuery, { slug });
  if (!author) return { robots: { index: false, follow: false } };

  const url = canonicalUrl(`/author/${slug}`);
  const title = author.role ? `${author.name}, ${author.role}` : author.name;
  const description = authorDescription(author);
  const images = author.image
    ? [{ url: urlFor(author.image).width(600).height(600).url(), width: 600, height: 600, alt: author.name }]
    : [DEFAULT_OG_IMAGE];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "profile", images },
    twitter: { card: "summary", title, description, images },
  };
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = await client.fetch(authorBySlugQuery, { slug });
  if (!author) notFound();

  const url = canonicalUrl(`/author/${slug}`);
  const imageUrl = author.image
    ? urlFor(author.image).width(320).height(320).url()
    : null;
  const posts = author.posts || [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: personJsonLd({
            name: author.name,
            url,
            jobTitle: author.role,
            description: authorDescription(author),
            image: imageUrl,
            sameAs: author.sameAs,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: canonicalUrl("/") },
            { name: "About", url: canonicalUrl("/about") },
            { name: author.name, url },
          ]),
        }}
      />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-400">
          <Link href="/" className="hover:text-[var(--brand-green)]">Home</Link>
          <span aria-hidden="true"> › </span>
          <Link href="/about" className="hover:text-[var(--brand-green)]">About</Link>
        </nav>

        <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
          {imageUrl && (
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-[var(--brand-green-light)]">
              <Image
                src={imageUrl}
                alt={author.name}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-medium text-gray-900">{author.name}</h1>
            {author.role && (
              <p className="mt-1 text-[var(--brand-green)]">{author.role}</p>
            )}
            {author.credentials && (
              <p className="mt-3 text-gray-600 leading-relaxed">{author.credentials}</p>
            )}
          </div>
        </header>

        {author.bio?.length > 0 && (
          <div className="mt-10 space-y-4 text-lg leading-relaxed text-gray-700">
            <PortableText value={author.bio} />
          </div>
        )}

        {author.sameAs?.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-4 text-sm">
            {author.sameAs.map((link) => (
              <li key={link}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="text-[var(--brand-green)] underline underline-offset-2"
                >
                  {new URL(link).hostname.replace(/^www\./, "")}
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-8 text-sm text-gray-500">
          Every guide is checked against official sources before it is published.{" "}
          <Link href="/about#disclaimer" className="text-[var(--brand-green)] underline underline-offset-2">
            How we write and check our guides
          </Link>
          .
        </p>

        {posts.length > 0 && (
          <section aria-labelledby="author-posts" className="mt-14">
            <h2 id="author-posts" className="text-2xl font-medium text-gray-900 mb-6">
              Guides by {author.name}
            </h2>
            <ul className="divide-y divide-gray-100 border-y border-gray-100">
              {posts.map((post) => (
                <li key={post._id} className="py-4">
                  <Link href={`/blog/${post.slug.current}`} className="group block">
                    <span className="text-base font-medium text-gray-800 group-hover:text-[var(--brand-green)]">
                      {post.title}
                    </span>
                    <span className="mt-1 block text-xs text-gray-400">
                      {[
                        post.categories?.[0],
                        post.publishedAt && formatDate(post.publishedAt),
                        readTimeLabel(post.wordCount),
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
