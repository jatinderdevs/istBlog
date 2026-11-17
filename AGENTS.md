# Aus Student Blog

Next.js 16.2 / React 19.2 / Sanity blog for `internationalstudenttips.com.au`.

## Commands

- `npm run dev` (localhost:3000), `npm run build`, `npm run start`, `npm run lint`.
- No tests, typecheck, formatter, or CI; `npm run lint` is the only automated check. Run it before committing.
- Build/prerender fetches Sanity via `generateStaticParams`, so `.env.local` and network access are needed for a clean build.
- Stop `npm run dev` before `npm run build` or `npm run start`; all three write `.next`. Reusing a stale dev server after a build causes Turbopack "Next.js package not found" panics — delete `.next` and restart dev.

## Next.js 16 quirks

- `params`/`searchParams` are Promises — `await` them in pages and `generateMetadata`.
- `generateStaticParams` returns plain objects, not Promises.
- `serverExternalPackages: ["sanity"]` is set in `next.config.mjs`; leave it in place.
- Aliases: `@/*` → `./src/*`, `@sanity/*` → `./sanity/*` (`jsconfig.json`).
- Tailwind v4 via `@tailwindcss/postcss`; no `tailwind.config.js`. Brand vars live in `src/app/globals.css`.

## Sanity CMS

- Studio is at `/studio`; schema root is `sanity/schemas/index.js`, which merges `sanity/schemaTypes/` (post, category, author, blockContent, settings) with `sanity/schemas/` guidePage + object schemas.
- Runtime fetching uses `client` from `sanity/lib/client.js` (`useCdn: false`, `stega: false`). Pages call `client.fetch()` directly and rely on route-level `export const revalidate = 60`; `sitemap.js` passes explicit `next.revalidate`.
- Unwired — do not adopt: `sanityFetch` from `sanity/lib/client.js`, `sanityFetch`/`SanityLive` from `sanity/lib/live.js`, `lib/sanityClient.js`, and `sanity/env.js`.
- Queries: `sanity/lib/queries.js` (post/category/settings) and `sanity/queries/guidePageQuery.js` (guidePage).
- Images go through `urlFor()` from `sanity/lib/image.js`; `next.config.mjs` only allows `cdn.sanity.io` remote images.
- Env vars (`.env*` is gitignored): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `MAILERLITE_API_KEY`, `MAILERLITE_GROUP_ID`, `SANITY_REVALIDATION_SECRET`.
- `/api/revalidate` is a POST webhook: secret in `?secret=`, body `_type` (`post`, `guidePage`, `category`, `settings`) and optional `slug.current`.

## Content routing

- `/blog/[slug]` serves both `post` and `guidePage`. `generateStaticParams` covers both; `revalidate = 60`, `dynamicParams = true`. The post query is checked first, so duplicate slugs render the post.
- Posts use inline PortableText components in `src/app/blog/[slug]/page.js`; guidePages use section maps there plus `guidePortableTextComponents` from `lib/portableTextComponents.jsx`. Adding a Sanity section object alone will not render it — add it to `sectionComponentMap` (or `GuideSectionBlock`'s nested map).
- Other routes: `/`, `/blog`, `/blog/category/[slug]`, `/about`, `/tools/rent-checker`, `/studio/[[...tool]]`, `/api/subscribe`, `/api/revalidate`.
- Legacy redirects live in `next.config.mjs` (old article URLs, `/category/*`, `/tag/*`, `/latest-blogs`, `/about-us`); some map to `/blog?category=...`.

## Structure notes

- App Router only, plain JS (no TypeScript, no Pages Router).
- Root layout re-fetches `settingsQuery` for both metadata and body; GA (`G-5FSDSPEZC9`) and Clarity scripts are hardcoded there.
- `sitemap.js` includes static pages + posts + guidePages + categories (deduped by URL); `robots.js` disallows `/studio` and `/studio/`.
- Canonical/OG/JSON-LD helpers live in `src/lib/seo.js` (`SITE_URL`, `canonicalUrl`); no base-URL env var. Default OG image is `public/og-image.png`.
- `CLAUDE.md` just imports this file; there is no `opencode.json`.
