import { getTranslations } from 'next-intl/server';
import type { PublicLocale } from '@medtour/shared';
import { PageHero, Breadcrumbs } from './_shared';

export async function SpecialtyDermatologyPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.specialtyDermatology' });
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ key: 'specialty-dermatology', label: t('title') }]} />
      <PageHero eyebrow="Skin" title={t('title')} intro={t('intro')} locale={locale} />
    </>
  );
}
