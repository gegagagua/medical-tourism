import { getTranslations } from 'next-intl/server';
import type { PublicLocale } from '@medtour/shared';
import { Container, Section } from '@/components/ui/container';
import { PriceTable } from '@/components/catalog/price-table';
import { PageHero, Breadcrumbs } from './_shared';

export async function PricesPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.prices' });
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ key: 'prices', label: t('title') }]} />
      <PageHero eyebrow="Prices" title={t('title')} intro={t('intro')} locale={locale} cta="none" />
      <Section>
        <Container>
          <PriceTable />
        </Container>
      </Section>
    </>
  );
}
