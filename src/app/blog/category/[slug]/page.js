import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "../../../../../sanity/lib/client";
import {
  categoriesQuery,
  postsByCategoryQuery,
  categoryBySlugQuery,
} from "../../../../../sanity/lib/queries";
import { urlFor } from "../../../../../sanity/lib/image";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Generate static params for all categories at build time
export async function generateStaticParams() {
  const categories = await client.fetch(categoriesQuery);
  return categories.map((cat) => ({ slug: cat.slug }));
}

// Generate metadata per category page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await client.fetch(categoryBySlugQuery, { slug });

  if (!category) return {};

  return {
    title: `${category.title} Guides`,
    description:
      category.description ||
      `Browse all ${category.title} guides for international students in Australia.`,
    openGraph: {
      title: `${category.title} — IST Blogs`,
      description:
        category.description ||
        `Browse all ${category.title} guides for international students in Australia.`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const [category, posts, allCategories] = await Promise.all([
    client.fetch(categoryBySlugQuery, { slug }),
    client.fetch(postsByCategoryQuery, { slug }),
    client.fetch(categoriesQuery),
  ]);

  if (!category) notFound();

  return (
    <div>
      {/* Category Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[var(--brand-green)] transition-colors mb-6"
          >
            ← All guides
          </Link>
          <span className="inline-block bg-[var(--brand-green-light)] text-[var(--brand-green)] text-xs font-medium px-3 py-1 rounded-full mb-4">
            Category
          </span>
          <h1 className="text-4xl font-medium text-gray-900 mb-3">
            {category.title}
          </h1>
          {category.description && (
            <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          )}
          <p className="text-sm text-gray-400 mt-4">
            {posts.length} {posts.length === 1 ? "guide" : "guides"}
          </p>
        </div>
      </section>

      {/* Category Pills */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex gap-2 flex-wrap">
            <Link
              href="/blog"
              className="text-sm px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)] transition-colors"
            >
              All
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat._id}
                href={`/blog/category/${cat.slug}`}
                className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                  cat.slug === slug
                    ? "border-[var(--brand-green)] text-[var(--brand-green)] bg-[var(--brand-green-light)]"
                    : "border-gray-200 text-gray-500 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
                }`}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">
              No guides in this category yet.
            </p>
            <Link
              href="/blog"
              className="inline-block bg-[var(--brand-green)] text-white text-sm px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
            >
              Browse all guides
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group border border-gray-100 rounded-2xl overflow-hidden hover:border-[var(--brand-green)] transition-colors"
              >
                <div className="relative bg-[var(--brand-green-light)] h-44 overflow-hidden">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).height(400).url()}
                      alt={post.title}
                      fill
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
                  <h2 className="text-base font-medium text-gray-800 leading-snug mt-1 mb-3 group-hover:text-[var(--brand-green)] transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">
                    {post.publishedAt && formatDate(post.publishedAt)} · 5 min
                    read
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
