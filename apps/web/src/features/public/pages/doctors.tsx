import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { CLINICS, type PublicLocale } from '@medtour/shared';
import { Container, Section } from '@/components/ui/container';
import { PageHero, Breadcrumbs } from './_shared';

export async function DoctorsIndexPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.doctors' });
  const doctors = CLINICS.flatMap((c) => c.doctors.map((d) => ({ ...d, clinic: c.name })));
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ key: 'doctors', label: t('title') }]} />
      <PageHero eyebrow="Doctors" title={t('title')} intro={t('title')} locale={locale} cta="none" />
      <Section>
        <Container>
          <ul className="grid gap-4 md:grid-cols-2">
            {doctors.map((d) => (
              <li key={d.slug} className="panel">
                <div className="font-medium">{d.name}</div>
                <div className="mt-1 text-small text-ink-muted">{d.credentials}</div>
                <div className="mt-2 text-small">{d.clinic}</div>
                <div className="mt-2 text-small text-ink-muted">{d.languages.join(' · ')}</div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}

export async function DoctorDetailPage({
  locale,
  slug,
}: {
  locale: PublicLocale;
  slug: string;
}) {
  const found = CLINICS.flatMap((c) => c.doctors.map((d) => ({ d, c }))).find((x) => x.d.slug === slug);
  if (!found) notFound();
  const { d, c } = found;
  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { key: 'doctors', label: 'Doctors' },
          { href: '', label: d.name },
        ]}
      />
      <Section className="pt-6">
        <Container>
          <h1 className="font-display text-display-l">{d.name}</h1>
          <div className="mt-2 text-ink-muted">
            {d.credentials} · {c.name}
          </div>
          <div className="mt-6 text-small text-ink-muted">
            Languages: {d.languages.join(' · ')}
          </div>
          <div className="mt-2 text-small text-ink-muted">
            Procedures: {d.procedures.join(', ')}
          </div>
        </Container>
      </Section>
    </>
  );
}
