import type { Currency } from '../enums';

// Money is stored in minor units + ISO currency (CLAUDE.md non-negotiable rule).
export interface Money {
  amount: number; // minor units (e.g. cents)
  currency: Currency;
}

const MINOR_UNIT_FACTOR: Record<Currency, number> = {
  USD: 100,
  EUR: 100,
  GEL: 100,
  GBP: 100,
};

export function toMajor(amount: number, currency: Currency): number {
  return amount / MINOR_UNIT_FACTOR[currency];
}

// Choose a sensible number of decimals: sub-$10 prices (per-graft) show 2dp so
// $0.90 doesn't collapse to "$1"; everything else is whole units.
function autoDigits(majorValue: number): number {
  if (Math.abs(majorValue) < 10) return 2;
  return 0;
}

export function formatMoney(
  value: Money,
  locale: string,
  options?: { maximumFractionDigits?: number; minimumFractionDigits?: number },
): string {
  const major = toMajor(value.amount, value.currency);
  const digits = options?.maximumFractionDigits ?? autoDigits(major);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: value.currency,
    maximumFractionDigits: digits,
    minimumFractionDigits: options?.minimumFractionDigits ?? digits,
  }).format(major);
}

export function formatRange(min: Money, max: Money, locale: string): string {
  if (min.currency !== max.currency) {
    return `${formatMoney(min, locale)} – ${formatMoney(max, locale)}`;
  }
  const maxMajor = toMajor(max.amount, min.currency);
  const digits = autoDigits(maxMajor);
  const nf = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: min.currency,
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
  return `${nf.format(toMajor(min.amount, min.currency))} – ${nf.format(
    toMajor(max.amount, max.currency),
  )}`;
}
