import { getTranslations } from 'next-intl/server';
import type { PublicLocale } from '@medtour/shared';
import { PageHero, Breadcrumbs } from './_shared';

export async function VeneersPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.veneers' });
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ key: 'procedure-veneers', label: t('title') }]} />
      <PageHero eyebrow="Veneers" title={t('title')} intro={t('intro')} locale={locale} />
    </>
  );
}
