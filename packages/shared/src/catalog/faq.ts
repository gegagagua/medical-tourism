export interface FaqEntry {
  key: string;
}

export const FAQ_KEYS = [
  'is-it-safe',
  'how-is-price-fixed',
  'what-if-complication',
  'how-many-visits',
  'what-about-warranty',
  'can-i-bring-companion',
  'what-languages',
  'how-pay-deposit',
] as const;

export type FaqKey = (typeof FAQ_KEYS)[number];
