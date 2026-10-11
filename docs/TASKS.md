# TASKS — build plan

Top to bottom; each milestone ends demoable. Tick only when acceptance criteria pass. Note deviations under the milestone.

## M0 — Foundation (week 1)

- [ ] Monorepo (pnpm + Turborepo): `apps/api`, `apps/web`, `packages/db`, `packages/shared`, `packages/config`
- [ ] `docker-compose.yml`: postgres 16, redis, minio, mailpit, clamav
- [ ] Prisma from `packages/db/prisma/schema.prisma` with `prisma.config.ts` + pg adapter; first migration
- [ ] Seed: locales, specialties with priorities (dentistry 1, hair 2, dermatology 3, addiction 4 non-bookable, others), dentistry procedures incl. extraction $60, filling $80, cleaning $50 (USD), other prices `TODO`, 2 demo clinics with doctors and price lists, package item types, commission defaults (20%), consent texts placeholders, message templates
- [ ] NestJS skeleton: zod env config, pino with redaction, problem+json, `/health`, Swagger
- [ ] Next.js skeleton: `next-intl` (`en`, `ru`, `he` + `ka` for portal), RTL via `dir` on `<html>`, Tailwind logical properties, shadcn/ui
- [ ] CI: lint, typecheck, unit, build; e2e with service containers
- [ ] `.env.example`, README (setup in ≤ 5 commands)

**Accept:** fresh clone runs locally; home page renders in en/ru/he with correct RTL for he.

## M1 — Auth, roles, consents, audit, crypto (week 2)

- [ ] Patient OTP + magic link login; staff/clinic password + mandatory TOTP
- [ ] Roles, permissions (`SENSITIVE_CASES`), clinic membership; guards + service-level checks
- [ ] `CryptoService` (field encryption) and `FileCryptoService` (per-file data keys, streaming) with tests
- [ ] Audit log (append-only) + decorator for sensitive access
- [ ] Versioned consents (processing, clinic sharing, marketing, cookies, public media)

**Accept:** e2e proves a clinic user cannot access another clinic's data and a coordinator without `SENSITIVE_CASES` cannot see a sensitive case.

## M2 — Design system, catalog, landing and public site (week 3)

- [ ] Tokens (`tokens.css` + Tailwind mapping), fonts via `next/font` (Unbounded + FiraGO), light/dark, RTL base — per DESIGN.md §3
- [ ] Core components from DESIGN.md §7, each with a Playwright screenshot in en/ru/he
- [ ] `Ticket` component (estimator, offer, itinerary, og variants) + price-range and home-price endpoints (SPEC §4.13)
- [ ] Specialty/procedure CRUD with translations, units, indicative ranges, required files; `HomePriceReference` admin
- [ ] Clinic profiles, doctors, price lists (`ClinicProcedurePrice`), vetting checklist in admin
- [ ] Landing page exactly per DESIGN.md §5 (all 10 sections) for home and the dental implants landing
- [ ] Public pages per DESIGN.md §6: specialty, procedure, procedure × country (with thin-content guard), prices, compare, clinic, doctor, how it works, FAQ, Tbilisi guide
- [ ] SEO per SEO.md §11 checklist: slug map, metadata helper, hreflang, canonical, sitemaps, robots, redirects, JSON-LD helpers with snapshots, OG images

**Accept:** Lighthouse mobile ≥ 90 performance, ≥ 95 accessibility and SEO on home, dental landing, procedure, clinic pages in en/ru/he; JSON-LD validates; design checklist in the skill passes with screenshots attached to the PR.

## M3 — Booking a free call, request flow and files (week 4)

- [ ] Coordinator consultation availability + slot engine (patient TZ and Tbilisi TZ), overlap constraint
- [ ] `BookingSheet` on every public page (header button + landing section 5): 3 steps, no account needed, `.ics`, reminders, draft case + coordinator task

- [ ] Multi-step request (specialty/procedure → dates/country → files checklist → questionnaire → contact → consents), mobile camera upload
- [ ] Encrypted upload pipeline: API encrypt → MinIO → ClamAV scan → thumbnail; audited streaming download
- [ ] Case creation with attribution, auto-assignment (language, sensitive permission), status `NEW`
- [ ] Patient account: case list and detail with timeline and files checklist

**Accept:** Playwright: a visitor books a free call from the landing page at 360 px in ≤ 3 steps and the coordinator sees the task; a mobile user submits a dental request with 2 photos and a PDF in under 5 minutes of scripted steps; files stored encrypted (raw object is not a valid image).

## M4 — Coordinator console, sharing, offers (week 5)

- [ ] `CaseStateMachine` with transitions, preconditions, `CaseEvent`; unit tests for every transition
- [ ] Console kanban with SLA badges; tasks; SLA jobs
- [ ] Share case with clinics (consent-gated), patient revocation
- [ ] Clinic portal: shared cases, file viewer, offer builder pre-filled from price list, send offer
- [ ] Patient offer comparison, accept/decline; other offers auto-decline; contact details revealed to the accepting clinic only

**Accept:** e2e: clinic cannot see patient email before acceptance; revoked share returns 403 on file download; overpriced item gets flagged.

## M5 — Inbox and notifications (week 6)

- [ ] Conversations and messages per case; internal notes
- [ ] Channels: email (outbound + inbound webhook), Telegram bot (linking via deep link), WhatsApp Cloud API adapter (feature-flagged)
- [ ] Triage queue for unmatched inbound messages
- [ ] Message templates per locale/channel; notification jobs (SPEC §9)

**Accept:** an inbound Telegram message from a linked patient appears in the right case; reminders are not duplicated after rescheduling.

## M6 — Payments, trips, treatment, commissions (week 7)

- [ ] `PaymentProvider` + fake/manual providers + gateway adapter behind flag; deposit and package orders; idempotent webhooks; refunds per policy
- [ ] Trip builder: flights, hotel, transfers, visits; itinerary page + ICS
- [ ] Clinic: visits done, final amount; `CommissionRecord` via rule lookup
- [ ] Monthly clinic invoices (draft → issued → paid) with PDF
- [ ] Linked follow-up cases (`parentCaseId`) for second-stage treatments

**Accept:** Playwright happy path from request to `TREATED` with fake payments; invoice totals equal the sum of commission records (unit-tested).

## M7 — Follow-up, reviews, content, analytics, launch (week 8)

- [ ] Follow-up 7/30/90 days, complication reports routed to clinic + coordinator
- [ ] Reviews with opt-in publishing, moderation; public media consent
- [ ] CMS: posts, stories, pages with translations, author doctor, reviewed date
- [ ] Cookie banner; first-party events; funnel report by channel/locale/country/specialty; no pixels on sensitive routes (tested)
- [ ] Data export and deletion flow
- [ ] Hardening: headers/CSP, rate limits, backups + restore test, error tracking with scrubbing, load test of request + upload (p95 < 500 ms excluding upload transfer)

**Accept:** funnel report reflects seeded journeys; deletion removes files and answers but keeps invoices and audit rows.

## M8 — Addiction treatment section (after legal review only)

- [ ] Legal sign-off recorded in DECISIONS.md (blocker — do not start without it)
- [ ] Separate route group, tone, family-member flow, admission questionnaire from clinical partner
- [ ] Urgent call-back routing and emergency guidance for high-risk answers
- [ ] Clinic capability check `INPATIENT_24_7`; ads/pixels disabled; analytics without specialty properties
- [ ] Aftercare referral to the online therapy product (consented)

## Later (v2/v3)

Video consultations, partner (hotel/transfer) portal, facilitator portal and commissions, financing and insurance partners, AI case summaries and translation, `ar` and `de` locales, mobile app, SaaS mode for clinics.
