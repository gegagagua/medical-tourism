'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  HOME_PRICES,
  PROCEDURES,
  SOURCE_COUNTRIES,
  type SourceCountry,
  formatMoney,
  href,
  type PublicLocale,
  procedureByKey,
  clinicsBySpecialty,
} from '@medtour/shared';
import { Ticket } from './ticket';

const COUNTRY_LABEL: Record<SourceCountry, string> = {
  uk: 'London, United Kingdom',
  de: 'Berlin, Germany',
  il: 'Tel Aviv, Israel',
  kz: 'Almaty, Kazakhstan',
  ru: 'Moscow, Russia',
  ae: 'Dubai, UAE',
};

export function TicketEstimator({ defaultProcedureKey = 'dental-implants' }: { defaultProcedureKey?: string }) {
  const locale = useLocale() as PublicLocale;
  const t = useTranslations('ticket');
  const tCommon = useTranslations('common');

  const dentalKeys = ['dental-implants', 'all-on-4', 'veneers', 'fue', 'dhi'];
  const procedures = PROCEDURES.filter((p) => dentalKeys.includes(p.key));

  const [procedureKey, setProcedureKey] = useState(defaultProcedureKey);
  const [country, setCountry] = useState<SourceCountry>('uk');
  const [qty, setQty] = useState(4);

  const procedure = procedureByKey(procedureKey)!;

  const { homeLabel, inGeorgiaLabel, savingsBadge } = useMemo(() => {
    const home = HOME_PRICES.find((h) => h.procedureKey === procedureKey && h.country === country);
    const clinics = clinicsBySpecialty(procedure.specialty);
    const geoPrices = clinics
      .flatMap((c) => c.prices.filter((p) => p.procedureKey === procedureKey))
      .flatMap((p) => [p.min, p.max]);
    const geoMin = geoPrices.length ? Math.min(...geoPrices) : null;
    const geoMax = geoPrices.length ? Math.max(...geoPrices) : null;

    const q = Math.max(1, qty);

    // Show the midpoint as a single, compact figure. Avoids wrapping and overlap in the narrow column.
    const homeMid =
      home != null ? Math.round(((home.min + home.max) / 2) * q) : null;
    const geoMid =
      geoMin != null && geoMax != null ? Math.round(((geoMin + geoMax) / 2) * q) : null;

    const homeLabel = homeMid != null && home
      ? formatMoney({ amount: homeMid, currency: home.currency }, locale)
      : '—';
    const inGeorgiaLabel = geoMid != null
      ? formatMoney({ amount: geoMid, currency: 'USD' }, locale)
      : '—';

    // Convert Georgia USD mid to the home currency for a true-ish savings %. Rough FX for display only.
    const FX_TO_USD: Record<string, number> = { USD: 1, GBP: 1.27, EUR: 1.08, GEL: 0.37 };
    let savingsBadge: string | undefined;
    if (home && homeMid != null && geoMid != null) {
      const homeInUsd = (homeMid / 100) * (FX_TO_USD[home.currency] ?? 1);
      const geoInUsd = geoMid / 100;
      if (homeInUsd > 0) {
        const pct = Math.round((1 - geoInUsd / homeInUsd) * 100);
        if (pct > 10) savingsBadge = `Save ${pct}%`;
      }
    }

    return { homeLabel, inGeorgiaLabel, savingsBadge };
  }, [procedureKey, country, qty, locale, procedure.specialty]);

  const requestHref = href('request', locale) ?? `/${locale}`;
  const planHref = `${requestHref}?procedure=${procedureKey}&country=${country}&qty=${qty}`;

  return (
    <Ticket
      variant="estimator"
      home={COUNTRY_LABEL[country]}
      procedure={labelFor(procedureKey)}
      atHome={homeLabel}
      inGeorgia={inGeorgiaLabel}
      nights={tCommon('nights', { n: procedure.typicalStayDays })}
      coordinator="Nino"
      savingsBadge={savingsBadge}
      cta={
        <Link href={planHref} className="btn btn-primary w-full justify-center">
          {t('cta')}
        </Link>
      }
    >
      <fieldset className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="text-small text-ink-muted">{t('home')}</span>
          <select
            className="input mt-1"
            value={country}
            onChange={(e) => setCountry(e.target.value as SourceCountry)}
            aria-label={t('selectCountry')}
          >
            {SOURCE_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {COUNTRY_LABEL[c]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-small text-ink-muted">{t('procedure')}</span>
          <select
            className="input mt-1"
            value={procedureKey}
            onChange={(e) => setProcedureKey(e.target.value)}
            aria-label={t('selectProcedure')}
          >
            {procedures.map((p) => (
              <option key={p.key} value={p.key}>
                {labelFor(p.key)}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-small text-ink-muted">{t('quantity')}</span>
          <input
            type="number"
            min={1}
            max={32}
            className="input mt-1 tabular"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          />
        </label>
      </fieldset>
    </Ticket>
  );
}

function labelFor(key: string): string {
  switch (key) {
    case 'dental-implants':
      return '4 implants';
    case 'all-on-4':
      return 'All-on-4, one arch';
    case 'veneers':
      return 'Veneers (per tooth)';
    case 'fue':
      return 'FUE hair transplant (per graft)';
    case 'dhi':
      return 'DHI hair transplant (per graft)';
    default:
      return key;
  }
}
