import type { SpecialtyKey } from '../enums';

export interface SpecialtySeed {
  key: SpecialtyKey;
  priority: number;
  isSensitive: boolean;
  isBookable: boolean;
}

export const SPECIALTIES: SpecialtySeed[] = [
  { key: 'dentistry', priority: 1, isSensitive: false, isBookable: true },
  { key: 'hair-transplant', priority: 2, isSensitive: false, isBookable: true },
  { key: 'dermatology', priority: 3, isSensitive: false, isBookable: true },
  { key: 'addiction', priority: 4, isSensitive: true, isBookable: false },
  { key: 'orthopedics', priority: 10, isSensitive: false, isBookable: false },
  { key: 'ophthalmology', priority: 11, isSensitive: false, isBookable: false },
  { key: 'ivf', priority: 12, isSensitive: false, isBookable: false },
  { key: 'bariatric', priority: 13, isSensitive: false, isBookable: false },
  { key: 'checkup', priority: 14, isSensitive: false, isBookable: false },
  { key: 'other', priority: 99, isSensitive: false, isBookable: false },
];

export function specialtyByKey(key: SpecialtyKey): SpecialtySeed | undefined {
  return SPECIALTIES.find((s) => s.key === key);
}
