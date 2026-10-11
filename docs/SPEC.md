# SPEC — Medical Tourism Platform (Georgia)

Version 0.1 · 2026-10-11 · Owner: Gega (CTO)

Business context is in the business plan document. **MVP** = first 8 weeks; **v2**/**v3** are designed for, not built.

---

## 1. Goals

1. A patient abroad submits a request with medical files in under 5 minutes, on mobile.
2. A clinic turns a case into a priced offer in under 15 minutes.
3. Every case has an owner, a status and a next action; nothing waits more than 48 h unnoticed.
4. Medical data is encrypted, shared only with consent, and audited.
5. Public pages rank for "procedure + abroad/Georgia + country" searches in en/ru/he.

Funnel the system must report, per channel, locale, country and specialty:
visit → request started → request with files → offer sent → offer accepted (deposit) → arrived → treated → review.

---

## 2. Roles and permissions

| Role | Who | Can |
| --- | --- | --- |
| `PATIENT` | International patient (or a family member acting for them) | Own cases, files, consents, offers, payments, trip plan, reviews, data export/deletion |
| `CLINIC_ADMIN` | Clinic manager | Clinic profile, doctors, price list, users of own clinic, all cases shared with the clinic, offers, visits, final amounts |
| `CLINIC_DOCTOR` | Doctor | Cases shared with the clinic, files, offers (draft; admin may require approval), visit notes |
| `COORDINATOR` | Platform staff | Assigned cases, inbox, tasks, trip logistics, send/resend offers, record payments manually; `SENSITIVE_CASES` permission needed for sensitive specialties |
| `ADMIN` | Platform operators | Clinics vetting, specialties/procedures, commission rules, invoices, content, users, analytics, audit viewer |
| `PARTNER` (v2) | Hotel / transfer company | Booking requests addressed to them |
| `FACILITATOR` (v2) | Agent abroad | Submit cases on behalf of patients they bring, see status, see their commission |

Permissions are role defaults + explicit grants (`UserPermission`). A user can belong to several clinics only via separate `ClinicMember` rows.

---

## 3. Catalog

- `Specialty`: key, `priority` (ordering on site and in triage), `isSensitive` (addiction = true), translations, `isBookable` (false = accepted only as general request).
- Seed priorities: `dentistry` 1, `hair-transplant` 2, `dermatology` 3, `addiction` 4 (`isBookable=false` until M8), others (`orthopedics`, `ophthalmology`, `ivf`, `bariatric`, `checkup`, `other`) 10+.
- `Procedure`: belongs to a specialty; translations; `unit` (per tooth, per graft, per session, per course, per day); indicative price range (min/max, currency) for public pages; `typicalStayDays`, `visitsNeeded`, `requiredFiles` (e.g. panoramic X-ray / OPG, scalp photos from 4 angles, skin photos, medical history form).
- Seed dentistry procedures with **known Georgian base prices** (from partner clinic): extraction $60, filling $80, professional cleaning $50. Implant, crown, veneer, All-on-4/6, bone graft, sinus lift: price range `TODO` (filled by admin).
- `ClinicProcedurePrice`: per clinic, per procedure, currency, amount or range, valid from/to. Used for public "from" prices and to pre-fill offers.
- `PackageItemType`: non-medical items (hotel night, airport transfer, interpreter day, SIM, city tour, concierge) with cost and platform price — the only place platform margin lives.

---

## 4. Core flows

### 4.1 Request (case creation) — MVP
1. Patient chooses specialty → procedure(s) (or "not sure") → country, preferred travel dates, companions count, language.
2. Uploads required files (`requiredFiles` drives the checklist); camera capture on mobile; max 25 MB per file; images, PDF, DICOM zip accepted. Files are encrypted by the API before storage.
3. Medical questionnaire per specialty (`QuestionnaireTemplate`, versioned; answers encrypted).
4. Contact: email (OTP login is created on the fly), phone/WhatsApp, Telegram (optional).
5. Consents: data processing (required), share with clinics (required to receive offers), marketing (optional).
6. Attribution (UTM, referrer, landing path, locale, facilitator ref) stored on the case.
Result: `Case` in status `NEW`, coordinator auto-assigned (round-robin among coordinators with the right language and, for sensitive specialties, the `SENSITIVE_CASES` permission).

### 4.2 Case state machine — MVP

```
NEW → AWAITING_FILES → IN_REVIEW → OFFERS_SENT → OFFER_ACCEPTED → DEPOSIT_PAID → TRIP_PLANNED
    → ARRIVED → IN_TREATMENT → TREATED → FOLLOW_UP → CLOSED_WON
any non-terminal → CLOSED_LOST (reason required) | ON_HOLD (resume to previous)
```
- Each transition: allowed roles, preconditions (e.g. `OFFERS_SENT` requires ≥1 offer with status `SENT`), side effects (notifications, tasks), and a `CaseEvent` row.
- SLA timers create coordinator tasks: `NEW` > 2 h in working hours; `IN_REVIEW` > 48 h without an offer; `OFFERS_SENT` > 72 h without patient response (follow-up); `TREATED` → follow-up tasks at 7, 30, 90 days.

### 4.3 Sharing with clinics — MVP
- Coordinator selects 1–3 clinics (filtered by specialty, procedure, language, availability on travel dates).
- Patient must have consented to sharing; for the MVP, consent covers "vetted partner clinics selected by my coordinator", and each concrete share creates a `CaseShare` visible to the patient with the clinic name. Patient can revoke a share from the account.
- Clinic sees: case summary, questionnaire answers, files (each view/download audited). Clinic never sees patient contact details until the offer is accepted (prevents bypass); communication runs through the platform inbox.

### 4.4 Offers — MVP
- `Offer`: clinic, doctor, items (`OfferItem`: procedure, tooth numbers/area, quantity, unit price, total), currency, total, number of visits, days needed per visit, warranty text, validity date, notes (translated by coordinator if needed), status `DRAFT → SENT → ACCEPTED | DECLINED | EXPIRED | WITHDRAWN`.
- Pricing rule: `OfferItem.unitPrice` cannot exceed the clinic's current `ClinicProcedurePrice` max without an admin-visible flag.
- Patient compares offers side by side (clinic, doctor, total, visits, warranty, reviews) and accepts one; the others auto-decline.
- On acceptance: clinic gets patient contact details; deposit order is created.

### 4.5 Payments — MVP
- Deposit (configurable: default 10% of treatment, min $100) collected by the platform → credited against the treatment; the balance is paid at the clinic.
- Package items (hotel, transfer…) paid online to the platform.
- `PaymentProvider` interface (create checkout, webhook, refund); idempotent webhooks; fake + manual providers for dev.
- Refund rules on cancellation configurable per specialty (default: deposit refundable until 14 days before arrival).

### 4.6 Trip planning — MVP
- `Trip`: arrival/departure datetimes + flight numbers (entered by patient), companions, hotel booking (partner, room type, nights, confirmation), transfers (pickup time, driver name/phone), visit schedule (`Visit` rows with clinic time slots), emergency contact, coordinator on duty.
- Patient sees a single itinerary page (works offline-friendly: printable, add-to-calendar ICS).
- Reminders: 7 days, 1 day before arrival; day-of pickup info; visit reminders.

### 4.7 Treatment and closing — MVP
- Clinic marks visits done and confirms the **final treatment amount** actually paid by the patient.
- Commission = final amount × commission rate (rule lookup: clinic+specialty override → specialty default → global default). Creates `CommissionRecord`.
- Monthly `ClinicInvoice` per clinic (sum of commission records), PDF, status `DRAFT → ISSUED → PAID`.
- Second-stage treatments (e.g. implant crown after healing) create a linked `Case` with `parentCaseId`.

### 4.8 Follow-up, reviews, complications — MVP (reviews) / v2 (quality panel)
- Follow-up messages at 7/30/90 days ask about recovery; answer "problem" opens a `ComplicationReport` (encrypted description) routed to the clinic and coordinator.
- Review: rating 1–5 per clinic/doctor + text; publishing requires patient opt-in; before/after photos require a separate `PUBLIC_MEDIA` consent and clinic approval.

### 4.9 Unified inbox — MVP
- `Conversation` per case; `Message` rows from email, Telegram, WhatsApp (when configured), and internal notes (staff-only).
- Inbound messages matched to a case by channel identity; unmatched messages go to a triage queue.
- Clinic ↔ patient messages go through the platform until offer acceptance.

### 4.10 General requests (non-priority specialties) — MVP
- Same case flow with `specialty = other` or a non-bookable specialty; no public prices; coordinator finds clinics manually. Count by specialty feeds the "next priority" report.

### 4.11 Sensitive specialty: addiction treatment — M8 only
- Separate public section and tone; supports "I'm asking for a family member" flow (`requesterRelation`).
- Admission questionnaire defined by partner clinic's medical director; high-risk answers route to an urgent call-back task and show emergency guidance; the platform does not give medical advice.
- Only inpatient clinics with 24/7 medical supervision can be partners (`Clinic.capabilities` includes `INPATIENT_24_7`).
- No marketing/retargeting pixels on these pages; ads for this specialty off by default.
- Aftercare: link to online therapy (separate product) via referral with consent.

### 4.12 Free consultation booking from the landing page — MVP
- Any public page offers "Book a free call": a 15-minute call with a coordinator (WhatsApp video, phone or Google Meet).
- `ConsultationAvailability`: weekly rules per coordinator in `Asia/Tbilisi` + exceptions; slot length 15 min, 5 min buffer, lead time 2 h, horizon 14 days; languages per coordinator.
- `GET /consultations/slots?locale=&language=&tz=` merges coordinators who speak the requested language; `POST /consultations` creates a `ConsultationBooking` (name, email, phone/WhatsApp, language, procedure of interest, call type, consent) — the visitor does not need an account.
- Double booking prevented by an overlap constraint per coordinator (same approach as SPEC §6 note).
- Creates/updates a draft `Case` in `NEW` with source `consultation`, sends confirmation with `.ics`, reminders 24 h and 1 h before, and a coordinator task.
- Landing "Get my plan" CTA pre-fills the request flow (§4.1) with the ticket estimator's choices (country, procedure, quantity).

### 4.13 Price estimator (landing "ticket") — MVP
- `GET /procedures/:key/price-range?currency=` → min/max across active clinics' current `ClinicProcedurePrice`, `typicalStayDays`, `visitsNeeded`.
- `HomePriceReference` (admin-managed): procedure × country → min/max, currency, source URL, checked date. Shown only with its source.
- Output is always labelled as an estimate.

### 4.14 Data subject requests — MVP
- Export (JSON + files zip) and deletion request. Deletion anonymizes identity, deletes medical files and questionnaire answers after legal retention review (configurable), keeps financial and audit records.

---

## 5. API (NestJS modules), base `/api/v1`

| Module | Key endpoints |
| --- | --- |
| `auth` | OTP request/verify, magic link, Google, staff password login + TOTP, refresh, logout |
| `me` | profile, consents, export, deletion request |
| `consultations` | `GET /consultations/slots`, `POST /consultations`, `POST /consultations/:id/cancel` (signed link), coordinator availability CRUD |
| `catalog` | `GET /procedures/:key/price-range`, `GET /home-prices?procedure=&country=`, `GET /specialties`, `GET /procedures?specialty=`, admin CRUD, `GET /questionnaires/:specialty` |
| `clinics` | public list/profile, `GET/PATCH /clinic/profile`, doctors CRUD, price list CRUD, members |
| `cases` | `POST /cases`, `GET /me/cases`, `GET /cases/:id`, `POST /cases/:id/transition`, `POST /cases/:id/files` (presigned upload via API), `GET /files/:id` (audited stream) |
| `sharing` | `POST /cases/:id/shares` (coordinator), `DELETE /cases/:id/shares/:shareId` (patient revoke), `GET /clinic/cases` |
| `offers` | clinic CRUD + send, `GET /cases/:id/offers`, `POST /offers/:id/accept`, `POST /offers/:id/decline` |
| `payments` | `POST /checkout`, `POST /payments/webhook/:provider`, admin refunds |
| `trips` | `GET/PUT /cases/:id/trip`, visits CRUD, `GET /cases/:id/itinerary.ics` |
| `commissions` | `POST /clinic/cases/:id/final-amount`, admin commission rules, invoices generate/issue/mark-paid, PDF |
| `inbox` | conversations, messages, send via channel, triage queue, channel webhooks (`/webhooks/telegram`, `/webhooks/whatsapp`, inbound email) |
| `tasks` | list/mine, create, complete; SLA-generated tasks |
| `reviews` | create, moderate, public list |
| `complications` | create (patient/coordinator), clinic response, admin view |
| `content` | pages, posts, stories (translations linked), public GET by locale/slug |
| `partners` (v2) | hotels/transfers requests |
| `facilitators` (v2) | submit case, status, commission |
| `analytics` | first-party events, funnel report |
| `admin` | users, permissions, settings, audit viewer |
| `health` | liveness/readiness |

---

## 6. Data model

Source of truth: `packages/db/prisma/schema.prisma` (validated draft). Raw SQL migration: `CREATE EXTENSION IF NOT EXISTS btree_gist;` and an EXCLUDE constraint on `ConsultationBooking (coordinator_id WITH =, tstzrange(starts_at, ends_at) WITH &&) WHERE status <> 'CANCELLED'`. UUID ids, timestamptz, translations in `*Translation` tables, encrypted columns are `Bytes` + `keyVersion`.

---

## 7. Web app

Design: `docs/DESIGN.md` (tokens, page plans, the Ticket) applied through the `medtour-design` skill in `.claude/skills/`.
SEO: `docs/SEO.md` (URL rules, metadata, JSON-LD, sitemaps, content plan) — mandatory for every public route.

### 7.1 Public (SSG/ISR, `/[locale]/…`, slugs localized via `packages/shared/i18n/routes.ts`)
- Home; specialty pages (`/dental-implants-georgia`), procedure pages with price ranges, procedure × source-country pages (`/…/from-uk`), price pages, comparison pages (Georgia vs Turkey), clinic and doctor profiles, patient stories, city guide for patients, how it works, guarantee, FAQ, blog, free quote (request flow).
- Sensitive section (addiction) in its own route group with no pixels.

### 7.2 Patient area `/account`
- Cases list → case detail: status timeline, files checklist, offers comparison, payments, itinerary, messages, follow-up forms, consents & shares.

### 7.3 Clinic portal `/clinic` (ka/en/ru)
- Inbox of shared cases, case viewer (files viewer for images/PDF), offer builder (pre-filled from price list), visit calendar, final amounts, invoices, profile/doctors/prices.

### 7.4 Coordinator console `/console`
- Kanban by case status with SLA badges, case detail with inbox, tasks, trip builder, clinic selector, triage queue.

### 7.5 Admin `/admin`
- Clinics vetting checklist (license, insurance, warranty policy, site visit date, contract file), catalog, commission rules, invoices, content, reviews moderation, users/permissions, analytics, audit.

### 7.6 SEO
- SSR/SSG, hreflang (+ `x-default`), canonical, per-locale sitemaps, robots, RTL for `he`/`ar`.
- JSON-LD: `MedicalClinic`, `Physician`, `MedicalProcedure` (with price range as `offers` where allowed), `FAQPage`, `Article` (author doctor + `dateModified`), `BreadcrumbList`; reviews only from verified cases.
- Dynamic OG images; Core Web Vitals: LCP < 2.5 s mobile, CLS < 0.1.
- Authenticated areas `noindex`.

---

## 8. Security and privacy

- Medical file encryption: per-file random 256-bit data key, AES-256-GCM; data key wrapped with master key (`FILE_MASTER_KEY`, version tracked) and stored on `CaseFile`. Streaming decrypt on download. Thumbnails for images generated server-side, encrypted the same way.
- Malware scan uploads (ClamAV container) before they become visible to clinics.
- Field encryption via one `CryptoService` (questionnaire answers, complication descriptions, staff medical notes).
- Staff and clinic accounts: TOTP 2FA mandatory, session timeout 12 h, IP and device in audit.
- Signed, short-lived download URLs only from the API proxy; S3 buckets private; no public listing.
- Security headers, CSRF for cookie auth, rate limits on auth/upload/request endpoints, webhook signature verification.
- Backups daily (30 days), monthly restore test; hosting region decided with legal counsel.

---

## 9. Background jobs

| Queue | Jobs |
| --- | --- |
| `notifications` | case created, offer received, offer accepted, deposit paid, pre-arrival 7d/1d, pickup day-of, visit reminders, follow-up 7/30/90d |
| `sla` | evaluate SLA timers → tasks |
| `files` | encrypt/scan/thumbnail pipeline |
| `inbox` | inbound processing, outbound send with retries |
| `billing` | monthly invoice drafts |
| `maintenance` | expire offers, purge tokens, retention purge, metrics rollup |

Jobs are idempotent and keyed by entity + type.

---

## 10. Analytics

First-party events: `page_view`, `request_start`, `files_uploaded`, `request_submitted`, `offer_sent`, `offer_accepted`, `deposit_paid`, `arrived`, `treated`, `review_submitted`. No health details in properties; for sensitive specialties no specialty/procedure in properties at all. Marketing pixels only after consent and never on sensitive pages. Funnel report by channel, locale, country, specialty.

---

## 11. Environment variables (initial)

```
DATABASE_URL, REDIS_URL
JWT_ACCESS_SECRET, JWT_REFRESH_SECRET
DATA_ENCRYPTION_KEY, DATA_ENCRYPTION_KEY_VERSION, FILE_MASTER_KEY, FILE_MASTER_KEY_VERSION
S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY, S3_SECRET_KEY
EMAIL_PROVIDER, EMAIL_API_KEY, EMAIL_FROM, INBOUND_EMAIL_SECRET
TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET
WHATSAPP_TOKEN, WHATSAPP_PHONE_ID, WHATSAPP_VERIFY_TOKEN
PAYMENT_PROVIDER, PAYMENT_API_KEY, PAYMENT_WEBHOOK_SECRET
GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
CLAMAV_HOST
WEB_BASE_URL, API_BASE_URL
```

---

## 12. Out of scope for MVP

Embedded video consultations with doctors (free coordinator calls use external WhatsApp/phone/Meet links), partner and facilitator portals, financing, insurance sales, mobile app, AI summaries/translation, `ar`/`de` locales, addiction treatment section (M8).

## 13. Open decisions (use defaults, log in DECISIONS.md)

- Brand name, domain, localized slugs (marketer).
- Payment gateway (BOG / TBC / own PSP).
- Deposit size and refund policy per specialty.
- Commission rates per clinic/specialty (negotiation).
- Medical file retention period and hosting region (legal counsel).
- Addiction section: legal review and admission criteria (clinical partner + counsel).
