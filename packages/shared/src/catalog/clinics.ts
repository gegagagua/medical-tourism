import type { SpecialtyKey } from '../enums';

export interface DoctorSeed {
  slug: string;
  name: string;
  credentials: string;
  languages: string[];
  specialties: SpecialtyKey[];
  procedures: string[];
}

export interface ClinicChecklistItem {
  label: string;
  checkedOn: string; // ISO date
}

export interface ClinicSeed {
  slug: string;
  name: string;
  city: string;
  licenseNumber: string;
  specialties: SpecialtyKey[];
  capabilities: Array<
    | 'ENGLISH_STAFF'
    | 'RUSSIAN_STAFF'
    | 'HEBREW_STAFF'
    | 'CBCT_XRAY'
    | 'GENERAL_ANESTHESIA'
    | 'INPATIENT_24_7'
    | 'AIRPORT_PICKUP'
  >;
  warrantyText: string;
  doctors: DoctorSeed[];
  checklist: ClinicChecklistItem[];
  // Clinic procedure prices in minor units (USD cents).
  prices: Array<{ procedureKey: string; min: number; max: number }>;
}

export const CLINICS: ClinicSeed[] = [
  {
    slug: 'tbilisi-dental-studio',
    name: 'Tbilisi Dental Studio',
    city: 'Tbilisi',
    licenseNumber: 'GE-DEN-2017-0421',
    specialties: ['dentistry'],
    capabilities: ['ENGLISH_STAFF', 'RUSSIAN_STAFF', 'CBCT_XRAY', 'AIRPORT_PICKUP'],
    warrantyText: '5-year warranty on implants, 2 years on crowns and veneers.',
    doctors: [
      {
        slug: 'nino-kiknadze',
        name: 'Dr. Nino Kiknadze',
        credentials: 'DDS, 14 years, implantology (ITI member)',
        languages: ['English', 'Russian', 'Georgian'],
        specialties: ['dentistry'],
        procedures: ['dental-implants', 'all-on-4', 'veneers'],
      },
      {
        slug: 'levan-makashvili',
        name: 'Dr. Levan Makashvili',
        credentials: 'DDS, 9 years, prosthodontics',
        languages: ['English', 'Georgian'],
        specialties: ['dentistry'],
        procedures: ['veneers', 'filling', 'cleaning'],
      },
    ],
    checklist: [
      { label: 'License verified', checkedOn: '2026-02-10' },
      { label: 'Liability insurance on file', checkedOn: '2026-02-10' },
      { label: 'Written warranty policy received', checkedOn: '2026-02-14' },
      { label: 'Site visit by platform team', checkedOn: '2026-03-02' },
      { label: 'Signed partner contract', checkedOn: '2026-03-05' },
    ],
    prices: [
      // Minor units (USD cents). Per operator feedback, Georgia prices run ~2× lower than earlier draft.
      { procedureKey: 'extraction', min: 3000, max: 5000 },
      { procedureKey: 'filling', min: 4000, max: 6000 },
      { procedureKey: 'cleaning', min: 3000, max: 4000 },
      { procedureKey: 'dental-implants', min: 38000, max: 55000 },
      { procedureKey: 'all-on-4', min: 350000, max: 450000 },
      { procedureKey: 'veneers', min: 14000, max: 21000 },
    ],
  },
  {
    slug: 'batumi-hair-and-smile',
    name: 'Batumi Hair & Smile Clinic',
    city: 'Batumi',
    licenseNumber: 'GE-GEN-2019-0088',
    specialties: ['dentistry', 'hair-transplant'],
    capabilities: ['ENGLISH_STAFF', 'RUSSIAN_STAFF', 'HEBREW_STAFF', 'AIRPORT_PICKUP'],
    warrantyText: '5-year warranty on implants; 1-year graft survival guarantee for FUE/DHI.',
    doctors: [
      {
        slug: 'marina-shalvashvili',
        name: 'Dr. Marina Shalvashvili',
        credentials: 'MD, 11 years, hair restoration (ISHRS)',
        languages: ['English', 'Russian', 'Hebrew'],
        specialties: ['hair-transplant'],
        procedures: ['fue', 'dhi'],
      },
      {
        slug: 'giorgi-abramia',
        name: 'Dr. Giorgi Abramia',
        credentials: 'DDS, 12 years, surgical dentistry',
        languages: ['English', 'Russian'],
        specialties: ['dentistry'],
        procedures: ['dental-implants', 'all-on-4'],
      },
    ],
    checklist: [
      { label: 'License verified', checkedOn: '2026-02-20' },
      { label: 'Liability insurance on file', checkedOn: '2026-02-20' },
      { label: 'Written warranty policy received', checkedOn: '2026-02-22' },
      { label: 'Site visit by platform team', checkedOn: '2026-03-10' },
      { label: 'Signed partner contract', checkedOn: '2026-03-12' },
    ],
    prices: [
      { procedureKey: 'dental-implants', min: 35000, max: 50000 },
      { procedureKey: 'all-on-4', min: 325000, max: 425000 },
      // Hair graft prices in USD cents — e.g. 90 = $0.90 / graft.
      { procedureKey: 'fue', min: 75, max: 115 },
      { procedureKey: 'dhi', min: 100, max: 160 },
    ],
  },
];

export function clinicsBySpecialty(specialty: SpecialtyKey): ClinicSeed[] {
  return CLINICS.filter((c) => c.specialties.includes(specialty));
}

export function clinicBySlug(slug: string): ClinicSeed | undefined {
  return CLINICS.find((c) => c.slug === slug);
}
