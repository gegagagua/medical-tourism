# Medical Tourism Platform (Georgia) — web app

Monorepo scaffold with:

- `apps/web` — Next.js 15 (App Router), next-intl (en/ru/he), Tailwind, design tokens per `docs/DESIGN.md`
- `packages/shared` — i18n routes, enums, zod schemas, catalog seed data
- `packages/config` — shared tsconfig and eslint presets
- `packages/db/prisma/schema.prisma` — data model draft (unused by the web app in this build)

> This build intentionally skips Docker and the NestJS API. The web app runs end-to-end locally
> with seeded data so the public pages, landing and ticket estimator can be reviewed.

## Setup

```bash
pnpm install
pnpm --filter @medtour/web dev
```

Then open http://localhost:3000 — the middleware redirects `/` to the detected locale.

## Scripts

```bash
pnpm dev          # all workspaces (turbo)
pnpm build        # production build
pnpm lint
pnpm typecheck
```

## Where to look

- `docs/SPEC.md`, `docs/TASKS.md`, `docs/DESIGN.md`, `docs/SEO.md` — product and design docs.
- `apps/web/src/app/[locale]/page.tsx` — landing page (dentistry hero + 9 sections).
- `apps/web/src/app/[locale]/[...slug]/page.tsx` — catch-all for public pages (specialty, procedure, prices, clinics, stories, faq, how it works, Tbilisi guide, compare, request).
- `apps/web/src/components/ticket/*` — the signature Ticket (DESIGN.md §2) + the estimator variant.
- `apps/web/src/lib/seo/*` — SEO helpers (metadata, JSON-LD).
- `packages/shared/src/i18n/routes.ts` — localized slug map (SEO.md §2).
