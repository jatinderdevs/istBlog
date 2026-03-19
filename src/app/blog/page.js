import Link from "next/link";
import Image from "next/image";
import { client } from "../../../sanity/lib/client";
import { postsQuery } from "../../../sanity/lib/queries";
import { urlFor } from "../../../sanity/lib/image";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const metadata = {
  title: "Blog — IST Blogs Australia",
  description: "All guides and tips for international students in Australia.",
};

export default async function BlogPage() {
  const posts = await client.fetch(postsQuery);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-xs font-medium text-[var(--brand-green)] uppercase tracking-widest">
          All Posts
        </span>
        <h1 className="text-4xl font-medium text-gray-900 mt-2 mb-4">
          Guides & Tips
        </h1>
        <p className="text-gray-500 max-w-xl">
          Everything you need to know about living and studying in Australia as
          an international student.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">
            No posts yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group border border-gray-100 rounded-2xl overflow-hidden hover:border-[var(--brand-green)] transition-all hover:shadow-sm"
            >
              <div className="relative h-48 w-full bg-[var(--brand-green-light)]">
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
                <div className="flex items-center gap-2 mb-2">
                  {post.categories?.[0] && (
                    <span className="text-xs font-medium text-[var(--brand-green)] bg-[var(--brand-green-light)] px-2 py-0.5 rounded-full">
                      {post.categories[0]}
                    </span>
                  )}
                </div>
                <h2 className="text-base font-medium text-gray-800 leading-snug mb-3 group-hover:text-[var(--brand-green)] transition-colors">
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
  );
}
