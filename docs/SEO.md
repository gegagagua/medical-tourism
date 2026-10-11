# SEO — strategy and implementation

Search is the cheapest long-term patient channel and the only scalable one for sensitive specialties where paid ads
are restricted. This file is both the strategy (for the marketer) and the implementation contract (for Claude Code).

---

## 1. Keyword architecture

Patients search in three intents. Every page targets exactly one primary intent.

| Intent | Example queries (en / ru / he) | Page type |
| --- | --- | --- |
| Commercial — procedure abroad | "dental implants abroad", "имплантация зубов за границей", "השתלות שיניים בחו״ל" | Specialty / procedure page |
| Commercial — destination | "dental implants Georgia cost", "имплантация зубов Грузия цена", "השתלות שיניים בגאורגיה מחיר" | Procedure page (Georgia in title) + prices page |
| Commercial — from my country | "dental implants abroad from UK", "Georgia vs Turkey dental implants" | Procedure × country page, comparison page |
| Informational | "all on 4 vs all on 6", "how long after implants can I fly", "FUE vs DHI" | Blog article → links to procedure page |
| Navigational | clinic and doctor names | Clinic / doctor profiles |

Priority order follows the business: dentistry → hair transplant → dermatology → addiction (separate section,
launched only after legal review).

Keyword research is done per locale by the marketer with a tool (Ahrefs/Semrush/Google Keyword Planner) and recorded
in the CMS as each page's `primaryKeyword` and `secondaryKeywords`; pages are built from that list, not guessed.

## 2. URL rules

- `/{locale}/{localized-slug}` — locale always present (`en`, `ru`, `he`; later `ar`, `de`). `/` redirects by
  `Accept-Language` with a visible switcher; crawlers get `x-default` → `/en`.
- Slugs are lowercase, hyphenated, transliterated for `ru` (`implantaciya-zubov-gruziya`), Hebrew slugs in Latin
  transliteration to avoid encoded URLs.
- Hierarchy:
  - `/{l}/{specialty}` — e.g. `/en/dental-treatment-georgia`
  - `/{l}/{procedure}` — e.g. `/en/dental-implants-georgia`
  - `/{l}/{procedure}/from-{country}` — e.g. `/en/dental-implants-georgia/from-uk`
  - `/{l}/prices`, `/{l}/prices/{specialty}`
  - `/{l}/compare/georgia-vs-turkey-{procedure}`
  - `/{l}/clinics/{slug}`, `/{l}/doctors/{slug}`
  - `/{l}/stories/{slug}`, `/{l}/blog/{slug}`
  - `/{l}/tbilisi-guide`, `/{l}/how-it-works`, `/{l}/faq`
- Slug map lives in `packages/shared/i18n/routes.ts`; changing a published slug requires a 301 in `redirects` table.

## 3. Page templates — on-page requirements

| Element | Rule |
| --- | --- |
| `<title>` | ≤ 60 chars: `{Procedure} in Tbilisi, Georgia — prices from {min} | {Brand}` (localized) |
| Meta description | ≤ 155 chars, includes price range and the coordinator promise |
| `h1` | One per page, matches primary keyword naturally |
| Intro | First 100 words answer the query directly (price range, visits, days) |
| Body | Doctor-reviewed; author + reviewed date shown at top; sections in question form where natural |
| Prices | Real ranges from DB with currency and "updated {date}" |
| Internal links | Specialty ↔ procedures ↔ procedure × country ↔ clinics ↔ stories ↔ blog (see §6) |
| CTA | "Get my plan" + "Book a free call" above the fold and at the end |
| Images | WebP/AVIF via `next/image`, descriptive `alt`, width/height set, lazy below fold |

Thin-content guard: a procedure × country page is published only if it has country-specific content (home price
range with source, travel time/flights note, at least one relevant story or FAQ). Otherwise it is not generated.

## 4. Technical SEO (Next.js App Router)

- Public routes are SSG with ISR (`revalidate` 1 h for prices, 24 h for content); revalidate on CMS publish via
  `revalidateTag`.
- `generateMetadata` on every public route: title, description, canonical, `alternates.languages` for every locale
  that has a published translation + `x-default`, Open Graph and Twitter cards, `robots`.
- `app/sitemap.ts` → sitemap index + one sitemap per locale, `lastModified` from content `updatedAt`, only
  published and indexable pages.
- `app/robots.ts`: disallow `/account`, `/clinic`, `/console`, `/admin`, `/api`, search/filter query variants.
- Hreflang must be reciprocal; pages without a translation are omitted from alternates (never point to a fallback).
- RTL: `<html lang="he" dir="rtl">`.
- Canonicals strip UTM and filter params.
- Core Web Vitals budget (mobile, p75): LCP < 2.5 s, INP < 200 ms, CLS < 0.1. JS on content pages ≤ 120 KB gzipped;
  the ticket estimator and booking sheet load as client islands.
- Fonts self-hosted through `next/font`, subset per locale, `display: swap`.
- 404 and 410 for removed content; redirects stored in DB and applied in middleware.
- Pagination for blog lists with `rel` links in metadata; no infinite scroll without paginated URLs.
- OG images via `next/og` using the `Ticket` `og` variant.

## 5. Structured data (JSON-LD helpers in `apps/web/src/lib/seo/jsonld.ts`)

| Page | Types |
| --- | --- |
| All | `Organization` (name, logo, contact point with languages), `WebSite` |
| Specialty / procedure | `MedicalProcedure` (name, description, `howPerformed`, `preparation`, `followup`), `FAQPage`, `BreadcrumbList` |
| Prices | `ItemList` of `Offer`s with `priceSpecification` ranges per procedure (clinic as `seller`) |
| Clinic | `MedicalClinic` (address, geo, `medicalSpecialty`, `availableService`), `AggregateRating` only from verified reviews |
| Doctor | `Physician` (name, `medicalSpecialty`, `knowsLanguage`, `worksFor` clinic) |
| Blog / story | `Article` / `MedicalWebPage` with `author` (Physician), `reviewedBy`, `lastReviewed`, `datePublished`, `dateModified` |
| Booking call | none (not indexable) |

Example (procedure page):

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "name": "Dental implants in Tbilisi",
  "procedureType": "https://schema.org/SurgicalProcedure",
  "bodyLocation": "Jaw",
  "howPerformed": "Titanium implant placed in the jawbone, crown fitted after healing.",
  "followup": "Second visit for the crown after the healing period set by the dentist.",
  "url": "https://example.com/en/dental-implants-georgia"
}
```

Validate every template with the Rich Results Test and Schema.org validator in CI (snapshot the JSON-LD output in
unit tests).

## 6. Internal linking model

```
Home ─┬─ Specialty ─┬─ Procedure ─┬─ Procedure × country
      │             │             ├─ Prices (anchor)
      │             │             └─ Compare Georgia vs Turkey
      │             └─ Clinics for specialty ── Clinic ── Doctors
      ├─ Stories (linked from procedure + country pages)
      └─ Blog (each article links to 1 procedure + 1 clinic or story)
```

- Breadcrumbs on every page below home.
- Footer: specialties, top procedures, prices by country, legal.
- Anchor text = target page's topic, never "click here".

## 7. Trust signals (YMYL — health topics are judged strictly)

- Every medical text: named doctor author or reviewer, credentials, `reviewedAt` date visible.
- Clinic pages: licence number, checks passed with dates, warranty policy.
- About page: company, address, people, "we are an organiser, not a clinic" statement.
- Reviews only from completed cases, labelled "Verified treatment".
- Sources cited for prices of other countries.

## 8. Content plan (first 90 days)

| Month | en | ru | he |
| --- | --- | --- | --- |
| 1 | Dental specialty + implants + All-on-4 + veneers pages; prices; how it works; Georgia vs Turkey (dental) | Same set | Implants + prices + how it works |
| 2 | Procedure × country: UK, Germany, Israel; 4 blog posts (flying after implants, All-on-4 vs All-on-6, implant brands, what's in the price) | Procedure × country: Germany, Israel, Kazakhstan; 4 posts | 2 posts |
| 3 | Hair transplant specialty + FUE/DHI + prices; 2 stories; Tbilisi guide | Same | Hair transplant page |

Cadence after launch: 2 posts/week in `en`+`ru`, 1/week in `he`. Each post: doctor-reviewed, 1,200–2,000 words,
one procedure CTA, one internal link to prices.

## 9. Local and off-site

- Google Business Profile for the Tbilisi office (address, hours, languages, photos).
- Clinic partners link to their profile page on the platform.
- Listings on medical-tourism directories and Georgian tourism resources.
- Digital PR: price-comparison study (Georgia vs UK/DE/IL) published yearly — linkable asset.
- Diaspora media and Telegram channels (non-link value, brand searches).

## 10. Measurement

- Google Search Console per locale property; Bing Webmaster Tools.
- First-party funnel (SPEC §10) joined with landing page → requests and bookings per page.
- Monthly report: impressions/clicks by page type and locale, top queries, CWV, indexed pages vs sitemap, requests and
  calls booked from organic.
- Sensitive section: rankings tracked, no behavioural pixels.

## 11. Implementation checklist (Claude Code)

- [ ] `routes.ts` slug map with type-safe `href()` helper
- [ ] `generateMetadata` helper `buildMetadata({ page, locale, alternates })`
- [ ] `jsonld.ts` helpers + unit snapshots
- [ ] `sitemap.ts`, `robots.ts`, redirects middleware
- [ ] OG image route using `Ticket` `og` variant
- [ ] Thin-content guard for procedure × country pages
- [ ] CMS fields: `primaryKeyword`, `secondaryKeywords`, `seoTitle`, `seoDescription`, `reviewedByDoctorId`, `reviewedAt`
- [ ] Lighthouse CI on 5 representative URLs per locale
