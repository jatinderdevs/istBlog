import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    _updatedAt,
    title,
    slug,
    publishedAt,
    excerpt,
    featured,
    mainImage,
    "wordCount": length(string::split(pt::text(body), " ")),
    "author": author->name,
    "categories": categories[]->title,
    "categorySlugs": categories[]->slug.current,
  }
`;

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    mainImage,
    "wordCount": length(string::split(pt::text(body), " ")),
    "author": author->name,
    "categories": categories[]->title,
    "categorySlugs": categories[]->slug.current,
  }
`;

// Categories plus how many posts sit in each (used on the home and About pages)
export const categoriesWithCountQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "postCount": count(*[_type == "post" && references(^._id)]),
  }
`;

// Guide pages for listings. Guides keep their category as free text.
export const guidesListQuery = groq`
  *[_type == "guidePage" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    _updatedAt,
    title,
    subtitle,
    category,
    readTime,
    publishedAt,
    "slug": slug.current,
  }
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    description,
  }
`;
export const featuredPostQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc) [0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    "wordCount": length(string::split(pt::text(body), " ")),
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
    "wordCount": length(string::split(pt::text(body), " ")),
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

