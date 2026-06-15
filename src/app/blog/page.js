import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import { postsQuery, categoriesQuery } from "../../../sanity/lib/queries";
import BlogPostGrid from "@/components/blog/BlogPostGrid";
export const revalidate = 60;

export const metadata = {
  title: "Blog — IST Blogs Australia",
  description: "All guides and tips for international students in Australia.",
  alternates: {
    canonical: "https://www.internationalstudenttips.com.au/blog",
  },
};

export default async function BlogPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const selectedCategory = resolvedParams?.category || "";

  const [allPosts, categories] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(categoriesQuery),
  ]);

  const posts = selectedCategory
    ? allPosts.filter((post) => post.categorySlugs?.includes(selectedCategory))
    : allPosts;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-medium text-[var(--brand-green)] uppercase tracking-widest">
          {selectedCategory ? "Filtered Posts" : "All Posts"}
        </span>
        <h1 className="text-4xl font-medium text-gray-900 mt-2 mb-4">
          {selectedCategory
            ? categories.find((c) => c.slug === selectedCategory)?.title ||
              "Posts"
            : "Guides & Tips"}
        </h1>
        <p className="text-gray-500 max-w-xl">
          Everything you need to know about living and studying in Australia as
          an international student.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 flex-wrap mb-10">
        <Link
          href="/blog"
          className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
            !selectedCategory
              ? "border-[var(--brand-green)] text-[var(--brand-green)] bg-[var(--brand-green-light)]"
              : "border-gray-200 text-gray-500 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/blog/category/${cat.slug}`}
            className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
              selectedCategory === cat.slug
                ? "border-[var(--brand-green)] text-[var(--brand-green)] bg-[var(--brand-green-light)]"
                : "border-gray-200 text-gray-500 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
            }`}
          >
            {cat.title}
          </Link>
        ))}
      </div>

      <BlogPostGrid posts={posts} />
    </div>
  );
}
