import { getTranslations } from 'next-intl/server';
import {
  CLINICS,
  formatRange,
  procedureByKey,
  type PublicLocale,
} from '@medtour/shared';
import { Container, Section } from '@/components/ui/container';
import { JsonLd } from '@/components/seo/jsonld';
import { medicalProcedureLd, priceItemListLd, breadcrumbLd } from '@/lib/seo/jsonld';
import { PageHero, Breadcrumbs } from './_shared';

export async function ProcedureImplantsPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.procedureImplants' });
  const procedure = procedureByKey('dental-implants')!;

  const prices = CLINICS.flatMap((c) =>
    c.prices
      .filter((p) => p.procedureKey === 'dental-implants')
      .map((p) => ({ name: c.name, min: p.min, max: p.max, currency: 'USD' as const })),
  );

  return (
    <>
      <JsonLd
        data={medicalProcedureLd({
          name: t('title'),
          howPerformed:
            'Titanium implant placed in the jawbone; crown fitted after healing (typically 3–6 months).',
          preparation: 'Panoramic X-ray (OPG) and brief medical history form.',
          followup: 'Second visit for the crown and a check-up at 7, 30 and 90 days remotely.',
          url: `/${locale}/dental-implants-georgia`,
          bodyLocation: 'Jaw',
        })}
      />
      <JsonLd
        data={priceItemListLd({
          procedure,
          clinics: prices,
          url: `/${locale}/dental-implants-georgia`,
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', url: `/${locale}` },
          { name: t('title'), url: `/${locale}/dental-implants-georgia` },
        ])}
      />

      <Breadcrumbs
        locale={locale}
        items={[{ key: 'procedure-dental-implants', label: t('title') }]}
      />
      <PageHero
        eyebrow="Dental implants"
        title={t('title')}
        intro={t('intro')}
        locale={locale}
      />

      <Section>
        <Container className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-title font-medium">{t('whatIsIt')}</h2>
            <p className="mt-3 text-ink-muted">{t('whatIsItBody')}</p>
          </div>
          <div>
            <h2 className="text-title font-medium">{t('whoItSuits')}</h2>
            <p className="mt-3 text-ink-muted">{t('whoItSuitsBody')}</p>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-title font-medium">{t('visits')}</h2>
            <p className="mt-3 text-ink-muted">{t('visitsBody')}</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="font-display text-display-l">{t('pricesLabel')}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {prices.map((p) => (
              <li key={p.name} className="panel flex items-baseline justify-between">
                <span className="font-medium">{p.name}</span>
                <span className="tabular text-balcony">
                  {formatRange(
                    { amount: p.min, currency: p.currency },
                    { amount: p.max, currency: p.currency },
                    locale,
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
