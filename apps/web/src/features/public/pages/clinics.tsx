import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import {
  CLINICS,
  clinicBySlug,
  formatRange,
  href,
  procedureByKey,
  type PublicLocale,
} from '@medtour/shared';
import { Container, Section } from '@/components/ui/container';
import { JsonLd } from '@/components/seo/jsonld';
import { breadcrumbLd, clinicLd, physicianLd } from '@/lib/seo/jsonld';
import { PageHero, Breadcrumbs } from './_shared';

export async function ClinicsIndexPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.clinics' });
  const clinicsHref = href('clinics', locale) ?? `/${locale}`;
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ key: 'clinics', label: t('title') }]} />
      <PageHero eyebrow="Clinics" title={t('title')} intro={t('intro')} locale={locale} cta="none" />
      <Section>
        <Container>
          <ul className="grid gap-4 md:grid-cols-2">
            {CLINICS.map((c) => (
              <li key={c.slug} className="panel">
                <h2 className="text-title font-medium">{c.name}</h2>
                <div className="mt-1 text-small text-ink-muted">{c.city}</div>
                <p className="mt-3 text-small">{c.warrantyText}</p>
                <Link
                  href={`${clinicsHref}/${c.slug}`}
                  className="mt-4 inline-block text-small font-medium text-balcony hover:underline"
                >
                  See the clinic →
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}

export async function ClinicDetailPage({
  locale,
  slug,
}: {
  locale: PublicLocale;
  slug: string;
}) {
  const clinic = clinicBySlug(slug);
  if (!clinic) notFound();
  const t = await getTranslations({ locale, namespace: 'pages.clinic' });
  const indexHref = href('clinics', locale) ?? `/${locale}`;

  return (
    <>
      <JsonLd data={clinicLd(clinic)} />
      {clinic.doctors.map((d) => (
        <JsonLd key={d.slug} data={physicianLd(d, clinic)} />
      ))}
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', url: `/${locale}` },
          { name: 'Clinics', url: indexHref },
          { name: clinic.name, url: `${indexHref}/${clinic.slug}` },
        ])}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { key: 'clinics', label: 'Clinics' },
          { href: `${indexHref}/${clinic.slug}`, label: clinic.name },
        ]}
      />

      <Section className="pt-6">
        <Container>
          <h1 className="font-display text-display-l">{clinic.name}</h1>
          <div className="mt-2 text-ink-muted">
            {clinic.city} · {t('licenseLabel')}: {clinic.licenseNumber}
          </div>
          <p className="mt-4 max-w-[640px] text-lead">{clinic.warrantyText}</p>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-title font-medium">{t('checksTitle')}</h2>
          <ul className="mt-4 grid gap-2 md:grid-cols-2">
            {clinic.checklist.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-4 border-b border-line py-2">
                <span>{item.label}</span>
                <span className="text-small text-ink-muted">{item.checkedOn}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-title font-medium">{t('doctorsTitle')}</h2>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {clinic.doctors.map((d) => (
              <li key={d.slug} className="panel">
                <div className="font-medium">{d.name}</div>
                <div className="mt-1 text-small text-ink-muted">{d.credentials}</div>
                <div className="mt-2 text-small">{d.languages.join(' · ')}</div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-title font-medium">{t('pricesTitle')}</h2>
          <ul className="mt-4 divide-y divide-line">
            {clinic.prices.map((p) => {
              const proc = procedureByKey(p.procedureKey);
              return (
                <li key={p.procedureKey} className="flex items-baseline justify-between gap-4 py-3">
                  <span>
                    {p.procedureKey}{' '}
                    <span className="text-small text-ink-muted">
                      ({proc ? proc.unit.toLowerCase().replace('_', ' ') : ''})
                    </span>
                  </span>
                  <span className="tabular text-balcony">
                    {formatRange(
                      { amount: p.min, currency: 'USD' },
                      { amount: p.max, currency: 'USD' },
                      locale,
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
    </>
  );
}
