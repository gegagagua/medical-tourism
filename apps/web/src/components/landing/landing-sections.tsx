import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  CLINICS,
  FAQ_KEYS,
  STORIES,
  href,
  type PublicLocale,
} from '@medtour/shared';
import { Section } from '@/components/ui/container';
import { PriceTable } from '@/components/catalog/price-table';
import { StepSequence } from './step-sequence';
import { ClinicCheckList } from './clinic-checklist';
import { CoordinatorCard } from './coordinator-card';
import { StoryCard } from './story-card';
import { ComparisonTable } from './comparison-table';
import { FAQAccordion } from '@/components/ui/accordion';
import { BookCallButton } from '@/features/booking/book-call-button';
import { Ticket } from '@/components/ticket/ticket';

export function PriceTableSection() {
  const t = useTranslations('sections.priceTable');
  return (
    <Section id="prices">
      <div className="container">
        <h2 className="font-display text-display-l">{t('title')}</h2>
        <p className="mt-3 max-w-[640px] text-lead text-ink-muted">{t('subtitle')}</p>
        <div className="mt-10">
          <PriceTable />
        </div>
      </div>
    </Section>
  );
}

export function HowItWorksSection() {
  const t = useTranslations('sections.howItWorks');
  return (
    <Section id="how">
      <div className="container">
        <h2 className="font-display text-display-l">{t('title')}</h2>
        <p className="mt-3 max-w-[640px] text-lead text-ink-muted">{t('subtitle')}</p>
        <div className="mt-10">
          <StepSequence />
        </div>
      </div>
    </Section>
  );
}

export function ClinicsSection() {
  const t = useTranslations('sections.clinics');
  const locale = useLocale() as PublicLocale;
  const clinicsHref = href('clinics', locale);
  return (
    <Section id="clinics">
      <div className="container grid gap-12 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div>
          <h2 className="font-display text-display-l">{t('title')}</h2>
          <p className="mt-3 text-lead text-ink-muted">{t('subtitle')}</p>
          <div className="mt-6">
            <ClinicCheckList />
          </div>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2">
          {CLINICS.map((c) => {
            const link = clinicsHref ? `${clinicsHref}/${c.slug}` : `/${locale}`;
            return (
              <li key={c.slug} className="panel">
                <h3 className="text-title font-medium">{c.name}</h3>
                <div className="mt-1 text-small text-ink-muted">{c.city}</div>
                <p className="mt-3 text-small text-ink-muted">{c.warrantyText}</p>
                <Link
                  href={link}
                  className="mt-4 inline-block text-small font-medium text-balcony hover:underline"
                >
                  See the clinic →
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

export function CoordinatorSection() {
  const t = useTranslations('sections.coordinator');
  return (
    <Section id="coordinator">
      <div className="container">
        <h2 className="font-display text-display-l">{t('title')}</h2>
        <p className="mt-3 max-w-[640px] text-lead text-ink-muted">{t('subtitle')}</p>
        <div className="mt-10">
          <CoordinatorCard />
        </div>
      </div>
    </Section>
  );
}

export function StoriesSection() {
  const t = useTranslations('sections.stories');
  return (
    <Section id="stories">
      <div className="container">
        <h2 className="font-display text-display-l">{t('title')}</h2>
        <p className="mt-3 max-w-[640px] text-lead text-ink-muted">{t('subtitle')}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {STORIES.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </div>
    </Section>
  );
}

export function GuideSection() {
  const t = useTranslations('sections.guide');
  const days = [
    { day: 'Day 1', what: 'Arrival at TBS. Coordinator meets you. Hotel check-in.' },
    { day: 'Day 2', what: 'Panoramic X-ray, consultation with your dentist, surgery plan signed.' },
    { day: 'Day 3', what: 'Implant placement. Rest; soft food.' },
    { day: 'Day 4', what: 'A quiet walk in Old Tbilisi, Mtatsminda funicular.' },
    { day: 'Day 5', what: 'Follow-up check, sulphur baths if cleared.' },
    { day: 'Day 6', what: 'Final review, departure instructions, airport drop-off.' },
  ];
  return (
    <Section id="guide">
      <div className="container">
        <h2 className="font-display text-display-l">{t('title')}</h2>
        <p className="mt-3 max-w-[640px] text-lead text-ink-muted">{t('subtitle')}</p>
        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {days.map((d) => (
            <li key={d.day} className="panel">
              <div className="text-small font-medium text-balcony">{d.day}</div>
              <div className="mt-1">{d.what}</div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

export function CompareSection() {
  const t = useTranslations('sections.compare');
  return (
    <Section id="compare">
      <div className="container">
        <h2 className="font-display text-display-l">{t('title')}</h2>
        <p className="mt-3 max-w-[640px] text-lead text-ink-muted">{t('subtitle')}</p>
        <div className="mt-10">
          <ComparisonTable />
        </div>
      </div>
    </Section>
  );
}

export function FAQSection() {
  const t = useTranslations('sections.faq');
  const items = FAQ_KEYS.map((k) => ({
    id: k,
    question: t(`entries.${k}.q`),
    answer: t(`entries.${k}.a`),
  }));
  return (
    <Section id="faq">
      <div className="container max-w-[760px]">
        <h2 className="font-display text-display-l">{t('title')}</h2>
        <div className="mt-10">
          <FAQAccordion items={items} />
        </div>
      </div>
    </Section>
  );
}

export function ClosingSection() {
  const t = useTranslations('sections.closing');
  const nav = useTranslations('nav');
  const locale = useLocale() as PublicLocale;
  const requestHref = href('request', locale) ?? `/${locale}`;
  return (
    <Section id="closing" className="bg-mineral/40">
      <div className="container grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
        <div>
          <h2 className="font-display text-display-l">{t('title')}</h2>
          <p className="mt-3 max-w-[560px] text-lead text-ink-muted">{t('body')}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={requestHref} className="btn btn-primary">
              {nav('getPlan')}
            </Link>
            <BookCallButton variant="secondary" />
          </div>
        </div>
        <Ticket
          variant="estimator"
          animate={false}
          home="London → TBS"
          procedure="4 implants"
          atHome="£10,800"
          inGeorgia="$3,900"
          nights="6 nights"
          coordinator="Nino"
        />
      </div>
    </Section>
  );
}
