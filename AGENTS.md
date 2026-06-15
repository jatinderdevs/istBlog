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

- `params` and `searchParams` are async — **always `await` them** in page/layout components.
- `generateStaticParams` returns plain objects (not Promises).
- `serverExternalPackages: ["sanity"]` in `next.config.mjs` keeps Sanity as an external module on the server.
- `babel-plugin-react-compiler` in devDependencies — React Compiler is available but not configured in `next.config.mjs`.

## Path aliases

- `@/*` → `./src/*`
- `@sanity/*` → `./sanity/*`

## CSS

- Tailwind v4 via `@tailwindcss/postcss`. No `tailwind.config.js`.
- CSS variables in `globals.css`: `--brand-green`, `--brand-green-light`, `--brand-red`, `--brand-yellow`.

## Sanity CMS

- Studio at `/studio`. Schema + config in `sanity/`.
- **Active schema**: `sanity/schemas/index.js` (imported by `sanity.config.js`). Imports individual types from both `sanity/schemaTypes/` (post, category, author, blockContent, settings) and `sanity/schemas/` (guidePage + objects).
- Schema types: `post`, `category`, `author`, `blockContent`, `settings`, `guidePage` + object types (`guideSection`, `calloutBox`, `quickReferenceSection`, `infoCard`, `twoColumnTable`, `threeColumnTable`, `bulletList`, `cityTabBlock`).
- **Queries in two locations**: `sanity/lib/queries.js` (post, category, settings queries) and `sanity/queries/guidePageQuery.js` (guidePage queries).
- **Client**: `sanity/lib/client.js` — all pages use `client.fetch()` directly with `{ next: { revalidate: N } }`.
- `sanity/lib/live.js` exports `sanityFetch` and `SanityLive` but **neither is used** anywhere.
- `sanity/lib/image.js` exports `urlFor()`.
- `sanity/structure.js` customises the Studio sidebar.
- Env vars: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (in `.env.local`). `.env*` is gitignored.
- `lib/sanityClient.js` is an unused duplicate — always use `sanity/lib/client.js`.

## Content types at `/blog/[slug]`

The detail route renders **two content types** sharing the same URL namespace:
1. **post** — standard blog post with `PortableText` body.
2. **guidePage** — structured guide with sections (uses block components from `lib/portableTextComponents.jsx`).

`generateStaticParams` fetches slugs from both. `revalidate = 60`. `dynamicParams = true`.

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
| `/api/subscribe` | `src/app/api/subscribe/` |

## Redirects

Defined in `next.config.mjs`. Old article URLs, `/category/*`, `/tag/*`, `/latest-blogs`, `/about-us` all redirect. Some old category slugs redirect with query params (e.g., `/category/Money-Management` → `/blog?category=tax-and-money`).

## Sitemap & Robots

- `src/app/sitemap.js` — static pages + dynamic post/category URLs. `revalidate = 60`.
- `src/app/robots.js` — disallows `/studio/`.

## Structure notes

- App Router only (no Pages Router). Plain JS (no TypeScript).
- Root layout (`src/app/layout.js`) re-fetches `settingsQuery` for both `generateMetadata` and the layout body.
- Analytics: Google Analytics (`G-5FSDSPEZC9`) + Microsoft Clarity injected via `<script>` tags in root layout.
- Social links (Facebook, Instagram, TikTok) in footer.
