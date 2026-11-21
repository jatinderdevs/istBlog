"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../../sanity/lib/image";
import { readTimeLabel } from "@/lib/seo";

const INITIAL_COUNT = 10;

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostGrid({ posts }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visible = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-gray-200 rounded-2xl">
        <p className="text-gray-400 text-lg mb-3">
          No posts in this category yet
        </p>
        <Link
          href="/blog"
          className="text-sm text-[var(--brand-green)] hover:underline"
        >
          View all posts
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group border border-gray-100 rounded-2xl overflow-hidden hover:border-[var(--brand-green)] transition-all hover:shadow-sm"
          >
            <div className="relative h-48 w-full bg-[var(--brand-green-light)]">
              {post.mainImage ? (
                <Image
                  src={urlFor(post.mainImage).width(600).height(400).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
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
                {[
                  post.publishedAt && formatDate(post.publishedAt),
                  readTimeLabel(post.wordCount),
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((c) => c + 10)}
            className="cursor-pointer rounded-lg border border-[var(--brand-green)] px-8 py-3 text-sm font-medium text-[var(--brand-green)] transition-colors hover:bg-[var(--brand-green)] hover:text-white"
          >
            Load More Posts
          </button>
        </div>
      )}
    </>
  );
}
