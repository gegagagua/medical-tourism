# DESIGN — visual system and page plans

Applies to the public site and the patient area. The clinic portal, coordinator console and admin reuse the tokens
and components but in a denser "work" layout (§9). The Claude Code skill `.claude/skills/medtour-design/SKILL.md`
enforces this document when building UI.

---

## 1. Brief

- **Subject:** organised medical trips to Georgia — dental work first, then hair transplant, skin, addiction treatment.
- **Audience:** adults 30–65 in the UK, Israel, Germany, the Russian-speaking diaspora and the Gulf, comparing
  "do it at home" against "go abroad". Often anxious about quality, scams and complications. Many browse on phones.
- **Primary job of the site:** turn a worried price-comparer into a person who either uploads an X-ray for a plan
  or books a free call with a coordinator.
- **What must be felt in 5 seconds:** the price difference is real, someone named will look after me, and the
  clinics are checked.

## 2. Concept: "the treatment ticket"

Medical tourism is two trips stacked together: a flight and a treatment. The signature element of the brand is a
**ticket** — a boarding-pass-shaped card that combines both: home airport → TBS, the procedure lines, the price at home
crossed against the price in Georgia, nights in Tbilisi, and the coordinator's name.

It appears in three places and nowhere else:
1. the hero estimator on the landing page (interactive),
2. the patient's accepted offer and itinerary (real data),
3. social/OG images (static render).

Everything around the ticket stays quiet: clean cool paper, plain type, generous space. One loud object, a calm room.

## 3. Tokens

### 3.1 Colour

| Token | Hex | Use |
| --- | --- | --- |
| `--paper` | `#F6F8F7` | Page background (cool, mineral — not cream) |
| `--surface` | `#FFFFFF` | Ticket body, forms, inputs |
| `--ink` | `#16242C` | Text, icons, primary outlines (deep slate blue) |
| `--ink-muted` | `#55656D` | Secondary text, captions |
| `--balcony` | `#2E6B66` | Brand colour — the verdigris of Tbilisi's carved wooden balconies. Links, selected states, headings accents via weight not colour |
| `--mineral` | `#D3E6DF` | Quiet tinted areas (stats band, selected rows), the "Georgia" side of comparisons |
| `--saffron` | `#E2A12B` | The one action colour: "Book a free call" and "Get my plan" buttons, ticket perforation dots. Never decorative |
| `--alert` | `#B3261E` | Errors and urgent states only |
| `--line` | `#D9E1DE` | Hairlines, input borders |

Dark mode: `--paper #0F1A1F`, `--surface #16242C`, `--ink #E8EFEC`, `--ink-muted #9FB0B6`, `--balcony #6FB3AC`,
`--mineral #1F3833`, `--saffron #F0B547`, `--line #2A3B42`.

Contrast: body text ≥ 7:1 on paper; saffron buttons carry `--ink` text (not white) to stay ≥ 4.5:1.

### 3.2 Typography

Multilingual coverage decides the families: the site ships in English, Russian, Hebrew (RTL), later Arabic (RTL),
and the clinic portal in Georgian.

| Role | Family | Why |
| --- | --- | --- |
| Display (Latin, Cyrillic) | **Unbounded** 500/600 | Wide, rounded, geometric — reads as travel signage and tickets; distinctive without being clinical. Used only for hero headline, section titles and the ticket's big numbers |
| Text, UI, all scripts | **FiraGO** 400/500/600 | One family covering Latin, Cyrillic, Georgian, Hebrew and Arabic, so every locale looks related |
| Display fallback for `he`/`ar`/`ka` | FiraGO 600 | Unbounded has no Hebrew/Arabic/Georgian glyphs |

Load with `next/font` (self-hosted, `display: swap`, subsets per locale).

Scale (1.25 ratio, 16 px base; rem):

| Step | Size / line-height | Use |
| --- | --- | --- |
| `display-xl` | 3.5 / 1.05 (mobile 2.4) | Hero headline only |
| `display-l` | 2.5 / 1.1 (mobile 1.9) | Section titles |
| `title` | 1.56 / 1.25 | Card and block titles |
| `lead` | 1.25 / 1.5 | Intro paragraphs |
| `body` | 1 / 1.6 | Text |
| `small` | 0.875 / 1.5 | Captions, helper text |
| `ticket-figure` | 2 / 1 tabular figures | Prices on the ticket |

Rules: sentence case everywhere; no all-caps labels; no single highlighted word inside headlines; line length 45–75
characters; prices always tabular figures; currency symbol in the locale's position (`Intl.NumberFormat`).

### 3.3 Space, shape, depth

- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding 96 desktop / 64 mobile.
- Grid: 12 columns, max width 1200, gutter 24; text column max 680.
- Radius by hierarchy, not one value for everything: inputs and buttons 10, tinted panels 16, the ticket 24 with
  semicircle notches; photos 0 (full-bleed) or 16 when inset.
- Shadows: none on cards. The ticket alone gets a long soft shadow (`0 24px 48px -24px rgba(22,36,44,.35)`).
- Icons: Lucide, 1.5 px stroke, `--ink`.

### 3.4 Motion

- One orchestrated moment: on first load the ticket "prints" — its lines fill in top to bottom in ~600 ms.
- Responsive motion only otherwise: accordion open, step change in forms, price recalculation (number tween 250 ms).
- `prefers-reduced-motion`: everything instant.

## 4. Imagery

- Real photography only: clinic rooms, named doctors, coordinators at the airport, Tbilisi streets the patient will
  actually walk. No stock "smiling patient in white" images, no 3D teeth renders in the hero.
- Before/after photos only with `PUBLIC_MEDIA` consent; shown in a dedicated comparison slider, never in ads-like grids.
- Sensitive section (addiction): no faces of patients, landscapes and interiors only.

## 5. Landing page (`/[locale]`, and per-specialty landings like `/[locale]/dental-implants-georgia`)

Left-aligned throughout (right-aligned mirror in RTL). Mobile order follows the numbering below.

```
┌──────────────────────────────────────────────────────────────────────┐
│ logo        Dental  Hair  Skin  Prices  Clinics  How it works   [EN] │
│                                          [Book a free call]          │
├──────────────────────────────────────────────────────────────────────┤
│ 1 HERO                                                               │
│ Dental implants in Tbilisi,          ┌────────────── TICKET ───────┐ │
│ planned before you fly.              │ From [London ▾] → Tbilisi   │ │
│ Fixed price from a checked clinic,   │ Treatment [4 implants ▾]    │ │
│ one coordinator from airport to      │ At home      £10,800        │ │
│ follow-up.                           │ In Georgia   $3,900  ◦◦◦◦◦◦ │ │
│ [Get my plan]  [Book a free call]    │ Stay         6 nights       │ │
│ ✓ 2 checked clinics  ✓ written       │ Coordinator  Nino           │ │
│   warranty  ✓ English/Russian/Hebrew │ [Get my exact plan]         │ │
│                                      └─────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────┤
│ 2 PRICE TABLE  procedure | your country | Georgia | what's included  │
├──────────────────────────────────────────────────────────────────────┤
│ 3 HOW IT WORKS (a real sequence → numbered)                          │
│ 1 Send photos/X-ray → 2 Get plans from 1–3 clinics → 3 Pay deposit   │
│ → 4 We meet you at TBS → 5 Treatment → 6 Follow-up at home           │
├──────────────────────────────────────────────────────────────────────┤
│ 4 CLINICS: how we check them (checklist) + 2–3 clinic portraits      │
├──────────────────────────────────────────────────────────────────────┤
│ 5 YOUR COORDINATOR: photo, name, languages, WhatsApp + calendar      │
│   inline booking widget (pick a 15-min slot)                         │
├──────────────────────────────────────────────────────────────────────┤
│ 6 PATIENT STORIES: 2 long stories with photos, not a carousel        │
├──────────────────────────────────────────────────────────────────────┤
│ 7 TBILISI WHILE YOU HEAL: what a 6-night stay looks like (map strip) │
├──────────────────────────────────────────────────────────────────────┤
│ 8 GEORGIA OR TURKEY? honest comparison table                         │
├──────────────────────────────────────────────────────────────────────┤
│ 9 FAQ (accordion, FAQPage schema)                                    │
├──────────────────────────────────────────────────────────────────────┤
│ 10 CLOSING: ticket again (static) + both CTAs                        │
│ footer: specialties, prices by country, legal, "we are not a clinic" │
└──────────────────────────────────────────────────────────────────────┘
```

Section notes:
- **Hero copy** names the procedure and the city, not a slogan. Specialty landings swap headline, ticket defaults and
  price table. Home page hero uses dentistry (priority 1) with a specialty switcher on the ticket.
- **Ticket estimator:** inputs = home country/city + procedure + quantity. Output = indicative home price range
  (from content table, cited), Georgia range (from `ClinicProcedurePrice` min/max across active clinics), nights
  (`typicalStayDays`), saving range. Clearly labelled "Estimate — your exact plan comes from the clinic after
  reviewing your X-ray." CTA pre-fills the request form with the ticket's choices.
- **Price table:** real numbers only. Small procedures (extraction $60, filling $80, cleaning $50) are listed as
  "add during your visit", not as reasons to travel.
- **Booking widget (section 5 and header button):** a sheet/modal with: choose call type (WhatsApp video, phone,
  Google Meet) → pick a slot in *your* time zone (Tbilisi time shown beside it) → name, email, phone, language,
  procedure of interest → consent → confirmation screen with calendar file. Max 3 steps.
- **Turkey comparison:** honest — Turkey can be cheaper; Georgia's case is fewer patients per clinic, a named
  coordinator, written warranty and a calmer stay. Honesty here is the brand.

## 6. Other public pages

| Page | Layout |
| --- | --- |
| Specialty | Hero with specialty ticket → procedures list (name, unit, Georgia range) → clinics for this specialty → stories → FAQ |
| Procedure | What it is (doctor-reviewed) → who it suits → steps and visits (timeline drawn as a line, not cards) → prices → recovery in Tbilisi → FAQ → plan CTA |
| Procedure × country | Same as procedure, with home-country prices, flight time, direct-flight note, patient stories from that country |
| Clinic profile | Photo band → checks passed (checklist with dates) → doctors → price list → reviews → location |
| Doctor profile | Portrait, credentials, languages, procedures, reviewed articles |
| Prices | One searchable table by specialty; filters for home country; download as PDF |
| How it works | The six-step sequence in full, deposit and refund rules, what is and isn't included |
| Story | Long-form article with photos (consented), timeline of the trip, the ticket rendered from the real case |
| Blog | Article template: 680 px column, author doctor + reviewed date at top, related procedure CTA at end |
| Request (Get my plan) | 5 steps with progress bar; file upload with camera; autosave; works with one thumb |

## 7. Components (shadcn/ui based, restyled with tokens)

`Ticket` (interactive / static / itinerary variants) · `PriceRange` · `PriceTable` · `CountrySelect` ·
`ProcedureSelect` · `StepSequence` · `ClinicCheckList` · `CoordinatorCard` · `BookingSheet` (slot picker) ·
`FileDropzone` (camera, progress, per-file status, encrypted-upload notice) · `StoryCard` · `FAQAccordion` ·
`ComparisonTable` · `LocaleSwitcher` · `Header` / `Footer` · `Toast` · `EmptyState`.

Each component: RTL-safe (logical properties `ms-/me-/ps-/pe-`, mirrored arrows), keyboard reachable, visible focus
ring (2 px `--balcony` + 2 px offset), tested in `ru` (long words) and `he` (RTL).

## 8. Voice

- Plain, specific, calm. Say what happens: "Upload your X-ray", "Book a 15-minute call", "Your plan is ready".
- Numbers over adjectives: "6 nights, 2 visits, 5-year implant warranty", not "fast and affordable".
- Never promise medical outcomes. Clinical claims belong to named doctors on reviewed pages.
- Errors say what to do: "This file is over 25 MB. Upload a smaller photo or a PDF."

## 9. Work surfaces (clinic portal, coordinator console, admin)

Same tokens, denser: 14 px base, 8 px rhythm, tables first, no display font except page titles, saffron only for
the primary action on a screen. Case status colours: neutral for in-progress, `--balcony` for won, `--alert` for
overdue SLA only.

## 10. Quality floor (checked before a page is "done")

- Lighthouse mobile: performance ≥ 90, accessibility ≥ 95, SEO ≥ 95.
- Works at 360 px wide; no horizontal scroll; tap targets ≥ 44 px.
- Reduced motion, keyboard navigation, screen-reader labels for the ticket's computed values.
- Screenshots reviewed in `en`, `ru`, `he`, light and dark.
