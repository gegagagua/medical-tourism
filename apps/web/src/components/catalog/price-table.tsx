import { useLocale, useTranslations } from 'next-intl';
import {
  CLINICS,
  HOME_PRICES,
  PROCEDURES,
  type SourceCountry,
  formatRange,
  toMajor,
} from '@medtour/shared';
import { Check } from 'lucide-react';

const BLOCK_LABEL: Record<string, string> = {
  'dental-implants': 'Dental implant',
  'all-on-4': 'All-on-4',
  veneers: 'Veneer',
  extraction: 'Tooth extraction',
  filling: 'Filling',
  cleaning: 'Professional cleaning',
  fue: 'FUE hair transplant',
  dhi: 'DHI hair transplant',
};

const UNIT_LABEL: Record<string, string> = {
  'dental-implants': 'per implant',
  'all-on-4': 'per arch',
  veneers: 'per tooth',
  extraction: 'per tooth',
  filling: 'per tooth',
  cleaning: 'per visit',
  fue: 'per graft',
  dhi: 'per graft',
};

// Rough FX used only to compute an at-a-glance savings %. The displayed numbers
// stay in the user's own currencies — this never alters the table itself.
const FX_TO_USD: Record<string, number> = { USD: 1, GBP: 1.27, EUR: 1.08, GEL: 0.37 };

function pluralize(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`;
}

export function PriceTable({ country = 'uk' }: { country?: SourceCountry }) {
  const t = useTranslations('sections.priceTable');
  const locale = useLocale();

  const rows = PROCEDURES.filter((p) =>
    ['dental-implants', 'all-on-4', 'veneers', 'fue', 'dhi'].includes(p.key),
  );

  const items = rows.map((p) => {
    const home = HOME_PRICES.find((h) => h.procedureKey === p.key && h.country === country);
    const geoPrices = CLINICS.flatMap((c) =>
      c.prices.filter((price) => price.procedureKey === p.key),
    );
    const geoMin = geoPrices.length ? Math.min(...geoPrices.map((x) => x.min)) : null;
    const geoMax = geoPrices.length ? Math.max(...geoPrices.map((x) => x.max)) : null;

    let savings: number | null = null;
    if (home && geoMin != null && geoMax != null) {
      const homeMid = toMajor((home.min + home.max) / 2, home.currency) *
        (FX_TO_USD[home.currency] ?? 1);
      const geoMid = toMajor((geoMin + geoMax) / 2, 'USD');
      if (homeMid > 0) {
        const pct = Math.round((1 - geoMid / homeMid) * 100);
        if (pct > 10 && pct < 95) savings = pct;
      }
    }

    return { p, home, geoMin, geoMax, savings };
  });

  const today = new Date();
  const updated = today.toLocaleDateString(locale, {
    month: 'short',
    year: 'numeric',
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-small text-ink-muted">
          <span className="h-2 w-2 rounded-full bg-balcony" />
          Updated {updated} · USD, {country === 'uk' ? 'GBP' : country === 'de' ? 'EUR' : 'USD'}
        </div>
        <div className="text-small text-ink-muted">
          Compared with <span className="font-medium uppercase text-ink">{country}</span> retail prices
        </div>
      </div>

      {/* Desktop table */}
      <div className="mt-5 hidden overflow-hidden rounded-panel border border-line bg-surface md:block">
        <table className="w-full border-collapse text-start">
          <caption className="sr-only">{t('title')}</caption>
          <thead className="bg-paper">
            <tr className="text-small text-ink-muted">
              <th className="w-[32%] px-5 py-3 text-start font-medium">
                {t('colProcedure')}
              </th>
              <th className="px-5 py-3 text-end font-medium">{t('colHome')}</th>
              <th className="bg-mineral/50 px-5 py-3 text-end font-medium text-ink">
                {t('colGeorgia')}
              </th>
              <th className="px-5 py-3 text-end font-medium">Savings</th>
              <th className="px-5 py-3 text-start font-medium">{t('colIncluded')}</th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ p, home, geoMin, geoMax, savings }) => (
              <tr
                key={p.key}
                className="border-t border-line transition-colors hover:bg-mineral/15"
              >
                <th scope="row" className="px-5 py-4 text-start align-top font-medium">
                  <div>{BLOCK_LABEL[p.key] ?? p.key}</div>
                  <div className="mt-0.5 text-small font-normal text-ink-muted">
                    {UNIT_LABEL[p.key] ?? ''}
                  </div>
                </th>
                <td className="px-5 py-4 text-end align-top tabular text-ink">
                  {home ? (
                    formatRange(
                      { amount: home.min, currency: home.currency },
                      { amount: home.max, currency: home.currency },
                      locale,
                    )
                  ) : (
                    <span className="text-ink-muted">—</span>
                  )}
                </td>
                <td className="bg-mineral/40 px-5 py-4 text-end align-top font-display tabular text-title text-balcony">
                  {geoMin && geoMax ? (
                    formatRange(
                      { amount: geoMin, currency: 'USD' },
                      { amount: geoMax, currency: 'USD' },
                      locale,
                    )
                  ) : (
                    '—'
                  )}
                </td>
                <td className="px-5 py-4 text-end align-top">
                  {savings != null ? (
                    <span className="inline-flex items-center rounded-full bg-saffron/15 px-2.5 py-1 text-small font-medium tabular text-ink">
                      −{savings}%
                    </span>
                  ) : (
                    <span className="text-small text-ink-muted">—</span>
                  )}
                </td>
                <td className="px-5 py-4 align-top text-small text-ink-muted">
                  <ul className="grid gap-1">
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-balcony" /> Consultation included
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-balcony" />{' '}
                      {pluralize(p.visitsNeeded, 'visit', 'visits')} ·{' '}
                      {pluralize(p.typicalStayDays, 'night', 'nights')}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-balcony" /> Written warranty
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stack */}
      <div className="mt-5 grid gap-3 md:hidden">
        {items.map(({ p, home, geoMin, geoMax, savings }) => (
          <article
            key={p.key}
            className="overflow-hidden rounded-panel border border-line bg-surface"
          >
            <header className="flex items-start justify-between gap-3 px-4 py-3">
              <div>
                <div className="font-medium">{BLOCK_LABEL[p.key] ?? p.key}</div>
                <div className="text-small text-ink-muted">{UNIT_LABEL[p.key]}</div>
              </div>
              {savings != null && (
                <span className="shrink-0 rounded-full bg-saffron/15 px-2.5 py-0.5 text-small font-medium tabular text-ink">
                  −{savings}%
                </span>
              )}
            </header>
            <div className="grid grid-cols-2 border-t border-line">
              <div className="border-e border-line px-4 py-3">
                <div className="text-small text-ink-muted">{t('colHome')}</div>
                <div className="mt-1 tabular">
                  {home
                    ? formatRange(
                        { amount: home.min, currency: home.currency },
                        { amount: home.max, currency: home.currency },
                        locale,
                      )
                    : '—'}
                </div>
              </div>
              <div className="bg-mineral/40 px-4 py-3">
                <div className="text-small text-ink-muted">{t('colGeorgia')}</div>
                <div className="mt-1 font-display tabular text-balcony">
                  {geoMin && geoMax
                    ? formatRange(
                        { amount: geoMin, currency: 'USD' },
                        { amount: geoMax, currency: 'USD' },
                        locale,
                      )
                    : '—'}
                </div>
              </div>
            </div>
            <footer className="flex flex-wrap gap-x-3 gap-y-1 border-t border-line px-4 py-2.5 text-small text-ink-muted">
              <span className="inline-flex items-center gap-1">
                <Check className="h-3 w-3 text-balcony" />{' '}
                {pluralize(p.visitsNeeded, 'visit', 'visits')}
              </span>
              <span className="inline-flex items-center gap-1">
                <Check className="h-3 w-3 text-balcony" />{' '}
                {pluralize(p.typicalStayDays, 'night', 'nights')}
              </span>
              <span className="inline-flex items-center gap-1">
                <Check className="h-3 w-3 text-balcony" /> Written warranty
              </span>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
