# CLAUDE.md — Medical Tourism Platform (Georgia)

Read this file first, then `docs/SPEC.md` (what to build) and `docs/TASKS.md` (in what order).
For any UI work use the `medtour-design` skill (`.claude/skills/medtour-design/SKILL.md`), which applies `docs/DESIGN.md` and `docs/SEO.md`.
Work through `docs/TASKS.md` milestone by milestone; tick a checkbox only when its acceptance criteria pass.

## What this product is

A multilingual platform that brings international patients to vetted clinics in Georgia and organizes the whole trip.

- A patient picks a procedure, uploads photos / X-rays / lab results, and gets 1–3 treatment offers with fixed prices from vetted clinics.
- The patient accepts an offer, pays a deposit online, and gets a trip plan (hotel, transfer, visit schedule) and a personal coordinator.
- Clinics use a partner portal to review cases, send offers, manage visits and confirm final amounts (commission basis).
- Coordinators run the case pipeline, a unified inbox (WhatsApp / Telegram / email) and trip logistics.
- Admins vet clinics, manage procedures, commission rules, content and analytics.

Priority specialties: **dentistry (first)**, hair transplant, dermatology/aesthetics, addiction treatment (phase 3, sensitive).
All other specialties are accepted as general requests and handled manually by coordinators.

Locales: `en`, `ru`, `he` at launch (Hebrew is RTL); `ar` (RTL) and `de` later. `ka` for the clinic portal UI.

The company is an organizer/intermediary, **not a healthcare provider**. Never present medical advice as the platform's own; clinical content belongs to clinics and named doctors.

## Stack

| Layer | Choice |
| --- | --- |
| Monorepo | pnpm workspaces + Turborepo |
| API | NestJS (TypeScript strict), REST, OpenAPI via `@nestjs/swagger` |
| Web | Next.js (App Router, TypeScript strict), `next-intl`, Tailwind CSS (logical properties for RTL), shadcn/ui |
| DB | PostgreSQL 16, Prisma ORM 7+ (`packages/db`; URL in `prisma.config.ts`, client via `@prisma/adapter-pg`) |
| Jobs | BullMQ + Redis |
| Validation | Zod schemas in `packages/shared`, reused by API and web |
| Auth | Patients: passwordless email OTP + magic link (low friction), optional Google. Staff/clinic users: password + mandatory TOTP 2FA. JWT access (15 min) + rotating refresh cookie |
| Files | S3-compatible storage (MinIO locally); medical files encrypted by the API before upload (AES-256-GCM, per-file data key wrapped by master key); downloads only through the API with an audit row |
| Messaging | `MessagingChannel` interface: email (MVP), Telegram bot (MVP), WhatsApp Business Cloud API (MVP if credentials exist, else M5) |
| Payments | `PaymentProvider` interface; Georgian bank card gateway adapter (BOG or TBC, TBD) + fake/manual providers |
| Video consults | v2, behind `VideoProvider` |
| Tests | Vitest/Jest unit, Supertest e2e, Playwright for critical web flows |
| Local infra | `docker-compose.yml`: postgres, redis, minio, mailpit |

Use the latest stable versions at scaffolding time. Prefer existing dependencies over new ones.

## Repository layout

```
apps/
  api/      NestJS (one module per domain, SPEC §5)
  web/      Next.js: public site, patient area, clinic portal, coordinator console, admin
packages/
  db/       prisma/schema.prisma, migrations, seed
  shared/   zod schemas, enums, i18n keys and route slugs, money/time utils
  config/   eslint, tsconfig, prettier presets
docs/
  SPEC.md   specification
  TASKS.md  milestones with acceptance criteria
  DESIGN.md visual system, landing and page plans
  SEO.md    SEO strategy and implementation contract
.claude/skills/medtour-design/SKILL.md   design + SEO skill for UI tasks
```

## Commands (create in M0, keep working)

```
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm db:migrate
pnpm db:seed
docker compose up -d
```

## Non-negotiable rules

Medical files and case details are **health data** (special category under Georgia's Law on Personal Data Protection, in force since 1 March 2024; many patients are in the EU/UK → GDPR-grade handling).

1. **Encryption:** medical files and clinical free text (`*Encrypted` columns) are encrypted at the application level. Never log, index, cache in CDN, or send them to analytics or error trackers.
2. **Consent-gated sharing:** a clinic sees a case's medical files only after the patient consented to share with **that** clinic (`CaseShare`). Revoking consent revokes access.
3. **Least privilege:** clinic users see only cases shared with their clinic. Coordinators see cases assigned to their team. Cases in sensitive specialties (`Specialty.isSensitive`, e.g. addiction) are visible only to coordinators with the `SENSITIVE_CASES` permission.
4. **Audit log** for every medical file download/view, case share, offer acceptance, payment/refund, role change, export, deletion. Append-only.
5. **Consents** are versioned and stored with timestamp and IP: data processing, sharing with clinics (per clinic), marketing, cookies, public story/photo use — all separate.
6. **No marketing/retargeting pixels** on sensitive-specialty pages or in authenticated areas. Server-side conversion events never include procedure or specialty for sensitive specialties.
7. **No PII in logs** (pino with redaction; log ids only).
8. **Time:** UTC `timestamptz` in DB; clinics operate in `Asia/Tbilisi`; patients see their own time zone and Tbilisi time side by side.
9. **Money:** integer minor units + ISO currency. Offers can be in USD, EUR or GEL; commission is computed in the offer currency.
10. **Price integrity:** the treatment price shown to the patient equals the clinic's offer. Platform margin is only on non-medical package items and is shown as such.
11. **i18n and RTL:** no hard-coded strings; all launch locales updated in the same change; layouts use logical CSS properties so `he`/`ar` render correctly.
12. **Accessibility:** WCAG 2.1 AA on public and patient pages.

## Conventions

- TypeScript strict; no `any` without a justification comment.
- Thin controllers, logic in services, Zod-validated DTOs from `packages/shared`.
- RFC 7807 problem+json errors.
- Authorization = role/permission guard + ownership/share checks in services.
- Case status changes only through `CaseStateMachine` (explicit allowed transitions, each writes a `CaseEvent`).
- Server components by default on web; typed API client generated from OpenAPI.
- Every schema change is a named Prisma migration; never edit applied migrations.
- Tests: business rules → unit tests; every endpoint → e2e with auth + happy path; sharing, payments and state machine also cover failure paths.
- Conventional Commits.

## Definition of done (per task)

- Lint, typecheck, unit + e2e green.
- OpenAPI updated; new env vars in `.env.example` with comments.
- Strings in all launch locales; RTL checked for `he`.
- UI tasks: the checklist in the `medtour-design` skill passes (screenshots reviewed, Lighthouse thresholds met).
- Security rules respected; sensitive access audited.
- Checkbox ticked in `docs/TASKS.md`; deviations noted under the milestone.

## When unsure

Choose the simplest design that meets SPEC; if SPEC is silent, choose the option safer for patient data and patient safety, record it in `docs/DECISIONS.md` (date, decision, reason), and continue.
