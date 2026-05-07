# rmptue — Joshua Chua portfolio

AI-engineering portfolio. Next.js 16, Tailwind v4, MDX content, Geist Mono.

## dev

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## deploy

Push to the `main` branch — Vercel auto-deploys via the connected project.
Project name on Vercel is `rmptue`.

For a one-off CLI deploy:

```bash
vercel --prod
```

## edit content

All written content lives in `/content/`:

- `content/projects/[slug].mdx` — one file per project
- `content/case-studies/[slug].mdx` — one file per case study

Project metadata (title, status, stack, AI components, ordering) lives in
[`lib/projects.ts`](lib/projects.ts) — that's the single source of truth for
the homepage list and project page headers.

To add a new project:

1. Add an entry to `projects` in `lib/projects.ts`.
2. Create `content/projects/<slug>.mdx`.
3. The route `/projects/<slug>` is generated automatically.

See [CONTENT.md](CONTENT.md) for everything that needs updating when you
rename or remove a project.

## stack

- Next.js 16 (App Router, TS, strict)
- Tailwind v4 (CSS-first theme tokens)
- MDX via `@next/mdx` with dynamic imports per route
- Geist Mono everywhere; Geist Sans only for fine print
- Static export — no DB, no auth, no CMS
- Deployed on Vercel as `rmptue`

## design contract

Dark terminal aesthetic. Background `#0a0a0a`, foreground `#e5e5e5`, accent
`#22d3ee`. Generous line-height (1.7). Max content width 720px. Section
labels prefixed with `>` or `$`. Mono everywhere. No drop shadows, no
gradients. See [DECISIONS.md](DECISIONS.md) for choices that diverge from
the original brief.
