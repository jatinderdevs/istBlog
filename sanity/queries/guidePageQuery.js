import { groq } from "next-sanity";

export const guidePageQuery = groq`
  *[_type == "guidePage" && slug.current == $slug][0] {
    title,
    subtitle,
    category,
    readTime,
    seoTitle,
    seoDescription,
    seoKeywords,
    publishedAt,
    showDownloadPDF,
    "slug": slug.current,
    sections[] {
      _type,
      _key,
      ...,
      // Resolve internal links in body content
      body[] {
        ...,
        markDefs[] {
          ...,
          _type == "internalLink" => {
            "slug": @.postSlug
          }
        }
      }
    }
  }
`;

export const guidePageSlugsQuery = groq`
  *[_type == "guidePage" && defined(slug.current)] {
    _updatedAt,
    publishedAt,
    "slug": slug.current
  }
`;
