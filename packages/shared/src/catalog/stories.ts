export interface StorySeed {
  slug: string;
  patientFirstName: string;
  country: string;
  procedureKey: string;
  clinicSlug: string;
  doctorSlug: string;
  nights: number;
  totalPaid: { amount: number; currency: 'USD' | 'EUR' | 'GEL' | 'GBP' };
  excerpt: string;
}

export const STORIES: StorySeed[] = [
  {
    slug: 'james-london-4-implants',
    patientFirstName: 'James',
    country: 'United Kingdom',
    procedureKey: 'dental-implants',
    clinicSlug: 'tbilisi-dental-studio',
    doctorSlug: 'nino-kiknadze',
    nights: 6,
    totalPaid: { amount: 390000, currency: 'USD' },
    excerpt:
      'Four implants and a bone graft, planned by email over three weeks. Nino picked me up from the airport in person — I had not expected that.',
  },
  {
    slug: 'yael-tel-aviv-fue',
    patientFirstName: 'Yael',
    country: 'Israel',
    procedureKey: 'fue',
    clinicSlug: 'batumi-hair-and-smile',
    doctorSlug: 'marina-shalvashvili',
    nights: 4,
    totalPaid: { amount: 230000, currency: 'USD' },
    excerpt:
      'I was ready for a factory. It was two doctors, one nurse, and a long lunch break. The clinic feels like a small practice, not a hair-mill.',
  },
];
