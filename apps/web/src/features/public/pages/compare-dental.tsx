import { getTranslations } from 'next-intl/server';
import type { PublicLocale } from '@medtour/shared';
import { Container, Section } from '@/components/ui/container';
import { ComparisonTable } from '@/components/landing/comparison-table';
import { PageHero, Breadcrumbs } from './_shared';

export async function CompareDentalPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.compareDental' });
  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[{ key: 'compare-georgia-vs-turkey-dental', label: t('title') }]}
      />
      <PageHero eyebrow="Compare" title={t('title')} intro={t('intro')} locale={locale} />
      <Section>
        <Container>
          <ComparisonTable />
        </Container>
      </Section>
    </>
  );
}
