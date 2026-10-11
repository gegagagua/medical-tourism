import { getTranslations } from 'next-intl/server';
import type { PublicLocale } from '@medtour/shared';
import { PageHero, Breadcrumbs } from './_shared';

export async function DHIPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.dhi' });
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ key: 'procedure-dhi', label: t('title') }]} />
      <PageHero eyebrow="DHI" title={t('title')} intro={t('intro')} locale={locale} />
    </>
  );
}
