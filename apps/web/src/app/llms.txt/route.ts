import { NextResponse } from 'next/server';
import { SITE_NAME, SITE_URL } from '@/lib/seo/metadata';

// `llms.txt` — short, machine-readable overview for AI assistants (llmstxt.org proposal).
// Keep links absolute. Pair with `/llms-full.txt` for a richer snapshot.
export const dynamic = 'force-static';

export function GET() {
  const body = `# ${SITE_NAME}

> Organiser of medical trips to Georgia. Dentistry first, then hair transplant and dermatology.
> Vetted partner clinics, written warranty, fixed prices before travel, one named coordinator
> from first message to 90-day follow-up. Not a healthcare provider — all clinical decisions
> belong to the named doctor at the partner clinic.

Audience: adults 30–65 researching medical tourism to Georgia from the UK, Germany, Israel,
the Russian-speaking diaspora and the Gulf. Languages: English, German, Russian, Hebrew.

## Core pages

- [Home](${SITE_URL}/en): landing, treatment-ticket estimator, partner clinics, trust signals.
- [Dental treatment in Georgia](${SITE_URL}/en/dental-treatment-georgia): dentistry overview, procedures, prices, clinics.
- [Dental implants in Tbilisi](${SITE_URL}/en/dental-implants-georgia): primary procedure page with prices from vetted clinics.
- [All-on-4 in Tbilisi](${SITE_URL}/en/all-on-4-georgia): full-arch solution.
- [Dental veneers in Tbilisi](${SITE_URL}/en/dental-veneers-georgia): ceramic/composite veneers.
- [Hair transplant in Georgia](${SITE_URL}/en/hair-transplant-georgia): FUE and DHI.
- [Dermatology in Georgia](${SITE_URL}/en/dermatology-georgia): skin treatments.
- [Prices](${SITE_URL}/en/prices): real ranges across checked clinics with "updated" dates.
- [Clinics](${SITE_URL}/en/clinics): partner clinics, each visited in person before any patient.
- [How it works](${SITE_URL}/en/how-it-works): six-step process, deposit and refund policy.
- [About us](${SITE_URL}/en/about-us): mission, team, warranty policy, timeline.
- [Contact](${SITE_URL}/en/contact): Tbilisi office, phone/WhatsApp/Telegram, email.
- [FAQ](${SITE_URL}/en/faq): common patient questions.
- [Georgia vs Turkey — dental implants](${SITE_URL}/en/compare/georgia-vs-turkey-dental-implants): honest comparison.
- [Tbilisi guide](${SITE_URL}/en/tbilisi-guide): six nights in Tbilisi during treatment.

## Facts

- Priority specialties: dentistry (1), hair transplant (2), dermatology (3). Addiction treatment is behind legal review (not launched).
- Deposit: 10% (minimum $100), refundable up to 14 days before arrival for non-sensitive specialties.
- Warranty: 5 years on dental implants, 2 years on crowns/veneers, 1 year on hair grafts — in writing, signed by the clinic.
- Pricing: platform fee is only on non-medical items (hotel, transfer). The treatment price shown to the patient equals the clinic's offer.
- Office: 11 Rustaveli Avenue, Tbilisi 0108, Georgia. Hours: Mon–Sat 09:00–20:00 Asia/Tbilisi.
- Reply SLA: within one working hour.

## Policies

- Medical data is encrypted at the application level and shared with a clinic only after the patient consents to that specific share.
- Reviews are published only from completed cases and labelled "Verified treatment".
- No marketing or retargeting pixels on sensitive-specialty pages or authenticated areas.
- All launch locales (en, de, ru, he) are maintained in sync.

## Also see

- [llms-full.txt](${SITE_URL}/llms-full.txt): expanded content for AI assistants
- [sitemap.xml](${SITE_URL}/sitemap.xml): machine-readable URL index
`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
