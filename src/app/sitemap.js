import { client } from "../../sanity/lib/client";
import {
  postsQuery,
  categoriesQuery,
  authorsQuery,
} from "../../sanity/lib/queries";
import { guidePageSlugsQuery } from "../../sanity/queries/guidePageQuery";
import { canonicalUrl } from "@/lib/seo";

export const revalidate = 60;

function withLastModified(entry, document) {
  const modified = document?._updatedAt || document?.publishedAt;
  if (!modified) return entry;
  return { ...entry, lastModified: new Date(modified).toISOString() };
}

export default async function sitemap() {
  const [posts, categories, guides, authors] = await Promise.all([
    client.fetch(postsQuery, {}, { next: { revalidate: 60 } }),
    client.fetch(categoriesQuery, {}, { next: { revalidate: 60 } }),
    client.fetch(guidePageSlugsQuery, {}, { next: { revalidate: 60 } }),
    client.fetch(authorsQuery, {}, { next: { revalidate: 60 } }),
  ]);

  const authorUrls = authors.map((author) =>
    withLastModified(
      {
        url: canonicalUrl(`/author/${author.slug}`),
        changeFrequency: "monthly",
        priority: 0.4,
      },
      author,
    ),
  );

  const postUrls = posts.map((post) =>
    withLastModified(
      {
        url: canonicalUrl(`/blog/${post.slug.current}`),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      post,
    ),
  );

  const guideUrls = guides.map((guide) =>
    withLastModified(
      {
        url: canonicalUrl(`/blog/${guide.slug}`),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      guide,
    ),
  );

  const categoryUrls = categories.map((category) =>
    withLastModified(
      {
        url: canonicalUrl(`/blog/category/${category.slug}`),
        changeFrequency: "weekly",
        priority: 0.7,
      },
      category,
    ),
  );

  const articleUrls = [...postUrls, ...guideUrls].filter(
    (entry, index, all) => all.findIndex((item) => item.url === entry.url) === index,
  );

  return [
    {
      url: canonicalUrl("/"),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: canonicalUrl("/blog"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: canonicalUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: canonicalUrl("/contact"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: canonicalUrl("/tools/rent-checker"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...categoryUrls,
    ...authorUrls,
    ...articleUrls,
  ];
}
