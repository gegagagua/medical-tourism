export const LOCALES = ['en', 'de', 'ru', 'he', 'ka'] as const;
export type Locale = (typeof LOCALES)[number];

export const PUBLIC_LOCALES = ['en', 'de', 'ru', 'he'] as const;
export type PublicLocale = (typeof PUBLIC_LOCALES)[number];

export const RTL_LOCALES = new Set<Locale>(['he']);
export const DEFAULT_LOCALE: Locale = 'en';

export const CALL_TYPES = ['WHATSAPP_VIDEO', 'PHONE', 'GOOGLE_MEET'] as const;
export type CallType = (typeof CALL_TYPES)[number];

export const PRICE_UNITS = [
  'PER_TOOTH',
  'PER_IMPLANT',
  'PER_ARCH',
  'PER_GRAFT',
  'PER_SESSION',
  'PER_COURSE',
  'PER_DAY',
  'FIXED',
] as const;
export type PriceUnit = (typeof PRICE_UNITS)[number];

export const SPECIALTY_KEYS = [
  'dentistry',
  'hair-transplant',
  'dermatology',
  'addiction',
  'orthopedics',
  'ophthalmology',
  'ivf',
  'bariatric',
  'checkup',
  'other',
] as const;
export type SpecialtyKey = (typeof SPECIALTY_KEYS)[number];

export const CURRENCIES = ['USD', 'EUR', 'GEL', 'GBP'] as const;
export type Currency = (typeof CURRENCIES)[number];

export const SOURCE_COUNTRIES = ['uk', 'de', 'il', 'kz', 'ru', 'ae'] as const;
export type SourceCountry = (typeof SOURCE_COUNTRIES)[number];
