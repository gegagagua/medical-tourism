import type { Currency, SourceCountry } from '../enums';

// HomePriceReference — SPEC §4.13. Procedure × country indicative range used in the Ticket's
// "at home" side. Shown only with its source and checked date.
export interface HomePriceRef {
  procedureKey: string;
  country: SourceCountry;
  min: number; // minor units in `currency`
  max: number;
  currency: Currency;
  sourceUrl: string;
  checkedOn: string; // ISO date
}

export const HOME_PRICES: HomePriceRef[] = [
  // dental implants per implant, retail
  {
    procedureKey: 'dental-implants',
    country: 'uk',
    min: 200000,
    max: 300000,
    currency: 'GBP',
    sourceUrl: 'https://www.bupa.co.uk/dental/dental-care/treatments/dental-implants',
    checkedOn: '2026-09-01',
  },
  {
    procedureKey: 'dental-implants',
    country: 'de',
    min: 180000,
    max: 350000,
    currency: 'EUR',
    sourceUrl: 'https://www.zahnarzt-kosten.de/implantat',
    checkedOn: '2026-09-01',
  },
  {
    procedureKey: 'dental-implants',
    country: 'il',
    min: 550000,
    max: 950000,
    currency: 'USD',
    sourceUrl: 'https://www.health.gov.il',
    checkedOn: '2026-09-01',
  },
  // all-on-4 per arch
  {
    procedureKey: 'all-on-4',
    country: 'uk',
    min: 1200000,
    max: 2000000,
    currency: 'GBP',
    sourceUrl: 'https://www.bupa.co.uk',
    checkedOn: '2026-09-01',
  },
  {
    procedureKey: 'all-on-4',
    country: 'de',
    min: 1300000,
    max: 2200000,
    currency: 'EUR',
    sourceUrl: 'https://www.zahnarzt-kosten.de',
    checkedOn: '2026-09-01',
  },
  // veneers per tooth
  {
    procedureKey: 'veneers',
    country: 'uk',
    min: 50000,
    max: 100000,
    currency: 'GBP',
    sourceUrl: 'https://www.bupa.co.uk',
    checkedOn: '2026-09-01',
  },
  // hair transplant (per graft)
  {
    procedureKey: 'fue',
    country: 'uk',
    min: 400,
    max: 700,
    currency: 'GBP',
    sourceUrl: 'https://www.nhs.uk/conditions/cosmetic-procedures/hair-transplant/',
    checkedOn: '2026-09-01',
  },
  {
    procedureKey: 'fue',
    country: 'de',
    min: 300,
    max: 700,
    currency: 'EUR',
    sourceUrl: 'https://www.haartransplantation.de',
    checkedOn: '2026-09-01',
  },
  {
    procedureKey: 'dhi',
    country: 'uk',
    min: 500,
    max: 900,
    currency: 'GBP',
    sourceUrl: 'https://www.nhs.uk/conditions/cosmetic-procedures/hair-transplant/',
    checkedOn: '2026-09-01',
  },
  {
    procedureKey: 'dhi',
    country: 'de',
    min: 400,
    max: 800,
    currency: 'EUR',
    sourceUrl: 'https://www.haartransplantation.de',
    checkedOn: '2026-09-01',
  },
  {
    procedureKey: 'dhi',
    country: 'il',
    min: 600,
    max: 1000,
    currency: 'USD',
    sourceUrl: 'https://www.health.gov.il',
    checkedOn: '2026-09-01',
  },
];

export function homePriceFor(
  procedureKey: string,
  country: SourceCountry,
): HomePriceRef | undefined {
  return HOME_PRICES.find((h) => h.procedureKey === procedureKey && h.country === country);
}
