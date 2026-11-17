export const SITE_URL = "https://www.internationalstudenttips.com.au";
export const SITE_NAME = "International Student Tips";
export const DEFAULT_DESCRIPTION =
  "Practical guides for international students in Australia.";

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

export function canonicalUrl(path = "/") {
  const normalized = path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${SITE_URL}${normalized}`;
}

export function jsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function keywordList(value) {
  if (Array.isArray(value)) {
    return value.map((keyword) => String(keyword).trim()).filter(Boolean);
  }
  if (typeof value !== "string") return [];
  return value
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

export function portableTextToText(blocks) {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (typeof block === "string") return block;
      if (block?._type === "block" && Array.isArray(block.children)) {
        return block.children.map((child) => child?.text || "").join("");
      }
      return "";
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function descriptionFrom(
  value,
  fallback = DEFAULT_DESCRIPTION,
  maxLength = 160,
) {
  const text = Array.isArray(value)
    ? portableTextToText(value)
    : String(value || "")
        .replace(/\s+/g, " ")
        .trim();

  if (!text) return fallback;
  if (text.length <= maxLength) return text;

  const sentenceEnd = text.indexOf(". ");
  if (sentenceEnd >= 40 && sentenceEnd + 1 <= maxLength) {
    return text.slice(0, sentenceEnd + 1);
  }

  const candidate = text.slice(0, maxLength);
  const lastSentence = Math.max(
    candidate.lastIndexOf(". "),
    candidate.lastIndexOf("! "),
    candidate.lastIndexOf("? "),
  );
  if (lastSentence >= 40) return candidate.slice(0, lastSentence + 1);

  const trimmed = candidate.replace(/\s+\S*$/, "");
  return `${trimmed}…`;
}

export function organizationJsonLd() {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 415,
      height: 175,
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61572900125280",
      "https://www.instagram.com/internationalstudenttips/",
      "https://www.tiktok.com/@internationalstudenttips",
    ],
  });
}

export function articleJsonLd({
  type = "Article",
  title,
  description,
  url,
  datePublished,
  image,
  author,
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    headline: title,
    description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 415,
        height: 175,
      },
    },
  };

  if (datePublished) schema.datePublished = datePublished;
  if (image) schema.image = image;
  if (author) schema.author = { "@type": "Person", name: author };

  return jsonLd(schema);
}

export function breadcrumbJsonLd(items) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}
