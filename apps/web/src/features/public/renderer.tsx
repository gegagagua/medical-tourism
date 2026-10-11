import { notFound } from 'next/navigation';
import type { PublicLocale, RouteKey } from '@medtour/shared';
import { SpecialtyDentistryPage } from './pages/specialty-dentistry';
import { SpecialtyHairPage } from './pages/specialty-hair';
import { SpecialtyDermatologyPage } from './pages/specialty-dermatology';
import { ProcedureImplantsPage } from './pages/procedure-implants';
import { AllOn4Page } from './pages/all-on-4';
import { VeneersPage } from './pages/veneers';
import { FUEPage } from './pages/fue';
import { DHIPage } from './pages/dhi';
import { PricesPage } from './pages/prices';
import { ClinicsIndexPage, ClinicDetailPage } from './pages/clinics';
import { DoctorsIndexPage, DoctorDetailPage } from './pages/doctors';
import { StoriesIndexPage, StoryDetailPage } from './pages/stories';
import { BlogIndexPage } from './pages/blog';
import { HowItWorksPage } from './pages/how-it-works';
import { FAQPage } from './pages/faq';
import { TbilisiGuidePage } from './pages/tbilisi-guide';
import { CompareDentalPage } from './pages/compare-dental';
import { RequestPage } from './pages/request';
import { AboutPage } from './pages/about';
import { ContactPage } from './pages/contact';
export { ogImageFor } from './og-helper';

export function renderRouteKey({
  key,
  detailSlug,
  locale,
}: {
  key: RouteKey;
  detailSlug?: string;
  locale: PublicLocale;
}) {
  switch (key) {
    case 'home':
      // Handled by [locale]/page.tsx — but return just in case.
      return null;
    case 'specialty-dentistry':
      return <SpecialtyDentistryPage locale={locale} />;
    case 'specialty-hair':
      return <SpecialtyHairPage locale={locale} />;
    case 'specialty-dermatology':
      return <SpecialtyDermatologyPage locale={locale} />;
    case 'procedure-dental-implants':
      return <ProcedureImplantsPage locale={locale} />;
    case 'procedure-all-on-4':
      return <AllOn4Page locale={locale} />;
    case 'procedure-veneers':
      return <VeneersPage locale={locale} />;
    case 'procedure-fue':
      return <FUEPage locale={locale} />;
    case 'procedure-dhi':
      return <DHIPage locale={locale} />;
    case 'prices':
      return <PricesPage locale={locale} />;
    case 'clinics':
      return detailSlug ? (
        <ClinicDetailPage locale={locale} slug={detailSlug} />
      ) : (
        <ClinicsIndexPage locale={locale} />
      );
    case 'doctors':
      return detailSlug ? (
        <DoctorDetailPage locale={locale} slug={detailSlug} />
      ) : (
        <DoctorsIndexPage locale={locale} />
      );
    case 'stories':
      return detailSlug ? (
        <StoryDetailPage locale={locale} slug={detailSlug} />
      ) : (
        <StoriesIndexPage locale={locale} />
      );
    case 'blog':
      return <BlogIndexPage locale={locale} />;
    case 'how-it-works':
      return <HowItWorksPage locale={locale} />;
    case 'faq':
      return <FAQPage locale={locale} />;
    case 'tbilisi-guide':
      return <TbilisiGuidePage locale={locale} />;
    case 'compare-georgia-vs-turkey-dental':
      return <CompareDentalPage locale={locale} />;
    case 'request':
      return <RequestPage locale={locale} />;
    case 'about-us':
      return <AboutPage locale={locale} />;
    case 'contact':
      return <ContactPage locale={locale} />;
    case 'account':
      notFound();
  }
}

export function titleForRoute(
  key: RouteKey,
  t: (k: string) => string,
): { title: string; description: string } {
  switch (key) {
    case 'specialty-dentistry':
      return { title: t('specialtyDentistry.title'), description: t('specialtyDentistry.intro') };
    case 'specialty-hair':
      return { title: t('specialtyHair.title'), description: t('specialtyHair.intro') };
    case 'specialty-dermatology':
      return {
        title: t('specialtyDermatology.title'),
        description: t('specialtyDermatology.intro'),
      };
    case 'procedure-dental-implants':
      return {
        title: t('procedureImplants.title'),
        description: t('procedureImplants.intro'),
      };
    case 'procedure-all-on-4':
      return { title: t('allOn4.title'), description: t('allOn4.intro') };
    case 'procedure-veneers':
      return { title: t('veneers.title'), description: t('veneers.intro') };
    case 'procedure-fue':
      return { title: t('fue.title'), description: t('fue.intro') };
    case 'procedure-dhi':
      return { title: t('dhi.title'), description: t('dhi.intro') };
    case 'prices':
      return { title: t('prices.title'), description: t('prices.intro') };
    case 'clinics':
      return { title: t('clinics.title'), description: t('clinics.intro') };
    case 'doctors':
      return { title: t('doctors.title'), description: t('doctors.title') };
    case 'stories':
      return { title: t('stories.title'), description: t('stories.title') };
    case 'blog':
      return { title: 'Blog', description: 'Articles reviewed by named doctors.' };
    case 'how-it-works':
      return { title: t('howItWorks.title'), description: t('howItWorks.intro') };
    case 'faq':
      return { title: t('faq.title'), description: t('faq.title') };
    case 'tbilisi-guide':
      return { title: t('tbilisiGuide.title'), description: t('tbilisiGuide.intro') };
    case 'compare-georgia-vs-turkey-dental':
      return { title: t('compareDental.title'), description: t('compareDental.intro') };
    case 'request':
      return { title: t('request.title'), description: t('request.intro') };
    case 'about-us':
      return { title: t('about.title'), description: t('about.intro') };
    case 'contact':
      return { title: t('contact.title'), description: t('contact.intro') };
    default:
      return { title: '—', description: '' };
  }
}
