export const SITE_URL = "https://www.internationalstudenttips.com.au";
export const SITE_NAME = "International Student Tips";
export const CONTACT_EMAIL = "hello@internationalstudenttips.com.au";
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
    email: CONTACT_EMAIL,
    founder: {
      "@type": "Person",
      name: "Somin Byun",
      url: `${SITE_URL}/author/somin-byun`,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: CONTACT_EMAIL,
      areaServed: "AU",
      availableLanguage: "English",
      url: `${SITE_URL}/contact`,
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61572900125280",
      "https://www.instagram.com/internationalstudenttips/",
      "https://www.tiktok.com/@internationalstudenttips",
    ],
  });
}

/**
 * Estimated reading time in minutes from a word count (200 wpm).
 * Returns null when the count is unknown so callers can hide the label.
 */
export function readMinutes(wordCount) {
  if (!wordCount || Number.isNaN(Number(wordCount))) return null;
  return Math.max(1, Math.ceil(Number(wordCount) / 200));
}

export function readTimeLabel(wordCount) {
  const minutes = readMinutes(wordCount);
  return minutes ? `${minutes} min read` : null;
}

export function websiteJsonLd() {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-AU",
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  });
}

export function articleJsonLd({
  type = "Article",
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
  author,
  authorUrl,
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

  schema.inLanguage = "en-AU";
  if (datePublished) schema.datePublished = datePublished;
  if (dateModified || datePublished) {
    schema.dateModified = dateModified || datePublished;
  }
  if (image) schema.image = image;
  if (author) {
    schema.author = {
      "@type": "Person",
      name: author,
      ...(authorUrl ? { url: authorUrl } : {}),
    };
  }

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

export function faqJsonLd(items) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  });
}

export function personJsonLd({ name, url, jobTitle, description, image, sameAs }) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    mainEntity: {
      "@type": "Person",
      name,
      url,
      ...(jobTitle ? { jobTitle } : {}),
      ...(description ? { description } : {}),
      ...(image ? { image } : {}),
      ...(sameAs?.length ? { sameAs } : {}),
      worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
  });
}
