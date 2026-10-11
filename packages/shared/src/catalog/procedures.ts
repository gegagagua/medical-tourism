import type { Currency, PriceUnit, SpecialtyKey } from '../enums';

export interface ProcedureSeed {
  key: string;
  specialty: SpecialtyKey;
  unit: PriceUnit;
  typicalStayDays: number;
  visitsNeeded: number;
  requiredFiles: Array<'OPG' | 'SCALP_PHOTOS_4' | 'SKIN_PHOTOS' | 'MEDICAL_HISTORY'>;
  priceMin: number | null;
  priceMax: number | null;
  currency: Currency;
}

// Prices in minor units (cents / tetri). From SPEC §3 seed; implant/crown/veneer/All-on-4/6 are TODO
// (admin-managed) — placeholder ranges here for public estimators.
export const PROCEDURES: ProcedureSeed[] = [
  {
    key: 'extraction',
    specialty: 'dentistry',
    unit: 'PER_TOOTH',
    typicalStayDays: 1,
    visitsNeeded: 1,
    requiredFiles: ['OPG'],
    priceMin: 6000,
    priceMax: 9000,
    currency: 'USD',
  },
  {
    key: 'filling',
    specialty: 'dentistry',
    unit: 'PER_TOOTH',
    typicalStayDays: 1,
    visitsNeeded: 1,
    requiredFiles: [],
    priceMin: 8000,
    priceMax: 12000,
    currency: 'USD',
  },
  {
    key: 'cleaning',
    specialty: 'dentistry',
    unit: 'FIXED',
    typicalStayDays: 1,
    visitsNeeded: 1,
    requiredFiles: [],
    priceMin: 5000,
    priceMax: 7000,
    currency: 'USD',
  },
  {
    key: 'dental-implants',
    specialty: 'dentistry',
    unit: 'PER_IMPLANT',
    typicalStayDays: 6,
    visitsNeeded: 2,
    requiredFiles: ['OPG', 'MEDICAL_HISTORY'],
    priceMin: 70000,
    priceMax: 120000,
    currency: 'USD',
  },
  {
    key: 'all-on-4',
    specialty: 'dentistry',
    unit: 'PER_ARCH',
    typicalStayDays: 7,
    visitsNeeded: 2,
    requiredFiles: ['OPG', 'MEDICAL_HISTORY'],
    priceMin: 650000,
    priceMax: 950000,
    currency: 'USD',
  },
  {
    key: 'veneers',
    specialty: 'dentistry',
    unit: 'PER_TOOTH',
    typicalStayDays: 5,
    visitsNeeded: 2,
    requiredFiles: [],
    priceMin: 25000,
    priceMax: 45000,
    currency: 'USD',
  },
  {
    key: 'fue',
    specialty: 'hair-transplant',
    unit: 'PER_GRAFT',
    typicalStayDays: 4,
    visitsNeeded: 1,
    requiredFiles: ['SCALP_PHOTOS_4', 'MEDICAL_HISTORY'],
    priceMin: 150,
    priceMax: 300,
    currency: 'USD',
  },
  {
    key: 'dhi',
    specialty: 'hair-transplant',
    unit: 'PER_GRAFT',
    typicalStayDays: 4,
    visitsNeeded: 1,
    requiredFiles: ['SCALP_PHOTOS_4', 'MEDICAL_HISTORY'],
    priceMin: 200,
    priceMax: 400,
    currency: 'USD',
  },
];

export function procedureByKey(key: string): ProcedureSeed | undefined {
  return PROCEDURES.find((p) => p.key === key);
}

export function proceduresBySpecialty(specialty: SpecialtyKey): ProcedureSeed[] {
  return PROCEDURES.filter((p) => p.specialty === specialty);
}
