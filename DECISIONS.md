# DECISIONS.md

Architectural choices that diverge from the original brief, with reasoning.

## Next 16, not Next 15

The brief specified Next 15. `create-next-app@latest` shipped Next 16 (current
LTS as of 2026-05). The patterns are similar but the file conventions in
`node_modules/next/dist/docs/01-app/` instructed using App Router with
async `params` (which is now `Promise<{ slug }>`). Updated all dynamic route
handlers accordingly. No functional difference for this site.

## `@next/mdx` over `next-mdx-remote` or `contentlayer2`

The brief allowed any of three. Chose `@next/mdx` because:

- The official docs recommend the dynamic-import pattern for slug-routed MDX,
  which compiles at build time and produces zero runtime MDX overhead.
- `contentlayer2` has been intermittently incompatible with Next 14+ during
  the transition; reaching for it now would be a debugging cost.
- `next-mdx-remote` is fine but the dynamic-import path is simpler and gets
  static generation by default via `generateStaticParams` + `dynamicParams = false`.

`gray-matter` and `next-mdx-remote` are still in package.json (installed
during exploration) but unused. Left in place; small bloat, easy to remove
later.

## Project metadata in TypeScript, not MDX frontmatter

The brief specified frontmatter via gray-matter. Inverted that — project
metadata lives in `lib/projects.ts` as a typed array, MDX files hold body
content only. Reasons:

- One source of truth for the homepage list.
- Full type safety on every metadata field.
- No filesystem read at request time for the homepage.
- Trivial to refactor (e.g., adding a new field).

The trade-off: editing a project requires touching two files (the
metadata and the MDX). Documented in CONTENT.md.

## No shadcn/ui CLI

The brief specified shadcn/ui primitives (Card, Badge, Button, Sheet). The
site needs Card and Badge and nothing else. Hand-rolled both as plain
components against Tailwind tokens — `Card` is a `<div>` with a border
class, `Badge` is a `<span>`. The shadcn CLI dance would have been overhead
for components that are 5–10 lines each.

If a Sheet, Dialog, or Button-with-variants is added later, run
`npx shadcn@latest init` then.

## Tailwind v4 CSS-first theme

Theme tokens live in `app/globals.css` via `@theme inline`. No
`tailwind.config.ts`. This is the v4 idiom; it's leaner and the tokens are
co-located with the colors they reference.

## OG image: edge runtime, generated per build

`app/opengraph-image.tsx` uses `next/og` at the edge. Single static OG image
for the whole site (no per-project OG yet). Per-project OG images are a
~1-hour upgrade if needed — copy the file into `app/projects/[slug]/`.

## footer = "rmptue" (joshua's spec)

User asked for the footer to be `rmptue`. Interpreted that as the deploy
domain reference shown in the OG image. The on-site footer keeps the four
links (github / linkedin / email / altograph) per the brief. If a different
interpretation is intended, the only change is in `app/page.tsx`.

## Tailwind class set assumes the theme tokens exist

Classes like `text-muted`, `border-border`, `bg-border/30` rely on the
`@theme inline` block in `globals.css`. If those tokens are renamed,
class usage needs to follow.

## No analytics yet

`app/layout.tsx` has a TODO for analytics. Plausible or `@vercel/analytics`
is a 5-minute add when the domain is final.
