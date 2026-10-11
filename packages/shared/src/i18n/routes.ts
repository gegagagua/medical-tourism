import { type Locale, PUBLIC_LOCALES } from '../enums';

// Localized slug map — SEO.md §2. Each public route has a stable key and per-locale slug.
// Changing a published slug requires a 301 in the redirects table.
export const ROUTE_KEYS = [
  'home',
  'how-it-works',
  'faq',
  'prices',
  'clinics',
  'doctors',
  'stories',
  'blog',
  'tbilisi-guide',
  'request',
  'account',
  'about-us',
  'contact',
  'specialty-dentistry',
  'specialty-hair',
  'specialty-dermatology',
  'procedure-dental-implants',
  'procedure-all-on-4',
  'procedure-veneers',
  'procedure-fue',
  'procedure-dhi',
  'compare-georgia-vs-turkey-dental',
] as const;
export type RouteKey = (typeof ROUTE_KEYS)[number];

type SlugMap = Record<RouteKey, Record<Locale, string | null>>;

// Hebrew slugs are Latin transliteration (SEO.md §2).
export const SLUGS: SlugMap = {
  home: { en: '', de: '', ru: '', he: '', ka: '' },
  'how-it-works': {
    en: 'how-it-works',
    de: 'so-funktioniert-es',
    ru: 'kak-eto-rabotaet',
    he: 'eich-ze-oved',
    ka: null,
  },
  faq: { en: 'faq', de: 'haeufige-fragen', ru: 'voprosy', he: 'shelot-ntsuvot', ka: null },
  prices: { en: 'prices', de: 'preise', ru: 'tseny', he: 'mehirim', ka: null },
  clinics: { en: 'clinics', de: 'kliniken', ru: 'kliniki', he: 'mirpaot', ka: null },
  doctors: { en: 'doctors', de: 'aerzte', ru: 'vrachi', he: 'rofim', ka: null },
  stories: { en: 'stories', de: 'geschichten', ru: 'istorii', he: 'sipurim', ka: null },
  blog: { en: 'blog', de: 'blog', ru: 'blog', he: 'blog', ka: null },
  'tbilisi-guide': {
    en: 'tbilisi-guide',
    de: 'tiflis-reisefuehrer',
    ru: 'gid-po-tbilisi',
    he: 'madrich-tbilisi',
    ka: null,
  },
  request: {
    en: 'get-my-plan',
    de: 'plan-erhalten',
    ru: 'poluchit-plan',
    he: 'kabel-tochnit',
    ka: null,
  },
  account: { en: 'account', de: 'konto', ru: 'kabinet', he: 'account', ka: null },
  'about-us': { en: 'about-us', de: 'ueber-uns', ru: 'o-nas', he: 'odot', ka: null },
  contact: { en: 'contact', de: 'kontakt', ru: 'kontakty', he: 'yetzira-kesher', ka: null },
  'specialty-dentistry': {
    en: 'dental-treatment-georgia',
    de: 'zahnbehandlung-georgien',
    ru: 'stomatologiya-gruziya',
    he: 'tipulim-dentaliim-gaorgia',
    ka: null,
  },
  'specialty-hair': {
    en: 'hair-transplant-georgia',
    de: 'haartransplantation-georgien',
    ru: 'peresadka-volos-gruziya',
    he: 'hashtalat-sear-gaorgia',
    ka: null,
  },
  'specialty-dermatology': {
    en: 'dermatology-georgia',
    de: 'dermatologie-georgien',
    ru: 'dermatologiya-gruziya',
    he: 'dermatologia-gaorgia',
    ka: null,
  },
  'procedure-dental-implants': {
    en: 'dental-implants-georgia',
    de: 'zahnimplantate-georgien',
    ru: 'implantaciya-zubov-gruziya',
    he: 'hashtalot-shinaim-gaorgia',
    ka: null,
  },
  'procedure-all-on-4': {
    en: 'all-on-4-georgia',
    de: 'all-on-4-georgien',
    ru: 'all-on-4-gruziya',
    he: 'all-on-4-gaorgia',
    ka: null,
  },
  'procedure-veneers': {
    en: 'dental-veneers-georgia',
    de: 'veneers-georgien',
    ru: 'viniry-gruziya',
    he: 'tzipuyim-gaorgia',
    ka: null,
  },
  'procedure-fue': {
    en: 'fue-hair-transplant-georgia',
    de: 'fue-haartransplantation-georgien',
    ru: 'fue-peresadka-volos',
    he: 'fue-hashtalat-sear',
    ka: null,
  },
  'procedure-dhi': {
    en: 'dhi-hair-transplant-georgia',
    de: 'dhi-haartransplantation-georgien',
    ru: 'dhi-peresadka-volos',
    he: 'dhi-hashtalat-sear',
    ka: null,
  },
  'compare-georgia-vs-turkey-dental': {
    en: 'compare/georgia-vs-turkey-dental-implants',
    de: 'vergleich/georgien-vs-tuerkei-zahnimplantate',
    ru: 'sravnenie/gruziya-vs-turciya-implantaciya',
    he: 'hashvaa/gaorgia-neged-turkia-shinaim',
    ka: null,
  },
};

export function href(key: RouteKey, locale: Locale): string | null {
  const slug = SLUGS[key]?.[locale];
  if (slug == null) return null;
  if (key === 'home') return `/${locale}`;
  return `/${locale}/${slug}`;
}

export function allHrefsFor(key: RouteKey): Partial<Record<Locale, string>> {
  const out: Partial<Record<Locale, string>> = {};
  for (const locale of PUBLIC_LOCALES) {
    const h = href(key, locale);
    if (h) out[locale] = h;
  }
  return out;
}
