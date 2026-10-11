import { formatRange, type Currency } from '@medtour/shared';

export function PriceRange({
  min,
  max,
  currency,
  locale,
  prefix,
}: {
  min: number;
  max: number;
  currency: Currency;
  locale: string;
  prefix?: string;
}) {
  if (!min || !max) return <span className="text-ink-muted">—</span>;
  return (
    <span className="tabular">
      {prefix ? `${prefix} ` : ''}
      {formatRange({ amount: min, currency }, { amount: max, currency }, locale)}
    </span>
  );
}
