import { getTranslations } from 'next-intl/server';
import type { PublicLocale } from '@medtour/shared';
import { PageHero, Breadcrumbs } from './_shared';

export async function FUEPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.fue' });
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ key: 'procedure-fue', label: t('title') }]} />
      <PageHero eyebrow="FUE" title={t('title')} intro={t('intro')} locale={locale} />
    </>
  );
}
