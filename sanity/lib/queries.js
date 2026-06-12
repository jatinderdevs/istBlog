import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    featured,
    mainImage,
    "author": author->name,
    "categories": categories[]->title,
    "categorySlugs": categories[]->slug.current,
  }
`;

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    mainImage,
    "author": author->name,
    "categories": categories[]->title,
  }
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
  }
`;
export const featuredPostQuery = groq`
  *[_type == "post" && featured == true][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    "author": author->name,
    "categories": categories[]->title,
  }
`;
export const settingsQuery = groq`
  *[_type == "settings"][0] {
    title,
    description,
    keywords,
    heroHeading,
    heroSubtext,
    heroButtonText,
    footerTagline,
  }
`;

export const postsByCategoryQuery = groq`
 *[_type == "post" 
    && $slug in categories[]->slug.current
  ] | order(publishedAt desc) [0...20] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    "author": author->name,
    "categories": categories[]->title,
    "categorySlugs": categories[]->slug.current,
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
  }
`;

