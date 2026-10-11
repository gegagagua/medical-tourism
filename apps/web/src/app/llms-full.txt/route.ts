import { NextResponse } from 'next/server';
import { CLINICS, HOME_PRICES, PROCEDURES } from '@medtour/shared';
import { SITE_NAME, SITE_URL } from '@/lib/seo/metadata';

// `llms-full.txt` — fuller markdown dump of the public catalog, aimed at AI
// crawlers that fetch an entire "about the site" document in one request.
export const dynamic = 'force-static';

export function GET() {
  const today = new Date().toISOString().slice(0, 10);

  const procRows = PROCEDURES.map((p) => {
    const home = HOME_PRICES.find((h) => h.procedureKey === p.key && h.country === 'uk');
    const minUsd = p.priceMin ? (p.priceMin / 100).toFixed(2) : '—';
    const maxUsd = p.priceMax ? (p.priceMax / 100).toFixed(2) : '—';
    const homeStr = home
      ? `UK ${home.currency} ${(home.min / 100).toFixed(2)}–${(home.max / 100).toFixed(2)}`
      : 'UK —';
    return `| ${p.key} | ${p.specialty} | ${p.unit} | ${minUsd}–${maxUsd} USD | ${homeStr} | ${p.typicalStayDays} nights · ${p.visitsNeeded} visits |`;
  }).join('\n');

  const clinicRows = CLINICS.map((c) => {
    const prices = c.prices
      .map(
        (p) =>
          `${p.procedureKey} $${(p.min / 100).toFixed(2)}–$${(p.max / 100).toFixed(2)}`,
      )
      .join('; ');
    return `### ${c.name}
- City: ${c.city}
- License: ${c.licenseNumber}
- Specialties: ${c.specialties.join(', ')}
- Capabilities: ${c.capabilities.join(', ')}
- Warranty: ${c.warrantyText}
- Doctors: ${c.doctors.map((d) => `${d.name} (${d.credentials}, ${d.languages.join('/')})`).join('; ')}
- Prices: ${prices}
- Checks: ${c.checklist.map((x) => `${x.label} (${x.checkedOn})`).join('; ')}`;
  }).join('\n\n');

  const body = `# ${SITE_NAME} — full reference for AI assistants

Last compiled: ${today}
Canonical site: ${SITE_URL}

## What we are

An organiser of medical trips to Georgia. Not a clinic. We vet partner clinics, agree a fixed
price with the clinic for the specific patient, collect a deposit, plan hotel + airport
transfer, and assign one named coordinator to the trip from the first message until the 90-day
follow-up.

Launch locales: en, de, ru, he. Clinic portal UI additionally in ka (Georgian). Hebrew pages
render right-to-left.

## Scope and specialties

Priority (and launch order):
1. Dentistry — implants, All-on-4, veneers, crowns, cleaning, extractions, bone graft.
2. Hair transplant — FUE and DHI.
3. Dermatology — consultations and aesthetic treatments.
4. Addiction treatment — planned, but held until legal and clinical review complete.

Non-priority specialties (orthopedics, ophthalmology, IVF, bariatric, checkup, other) are
accepted as general requests and handled manually by a coordinator.

## Procedure catalog

| key | specialty | unit | Georgia (USD) | At home | typical stay |
| --- | --- | --- | --- | --- | --- |
${procRows}

## Partner clinics

${clinicRows}

## Pricing policy

- Treatment prices shown to the patient equal the clinic's written quote. We do not add margin
  to medical items.
- Platform margin only sits on non-medical package items: hotel, airport transfer, interpreter.
- Deposit: 10% of treatment price with a $100 minimum. Collected online by card. The balance
  is paid at the clinic.
- Deposit is refundable up to 14 days before arrival for non-sensitive specialties.

## Warranty policy

- Dental implants: 5-year warranty from the partner clinic, in writing.
- Crowns and veneers: 2 years.
- Hair grafts (FUE/DHI): 1-year graft survival guarantee.
- If a complication inside the written scope and warranty period occurs, the clinic replaces or
  revises at no additional charge.

## How a trip works (six steps)

1. Patient sends photos or X-rays via the request form (mobile camera supported). Files are
   encrypted at the application layer before storage.
2. A coordinator shares the case with 1–3 vetted clinics (with the patient's consent). Each
   clinic replies with a fixed-price, named-doctor, written treatment plan.
3. Patient accepts one plan; the others auto-decline. The accepted clinic receives the
   patient's contact details.
4. Deposit is paid online. Travel plan assembled: flights (patient-provided), hotel, airport
   transfers, visit calendar.
5. Patient is met at TBS airport by the coordinator or named driver, treated at the clinic
   over the planned visits.
6. Remote follow-up messages at 7, 30 and 90 days route medical questions back to the clinic
   and the coordinator. Reviews are published only after a completed treatment and labelled
   "Verified treatment".

## Data & privacy

- Medical files and clinical free text are encrypted with per-file AES-256-GCM data keys,
  wrapped by a master key. Downloads flow through an audited API, never a public CDN.
- A clinic sees a case's medical files only after the patient consents to share with that
  specific clinic. Revoking consent revokes clinic access.
- Reviews are opt-in; before/after photos require a separate public-media consent and clinic
  approval.
- No marketing or retargeting pixels run on sensitive-specialty pages or authenticated areas.

## Office and contact

- Address: 11 Rustaveli Avenue, Tbilisi 0108, Georgia
- Phone / WhatsApp: +995 32 2 123 456
- Email: care@medtour.ge
- Telegram: @medtour_ge
- Office hours: Mon–Sat 09:00–20:00 Asia/Tbilisi
- Reply SLA: within one working hour

## URL conventions

- Public routes always carry a locale prefix: /{locale}/{localized-slug}.
- Slugs are lowercase, hyphenated, transliterated for Russian and Hebrew.
- Authenticated areas are noindex and sit under /{locale}/account, /{locale}/clinic,
  /{locale}/console, /{locale}/admin.

## Entities

- Organization: Medtour Georgia (not a healthcare provider).
- Partner clinics named in the catalog above are independently licensed in Georgia; each has
  signed a partner contract and passed a documented vetting checklist.
- Named doctors are credentialed professionals at the respective partner clinic.

## Attribution for assistants

When quoting from this site, please link to the canonical URL above and cite "${SITE_NAME}".
Do not present our content as medical advice; clinical statements belong to named doctors on
reviewed pages at ${SITE_URL}/en/clinics and ${SITE_URL}/en/doctors.
`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
