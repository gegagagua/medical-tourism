import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FAQ_KEYS, type PublicLocale } from '@medtour/shared';
import { buildMetadata, SITE_URL } from '@/lib/seo/metadata';
import {
  breadcrumbLd,
  dentistryServiceLd,
  faqLd,
  medicalBusinessLd,
  organizationLd,
  speakableLd,
  webSiteLd,
} from '@/lib/seo/jsonld';
import { JsonLd } from '@/components/seo/jsonld';
import { ModernHero } from '@/components/landing/modern-hero';
import { PartnersMarquee } from '@/components/landing/partners-marquee';
import { StatsBand } from '@/components/landing/stats-band';
import { ServicesGrid } from '@/components/landing/services-grid';
import { ClinicsSlider } from '@/components/landing/clinics-slider';
import { DoctorsGrid } from '@/components/landing/doctors-grid';
import { VideoSection } from '@/components/landing/video-section';
import { TestimonialsCarousel } from '@/components/landing/testimonials-carousel';
import { TbilisiGallery } from '@/components/landing/tbilisi-gallery';
import { ContactSection } from '@/components/landing/contact-section';
import { DentalProceduresSlider } from '@/components/landing/dental-procedures-slider';
import { ParallaxCTA } from '@/components/landing/parallax-cta';
import { FullBleedGallery } from '@/components/landing/full-bleed-gallery';
import {
  CompareSection,
  FAQSection,
  HowItWorksSection,
  PriceTableSection,
} from '@/components/landing/landing-sections';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  const brand = await getTranslations({ locale, namespace: 'brand' });
  return buildMetadata({
    routeKey: 'home',
    locale: locale as PublicLocale,
    title: `${brand('name')} — ${t('titleDental')}`,
    description: t('subtitleDental'),
    images: [{ url: `${SITE_URL}/og?procedure=Dental+implants`, width: 1200, height: 630 }],
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'sections.faq.entries' });
  const brand = await getTranslations({ locale, namespace: 'brand' });

  const faqs = FAQ_KEYS.map((k) => ({ q: t(`${k}.q`), a: t(`${k}.a`) }));

  return (
    <>
      <JsonLd data={organizationLd(brand('name'))} />
      <JsonLd data={medicalBusinessLd(brand('name'))} />
      <JsonLd data={webSiteLd(brand('name'))} />
      <JsonLd data={dentistryServiceLd(brand('name'))} />
      <JsonLd data={speakableLd()} />
      <JsonLd data={breadcrumbLd([{ name: 'Home', url: `/${locale}` }])} />
      <JsonLd data={faqLd(faqs)} />

      <ModernHero locale={locale as PublicLocale} />
      <PartnersMarquee />
      <StatsBand />
      <ServicesGrid locale={locale as PublicLocale} />
      <DentalProceduresSlider />
      <FullBleedGallery />
      <PriceTableSection />
      <HowItWorksSection />
      <ClinicsSlider />
      <DoctorsGrid />
      <VideoSection />
      <TestimonialsCarousel />
      <TbilisiGallery />
      <CompareSection />
      <FAQSection />
      <ContactSection />
      <ParallaxCTA />
    </>
  );
}
