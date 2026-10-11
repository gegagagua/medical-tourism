import { getTranslations } from 'next-intl/server';
import type { PublicLocale } from '@medtour/shared';
import { Container, Section } from '@/components/ui/container';
import { PageHero, Breadcrumbs } from './_shared';
import { StepSequence } from '@/components/landing/step-sequence';

export async function HowItWorksPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.howItWorks' });
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ key: 'how-it-works', label: t('title') }]} />
      <PageHero eyebrow="How it works" title={t('title')} intro={t('intro')} locale={locale} />
      <Section>
        <Container>
          <StepSequence />
        </Container>
      </Section>
      <Section>
        <Container className="max-w-[760px] text-ink-muted">
          <h2 className="text-title font-medium text-ink">Deposit and refund</h2>
          <p className="mt-3">
            A 10% deposit (minimum $100) confirms your booking. The balance is paid at the clinic.
            Deposits are refundable up to 14 days before arrival for non-sensitive specialties;
            each specialty&apos;s exact rule is on the confirmation screen.
          </p>
          <h2 className="mt-10 text-title font-medium text-ink">What&apos;s included</h2>
          <ul className="mt-3 list-disc ps-5">
            <li>Named coordinator from first message to the follow-up at 90 days.</li>
            <li>Airport transfers in Tbilisi, hotel bookings, visit calendar in your calendar.</li>
            <li>Written treatment plan from the clinic before you fly.</li>
          </ul>
          <h2 className="mt-10 text-title font-medium text-ink">What&apos;s not included</h2>
          <ul className="mt-3 list-disc ps-5">
            <li>Flights to and from Tbilisi.</li>
            <li>Any treatment or materials outside the written plan.</li>
          </ul>
        </Container>
      </Section>
    </>
  );
}
