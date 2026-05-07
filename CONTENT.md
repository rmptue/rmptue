# CONTENT.md — where everything lives

Single source of truth for content edits. If you rename a project, change a
slug, or add a new one, this file lists every place that needs updating.

## adding a new project

1. **`lib/projects.ts`** — add a `Project` entry. `slug` must be unique.
2. **`content/projects/<slug>.mdx`** — create the body content.
3. **`app/sitemap.ts`** — picks up automatically via `getAllSlugs()`.
4. **`app/projects/[slug]/page.tsx`** — picks up automatically via
   `generateStaticParams()`.

## renaming a project (slug change)

1. Rename `content/projects/<old-slug>.mdx` → `<new-slug>.mdx`.
2. Update `slug` in `lib/projects.ts`.
3. Add a redirect in `next.config.ts` if the old slug was indexed.

## removing a project

1. Delete `content/projects/<slug>.mdx`.
2. Remove the entry from `projects` in `lib/projects.ts`.
3. Add a 410 / redirect in `next.config.ts` if the URL was public.

## adding a case study

1. **`app/case-studies/page.tsx`** — add to the `studies` list.
2. **`app/case-studies/[slug]/page.tsx`** — add the slug to the `studies`
   array (used by `generateStaticParams`).
3. **`content/case-studies/<slug>.mdx`** — create the body.
4. **`app/sitemap.ts`** — add the route.

## global metadata

- Site title, description, OG defaults: `app/layout.tsx`
- Static OG image: `app/opengraph-image.tsx`
- Robots / sitemap base URL: `app/robots.ts` and `app/sitemap.ts` —
  the `BASE_URL` constant lives in both.

## navigation

- Header nav: `app/layout.tsx` (top of `<header>`)
- Footer links: `app/page.tsx` (bottom of homepage `<footer>`)

## /now content

`app/now/page.tsx` — three sections, hand-edited.

## /about content

`app/about/page.tsx` — three paragraphs + reach-me list.
