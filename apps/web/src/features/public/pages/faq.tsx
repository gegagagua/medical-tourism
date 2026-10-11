import { getTranslations } from 'next-intl/server';
import { FAQ_KEYS, type PublicLocale } from '@medtour/shared';
import { Container, Section } from '@/components/ui/container';
import { JsonLd } from '@/components/seo/jsonld';
import { faqLd, breadcrumbLd } from '@/lib/seo/jsonld';
import { FAQAccordion } from '@/components/ui/accordion';
import { PageHero, Breadcrumbs } from './_shared';

export async function FAQPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.faq' });
  const tFaq = await getTranslations({ locale, namespace: 'sections.faq.entries' });

  const items = FAQ_KEYS.map((k) => ({
    id: k,
    question: tFaq(`${k}.q`),
    answer: tFaq(`${k}.a`),
  }));

  return (
    <>
      <JsonLd data={faqLd(items.map((i) => ({ q: i.question, a: i.answer })))} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', url: `/${locale}` },
          { name: t('title'), url: `/${locale}/faq` },
        ])}
      />
      <Breadcrumbs locale={locale} items={[{ key: 'faq', label: t('title') }]} />
      <PageHero eyebrow="FAQ" title={t('title')} intro={t('title')} locale={locale} cta="none" />
      <Section>
        <Container className="max-w-[760px]">
          <FAQAccordion items={items} />
        </Container>
      </Section>
    </>
  );
}
