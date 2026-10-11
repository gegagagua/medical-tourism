import { getTranslations } from 'next-intl/server';
import type { PublicLocale } from '@medtour/shared';
import { Container, Section } from '@/components/ui/container';
import { PageHero, Breadcrumbs } from './_shared';
import { RequestFlow } from '@/features/request/request-flow';

export async function RequestPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.request' });
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ key: 'request', label: t('title') }]} />
      <PageHero eyebrow="Request" title={t('title')} intro={t('intro')} locale={locale} cta="none" />
      <Section>
        <Container className="max-w-[720px]">
          <RequestFlow />
        </Container>
      </Section>
    </>
  );
}
