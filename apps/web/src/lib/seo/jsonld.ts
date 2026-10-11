// JSON-LD helpers (SEO.md §5). Each builder returns a plain object the page
// renders in a <script type="application/ld+json">.
import { SITE_URL } from './metadata';
import type { ClinicSeed, DoctorSeed, ProcedureSeed } from '@medtour/shared';

export function organizationLd(brand: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        availableLanguage: ['English', 'German', 'Russian', 'Hebrew'],
      },
    ],
    sameAs: [
      'https://wa.me/995322123456',
      'https://t.me/medtour_ge',
      'https://instagram.com/medtour_ge',
      'https://facebook.com/medtour.ge',
      'https://youtube.com/@medtour_ge',
    ],
  };
}

export function webSiteLd(brand: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: brand,
    url: SITE_URL,
    inLanguage: ['en', 'de', 'ru', 'he'],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/en/prices?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

// `Service` schema aimed at the dentistry specialty. Lets LLMs and search engines
// recognise the specific offer (service provider, area served, price range).
export function dentistryServiceLd(brand: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Dental tourism',
    name: 'Dental treatment in Georgia',
    provider: { '@type': 'Organization', name: brand, url: SITE_URL },
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Israel' },
      { '@type': 'Country', name: 'France' },
    ],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '350',
      highPrice: '4500',
      offerCount: '6',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dental procedures',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'MedicalProcedure', name: 'Dental implants' } },
        { '@type': 'Offer', itemOffered: { '@type': 'MedicalProcedure', name: 'All-on-4' } },
        { '@type': 'Offer', itemOffered: { '@type': 'MedicalProcedure', name: 'Dental veneers' } },
        { '@type': 'Offer', itemOffered: { '@type': 'MedicalProcedure', name: 'Zirconium crowns' } },
      ],
    },
    url: `${SITE_URL}/en/dental-treatment-georgia`,
  };
}

// Marks the FAQ as "speakable" so Google Assistant / voice readers can pick a crisp answer.
export function speakableLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#faq h2', '#faq [data-state="open"] [aria-controls]'],
    },
  };
}

export function breadcrumbLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.url}`,
    })),
  };
}

export function faqLd(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export function medicalProcedureLd(opts: {
  name: string;
  howPerformed: string;
  preparation?: string;
  followup?: string;
  url: string;
  procedureType?: string;
  bodyLocation?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: opts.name,
    procedureType: opts.procedureType ?? 'https://schema.org/SurgicalProcedure',
    bodyLocation: opts.bodyLocation,
    howPerformed: opts.howPerformed,
    preparation: opts.preparation,
    followup: opts.followup,
    url: `${SITE_URL}${opts.url}`,
  };
}

export function clinicLd(clinic: ClinicSeed) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: clinic.name,
    address: { '@type': 'PostalAddress', addressLocality: clinic.city, addressCountry: 'GE' },
    medicalSpecialty: clinic.specialties,
    url: `${SITE_URL}/en/clinics/${clinic.slug}`,
  };
}

export function physicianLd(doctor: DoctorSeed, clinic: ClinicSeed) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    medicalSpecialty: doctor.specialties,
    knowsLanguage: doctor.languages,
    worksFor: { '@type': 'MedicalClinic', name: clinic.name },
  };
}

export function medicalBusinessLd(brand: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: brand,
    url: SITE_URL,
    image: `${SITE_URL}/logo.svg`,
    telephone: '+995322123456',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '11 Rustaveli Avenue',
      addressLocality: 'Tbilisi',
      postalCode: '0108',
      addressCountry: 'GE',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
    sameAs: [
      'https://wa.me/995322123456',
      'https://t.me/medtour_ge',
      'https://instagram.com/medtour_ge',
      'https://facebook.com/medtour.ge',
      'https://youtube.com/@medtour_ge',
    ],
    availableService: [
      { '@type': 'MedicalProcedure', name: 'Dental implants' },
      { '@type': 'MedicalProcedure', name: 'All-on-4' },
      { '@type': 'MedicalProcedure', name: 'Dental veneers' },
      { '@type': 'MedicalProcedure', name: 'FUE hair transplant' },
    ],
  };
}

export function priceItemListLd(opts: {
  procedure: ProcedureSeed;
  clinics: Array<{ name: string; min: number; max: number; currency: string }>;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: opts.clinics.map((c, i) => ({
      '@type': 'Offer',
      position: i + 1,
      seller: { '@type': 'MedicalClinic', name: c.name },
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: c.min / 100,
        maxPrice: c.max / 100,
        priceCurrency: c.currency,
      },
      url: `${SITE_URL}${opts.url}`,
    })),
  };
}
