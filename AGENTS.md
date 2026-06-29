<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Aus Student Blog

Next.js 16.2 + React 19.2 + Sanity CMS blog. Domain: `internationalstudenttips.com.au`

## Commands

| Command | What |
|---------|------|
| `npm run dev` | Dev server on `localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint v9 flat config (`eslint.config.mjs`) |

No tests, no typecheck, no formatter. Before committing, run `npm run lint`.

## Next.js 16 quirks

- `params`/`searchParams` are async — **always `await` them** in page/layout components.
- `generateStaticParams` returns plain objects (not Promises).
- `serverExternalPackages: ["sanity"]` in `next.config.mjs`.
- `babel-plugin-react-compiler` in devDependencies but **not** configured in `next.config.mjs`.

## Path aliases

- `@/*` → `./src/*`
- `@sanity/*` → `./sanity/*`

## CSS

- Tailwind v4 via `@tailwindcss/postcss`. No `tailwind.config.js`.
- CSS variables in `globals.css`: `--brand-green`, `--brand-green-light`, `--brand-red`, `--brand-yellow`.

## Sanity CMS

- **Studio** at `/studio`. Schema root: `sanity/schemas/index.js` — merges `sanity/schemaTypes/` (post, category, author, blockContent, settings) and `sanity/schemas/` (guidePage + objects).
- **Client**: `sanity/lib/client.js` — all pages use `client.fetch()` directly with `{ next: { revalidate: N } }`.
- **Unused** — `sanityFetch` from `sanity/lib/client.js`, and both `sanityFetch`/`SanityLive` from `sanity/lib/live.js`. `lib/sanityClient.js` is an unused duplicate.
- **Queries**: `sanity/lib/queries.js` (post, category, settings) and `sanity/queries/guidePageQuery.js` (guidePage).
- **Images**: `sanity/lib/image.js` exports `urlFor()`.
- **Env vars** (in `.env.local`, gitignored): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, plus `MAILERLITE_API_KEY`, `MAILERLITE_GROUP_ID` for `/api/subscribe`, and `SANITY_REVALIDATION_SECRET` for the `/api/revalidate` webhook.

## Content types at `/blog/[slug]`

Two content types share this URL namespace. `generateStaticParams` fetches slugs from both. `revalidate = 60`. `dynamicParams = true`.
1. **post** — blog post with `PortableText` body (inline components in page.js).
2. **guidePage** — structured guide with section blocks (uses `guidePortableTextComponents` from `lib/portableTextComponents.jsx`).

## Routes

| Path | File |
|------|------|
| `/` | `src/app/page.js` |
| `/blog` | `src/app/blog/page.js` |
| `/blog/[slug]` | `src/app/blog/[slug]/page.js` |
| `/blog/category/[slug]` | `src/app/blog/category/[slug]/page.js` |
| `/studio/[[...tool]]` | `src/app/studio/[[...tool]]/page.jsx` |
| `/tools/rent-checker` | `src/app/tools/rent-checker/page.js` |
| `/about` | `src/app/about/page.js` |
| `/api/subscribe` | `src/app/api/subscribe/route.js` |

## Redirects

Defined in `next.config.mjs`. Old article URLs, `/category/*`, `/tag/*`, `/latest-blogs`, `/about-us` all redirect. Some old category slugs map with query params (e.g., `/category/Money-Management` → `/blog?category=tax-and-money`).

## Sitemap & Robots

- `src/app/sitemap.js` — static pages + dynamic post/category URLs. `revalidate = 60`.
- `src/app/robots.js` — disallows `/studio/`.

## Structure notes

- App Router only (no Pages Router). Plain JS (no TypeScript).
- Root layout (`src/app/layout.js`) re-fetches `settingsQuery` for both `generateMetadata` and the layout body.
- Analytics: Google Analytics (`G-5FSDSPEZC9`) + Microsoft Clarity injected via `<script>` tags in root layout.
- No `opencode.json` — agent instructions live only in this file.
