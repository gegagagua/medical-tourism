import { getTranslations } from 'next-intl/server';
import type { PublicLocale } from '@medtour/shared';
import { PageHero, Breadcrumbs } from './_shared';

export async function SpecialtyHairPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.specialtyHair' });
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ key: 'specialty-hair', label: t('title') }]} />
      <PageHero eyebrow="Hair" title={t('title')} intro={t('intro')} locale={locale} />
    </>
  );
}
