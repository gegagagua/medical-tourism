import { getTranslations } from 'next-intl/server';
import type { PublicLocale } from '@medtour/shared';
import { PageHero, Breadcrumbs } from './_shared';

export async function AllOn4Page({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.allOn4' });
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ key: 'procedure-all-on-4', label: t('title') }]} />
      <PageHero eyebrow="All-on-4" title={t('title')} intro={t('intro')} locale={locale} />
    </>
  );
}
