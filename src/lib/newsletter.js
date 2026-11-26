// ─── Newsletter offers ───────────────────────────────────────────────────────
// One place to change what every signup form says. Blog posts pick the offer
// that matches their first category slug (from Sanity); anything not listed
// falls back to DEFAULT_OFFER.
//
// Keep every promise true: only offer what subscribers will actually get.
// When a free PDF (e.g. a work-rights cheat sheet) is ready, update that
// category's headline/description/button here and every post in the category
// changes at once.

export const DEFAULT_OFFER = {
  headline: "Get new guides in your inbox",
  description:
    "Plain-English guides on visas, work rights, money and renting in Australia, sent when we publish something useful. Free, and you can unsubscribe anytime.",
  button: "Send me new guides",
};

export const NEWSLETTER_OFFERS = {
  "jobs-and-work-rights": {
    headline: "Stay on top of your work rights",
    description:
      "Work hour limits, pay rates and your rights at work change. We'll email you plain-English updates and new work guides when they come out.",
    button: "Send me work-rights updates",
  },
  "visa-and-immigration": {
    headline: "Get student visa change alerts",
    description:
      "Visa rules change often. We'll email you a plain-English summary when something changes that affects student visa holders.",
    button: "Send me visa alerts",
  },
  "arriving-and-settling-in": {
    headline: "New to Australia? We'll help you settle in",
    description:
      "Get our settling-in guides by email: bank accounts, phone plans, tax file numbers, transport and the things nobody tells you.",
    button: "Send me settling-in guides",
  },
  housing: {
    headline: "Renting in Australia? Get our housing guides",
    description:
      "Rental scams, bonds, inspections and your rights as a tenant, explained simply. We'll email new housing guides when we publish them.",
    button: "Send me housing guides",
  },
  "tax-and-money": {
    headline: "Get our money and tax guides",
    description:
      "Tax returns, TFNs, super and banking for international students, explained in plain English and sent to your inbox.",
    button: "Send me money guides",
  },
  "saving-money": {
    headline: "Save more as a student in Australia",
    description:
      "Student discounts, cheaper groceries and budgeting tips that actually work. We'll email new money-saving guides as we publish them.",
    button: "Send me saving tips",
  },
  "health-and-wellbeing": {
    headline: "Get our health and wellbeing guides",
    description:
      "OSHC, seeing a GP, mental health support and staying well while studying, explained simply and sent to your inbox.",
    button: "Send me health guides",
  },
  "student-life-in-melbourne": {
    headline: "Make the most of student life",
    description:
      "Things to do, places to go and tips for student life in Australia, sent to your inbox when we publish something new.",
    button: "Send me student life tips",
  },
};

// Used on the Rent Checker tool page.
export const RENT_CHECKER_OFFER = {
  headline: "Get our renting guides by email",
  description:
    "Avoid rental scams, understand your bond and know your rights as a tenant. We'll email new housing and budgeting guides when we publish them.",
  button: "Send me renting guides",
};

export function offerForCategory(slug) {
  return (slug && NEWSLETTER_OFFERS[slug]) || DEFAULT_OFFER;
}

// localStorage keys (per browser). Reads/writes are wrapped because storage
// can throw in private mode or embedded browsers.
export const SUBSCRIBED_KEY = "ist_newsletter_subscribed";
export const SLIDE_IN_DISMISSED_KEY = "ist_newsletter_slidein_dismissed_at";

export function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore: storage is a convenience only.
  }
}
