import { client } from "../../sanity/lib/client";
import { postsQuery } from "../../sanity/lib/queries";

const BASE_URL = "https://www.internationalstudenttips.com.au";

export default async function sitemap() {
  const posts = await client.fetch(postsQuery);

  const postUrls = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug.current}`,
    lastModified: post.publishedAt || new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...postUrls,
  ];
}
