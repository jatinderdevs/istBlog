import Link from "next/link";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { postsQuery } from "../../sanity/lib/queries";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readTime(post) {
  return "5 min read";
}

const categories = [
  { label: "All", value: "" },
  { label: "Visa & Immigration", value: "visa" },
  { label: "Work Rights", value: "work" },
  { label: "Housing", value: "housing" },
  { label: "Banking", value: "banking" },
  { label: "Tax & Money", value: "tax" },
  { label: "University Life", value: "university" },
  { label: "PR Pathways", value: "pr" },
];

export default async function Home() {
  const posts = await client.fetch(postsQuery);
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4);
  const sidePosts = posts.slice(1, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <span className="inline-block bg-[var(--brand-green-light)] text-[var(--brand-green)] text-xs font-medium px-3 py-1 rounded-full mb-5">
              For International Students in Australia
            </span>
            <h1 className="text-5xl font-medium text-gray-900 leading-tight mb-5">
              Your guide to life & study in Australia
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Practical guides on visa rules, work rights, housing, banking and
              everything you need to thrive as an international student.
            </p>
            <Link
              href="/blog"
              className="inline-block bg-[var(--brand-green)] text-white text-sm px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
            >
              Browse all guides
            </Link>
          </div>
        </div>
      </section>

      {/* Topics Pills */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href={cat.value ? `/blog?category=${cat.value}` : "/blog"}
                className="text-sm px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)] transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <p className="text-xs font-medium text-[var(--brand-green)] uppercase tracking-widest mb-4">
              Featured
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <Link
                href={`/blog/${featuredPost.slug.current}`}
                className="group"
              >
                <div className="bg-[var(--brand-green-light)] rounded-2xl h-64 flex items-center justify-center mb-5">
                  <span className="text-5xl">📖</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  {featuredPost.categories?.[0] && (
                    <span className="text-xs font-medium text-[var(--brand-green)] bg-[var(--brand-green-light)] px-2 py-0.5 rounded-full">
                      {featuredPost.categories[0]}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-medium text-gray-900 leading-snug mb-3 group-hover:text-[var(--brand-green)] transition-colors">
                  {featuredPost.title}
                </h2>
                {featuredPost.excerpt && (
                  <p className="text-gray-500 leading-relaxed text-sm mb-3">
                    {featuredPost.excerpt}
                  </p>
                )}
                <p className="text-xs text-gray-400">
                  {featuredPost.publishedAt &&
                    formatDate(featuredPost.publishedAt)}{" "}
                  · {readTime(featuredPost)}
                </p>
              </Link>

              {/* Side Posts */}
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
                      <p className="text-xs text-gray-400 mt-1">
                        {readTime(post)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent Posts Grid */}
        <section>
          <p className="text-xs font-medium text-[var(--brand-green)] uppercase tracking-widest mb-4">
            Latest Posts
          </p>
          <h2 className="text-2xl font-medium text-gray-900 mb-8">
            Fresh from the blog
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group border border-gray-100 rounded-2xl overflow-hidden hover:border-[var(--brand-green)] transition-colors"
              >
                <div className="bg-[var(--brand-green-light)] h-44 flex items-center justify-center">
                  <span className="text-4xl">📝</span>
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
                    {post.publishedAt && formatDate(post.publishedAt)} ·{" "}
                    {readTime(post)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {posts.length > 4 && (
            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-block border border-[var(--brand-green)] text-[var(--brand-green)] text-sm px-6 py-3 rounded-lg hover:bg-[var(--brand-green)] hover:text-white transition-colors"
              >
                View all posts
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
