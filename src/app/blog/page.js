import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import {
  postsQuery,
  categoriesQuery,
  guidesListQuery,
} from "../../../sanity/lib/queries";
import BlogPostGrid from "@/components/blog/BlogPostGrid";
import GuideCard from "@/components/blog/GuideCard";
import {
  breadcrumbJsonLd,
  canonicalUrl,
  DEFAULT_OG_IMAGE,
  jsonLd,
} from "@/lib/seo";

export const revalidate = 60;

const description =
  "Guides and tips for international students in Australia, covering visas, work rights, housing, banking and student life.";

export const metadata = {
  title: "Student Guides & Tips",
  description,
  alternates: {
    canonical: canonicalUrl("/blog"),
  },
  openGraph: {
    title: "Student Guides & Tips",
    description,
    url: canonicalUrl("/blog"),
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Guides & Tips",
    description,
    images: [DEFAULT_OG_IMAGE],
  },
};

// Note: category filtering now lives on /blog/category/[slug]. Old
// /blog?category=... links are redirected there in next.config.mjs, so this
// page no longer reads searchParams and can be statically rendered.
export default async function BlogPage() {
  const [posts, categories, guides] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(categoriesQuery),
    client.fetch(guidesListQuery),
  ]);

  const listItems = [
    ...guides.map((guide) => canonicalUrl(`/blog/${guide.slug}`)),
    ...posts.map((post) => canonicalUrl(`/blog/${post.slug.current}`)),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: canonicalUrl("/") },
            { name: "Blog", url: canonicalUrl("/blog") },
          ]),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Student Guides & Tips",
            description,
            url: canonicalUrl("/blog"),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: listItems.slice(0, 50).map((url, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url,
              })),
            },
          }),
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-medium text-[var(--brand-green)] uppercase tracking-widest">
            All Posts
          </span>
          <h1 className="text-4xl font-medium text-gray-900 mt-2 mb-4">
            Guides &amp; Tips
          </h1>
          <p className="text-gray-500 max-w-xl">
            Everything you need to know about living and studying in Australia
            as an international student.
          </p>
        </div>

        {/* Category pills (link to clean category pages) */}
        <div className="flex gap-2 flex-wrap mb-12">
          <Link
            href="/blog"
            className="text-sm px-4 py-1.5 rounded-full border border-[var(--brand-green)] text-[var(--brand-green)] bg-[var(--brand-green-light)]"
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/blog/category/${cat.slug}`}
              className="text-sm px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)] transition-colors"
            >
              {cat.title}
            </Link>
          ))}
        </div>

        {/* Complete guides */}
        {guides.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-medium text-gray-900 mb-2">
              Complete guides
            </h2>
            <p className="text-gray-500 mb-6 max-w-2xl">
              In-depth, step-by-step guides you can work through from start to
              finish.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <GuideCard key={guide._id} guide={guide} />
              ))}
            </div>
          </section>
        )}

        {/* Posts */}
        <section>
          <h2 className="text-2xl font-medium text-gray-900 mb-6">
            Latest articles
          </h2>
          <BlogPostGrid posts={posts} />
        </section>
      </div>
    </>
  );
}
