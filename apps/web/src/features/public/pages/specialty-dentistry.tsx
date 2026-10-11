import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import {
  CLINICS,
  PROCEDURES,
  STORIES,
  href,
  type PublicLocale,
} from '@medtour/shared';
import { Container, Section } from '@/components/ui/container';
import { PageHero, Breadcrumbs } from './_shared';
import { PriceTable } from '@/components/catalog/price-table';
import { StoryCard } from '@/components/landing/story-card';
import { FAQAccordion } from '@/components/ui/accordion';
import { FAQ_KEYS } from '@medtour/shared';

export async function SpecialtyDentistryPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.specialtyDentistry' });
  const tFaq = await getTranslations({ locale, namespace: 'sections.faq.entries' });
  const items = FAQ_KEYS.slice(0, 5).map((k) => ({
    id: k,
    question: tFaq(`${k}.q`),
    answer: tFaq(`${k}.a`),
  }));

  const dental = PROCEDURES.filter((p) => p.specialty === 'dentistry');
  const clinics = CLINICS.filter((c) => c.specialties.includes('dentistry'));
  const clinicsHref = href('clinics', locale) ?? `/${locale}`;

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ key: 'specialty-dentistry', label: t('title') }]} />
      <PageHero
        eyebrow="Dental"
        title={t('title')}
        intro={t('intro')}
        locale={locale}
      />

      <Section>
        <Container>
          <h2 className="font-display text-display-l">{t('proceduresTitle')}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {dental.map((p) => {
              const proceduresLink =
                p.key === 'dental-implants'
                  ? href('procedure-dental-implants', locale)
                  : p.key === 'all-on-4'
                    ? href('procedure-all-on-4', locale)
                    : p.key === 'veneers'
                      ? href('procedure-veneers', locale)
                      : null;
              return (
                <li key={p.key} className="panel">
                  <div className="font-medium">{p.key}</div>
                  <div className="mt-1 text-small text-ink-muted">
                    {p.unit.toLowerCase().replace('_', ' ')} · {p.typicalStayDays} nights ·{' '}
                    {p.visitsNeeded} visits
                  </div>
                  {proceduresLink && (
                    <Link
                      href={proceduresLink}
                      className="mt-3 inline-block text-small font-medium text-balcony hover:underline"
                    >
                      Prices and details →
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="font-display text-display-l">Prices</h2>
          <div className="mt-8">
            <PriceTable />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="font-display text-display-l">Clinics for dental</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {clinics.map((c) => (
              <li key={c.slug} className="panel">
                <div className="font-medium">{c.name}</div>
                <div className="mt-1 text-small text-ink-muted">{c.city}</div>
                <Link
                  href={`${clinicsHref}/${c.slug}`}
                  className="mt-3 inline-block text-small font-medium text-balcony hover:underline"
                >
                  See the clinic →
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="font-display text-display-l">Stories</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {STORIES.filter((s) => s.procedureKey === 'dental-implants').map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-[760px]">
          <h2 className="font-display text-display-l">FAQ</h2>
          <div className="mt-8">
            <FAQAccordion items={items} />
          </div>
        </Container>
      </Section>
    </>
  );
}
