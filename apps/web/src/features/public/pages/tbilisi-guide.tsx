import { getTranslations } from 'next-intl/server';
import type { PublicLocale } from '@medtour/shared';
import { Container, Section } from '@/components/ui/container';
import { PageHero, Breadcrumbs } from './_shared';

export async function TbilisiGuidePage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.tbilisiGuide' });
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ key: 'tbilisi-guide', label: t('title') }]} />
      <PageHero eyebrow="Tbilisi" title={t('title')} intro={t('intro')} locale={locale} />
      <Section>
        <Container className="max-w-[760px] text-ink-muted">
          <p>
            Tbilisi has a quiet old centre, a riverside promenade and sulphur baths that can be
            used from day five of a dental recovery. The coordinator picks hotels within a 15-minute
            drive of the clinic so a short walk between visits is enough.
          </p>
        </Container>
      </Section>
    </>
  );
}
