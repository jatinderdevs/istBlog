import Link from "next/link";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import {
  postsQuery,
  categoriesQuery,
  featuredPostQuery,
  settingsQuery,
} from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";
export const revalidate = 60;

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function Home() {
  const [posts, categories, featuredPost, settings] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(categoriesQuery),
    client.fetch(featuredPostQuery),
    client.fetch(settingsQuery),
  ]);

  const heroPost = featuredPost || posts[0];
  const sidePosts = posts.filter((p) => p._id !== heroPost?._id).slice(0, 3);
  const recentPosts = posts.filter((p) => p._id !== heroPost?._id).slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <span className="inline-block bg-[var(--brand-green-light)] text-[var(--brand-green)] text-xs font-medium px-3 py-1 rounded-full mb-5">
              For International Students in Australia
            </span>
            <h1 className="text-4xl md:text-5xl font-medium text-gray-900 leading-tight mb-5">
              {settings?.heroHeading ||
                "Your guide to life & study in Australia"}
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              {settings?.heroSubtext ||
                "Practical guides on visa rules, work rights, housing, banking and everything you need to thrive as an international student."}
            </p>
            <Link
              href="/blog"
              className="inline-block bg-[var(--brand-green)] text-white text-sm px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
            >
              {settings?.heroButtonText || "Browse all guides"}
            </Link>
          </div>
        </div>
      </section>

      {/* Topics Pills */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex gap-2 flex-wrap">
            <Link
              href="/blog"
              className="text-sm px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)] transition-colors"
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/blog?category=${cat.slug}`}
                className="text-sm px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)] transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Featured Post */}
        {heroPost && (
          <section className="mb-16">
            <p className="text-xs font-medium text-[var(--brand-green)] uppercase tracking-widest mb-4">
              Featured
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <Link href={`/blog/${heroPost.slug.current}`} className="group">
                <div className="relative bg-[var(--brand-green-light)] rounded-2xl h-64 overflow-hidden mb-5">
                  {heroPost.mainImage ? (
                    <Image
                      src={urlFor(heroPost.mainImage)
                        .width(800)
                        .height(500)
                        .url()}
                      alt={heroPost.title}
                      fill
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
                <h2 className="text-2xl font-medium text-gray-900 leading-snug mb-3 group-hover:text-[var(--brand-green)] transition-colors">
                  {heroPost.title}
                </h2>
                {heroPost.excerpt && (
                  <p className="text-gray-500 leading-relaxed text-sm mb-3">
                    {heroPost.excerpt}
                  </p>
                )}
                <p className="text-xs text-gray-400">
                  {heroPost.publishedAt && formatDate(heroPost.publishedAt)} · 5
                  min read
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
                      <p className="text-xs text-gray-400 mt-1">5 min read</p>
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
                  <h3 className="text-base font-medium text-gray-800 leading-snug mt-1 mb-3 group-hover:text-[var(--brand-green)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {post.publishedAt && formatDate(post.publishedAt)} · 5 min
                    read
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
