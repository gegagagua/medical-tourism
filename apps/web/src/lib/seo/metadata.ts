import type { Metadata } from 'next';
import {
  DEFAULT_LOCALE,
  PUBLIC_LOCALES,
  href,
  type PublicLocale,
  type RouteKey,
} from '@medtour/shared';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';

export const SITE_NAME = 'Medtour Georgia';
export const TWITTER_HANDLE = '@medtour_ge';

// Open Graph expects BCP47-style tags with underscore (en_US, de_DE, …) — these also
// serve as the alternate locale list on every OG head.
const OG_LOCALE: Record<PublicLocale, string> = {
  en: 'en_US',
  de: 'de_DE',
  ru: 'ru_RU',
  he: 'he_IL',
};

interface BuildMetadataInput {
  routeKey?: RouteKey;
  locale: PublicLocale;
  title: string;
  description: string;
  path?: string; // used for routes without a slug-map entry (e.g. dynamic clinics)
  images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
  noindex?: boolean;
  type?: 'website' | 'article';
  lastModified?: string | Date;
  publishedAt?: string | Date;
}

export function buildMetadata({
  routeKey,
  locale,
  title,
  description,
  path,
  images,
  noindex,
  type = 'website',
  lastModified,
  publishedAt,
}: BuildMetadataInput): Metadata {
  const languages: Record<string, string> = {};
  let canonical: string | undefined;

  if (routeKey) {
    for (const l of PUBLIC_LOCALES) {
      const h = href(routeKey, l);
      if (h) languages[l] = `${SITE_URL}${h}`;
    }
    const defaultHref = href(routeKey, DEFAULT_LOCALE);
    if (defaultHref) languages['x-default'] = `${SITE_URL}${defaultHref}`;
    const self = href(routeKey, locale);
    if (self) canonical = `${SITE_URL}${self}`;
  } else if (path) {
    canonical = `${SITE_URL}${path}`;
  }

  const alternateLocales = PUBLIC_LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]);

  const robots: Metadata['robots'] = noindex
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        // Rich snippet signals for Google. "max-image-preview:large" lets our OG image
        // render in result cards; "max-snippet:-1" lifts the 160-char cap.
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      };

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type,
      locale: OG_LOCALE[locale],
      alternateLocale: alternateLocales,
      siteName: SITE_NAME,
      images,
      ...(publishedAt ? { publishedTime: new Date(publishedAt).toISOString() } : {}),
      ...(lastModified ? { modifiedTime: new Date(lastModified).toISOString() } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images,
    },
    robots,
    other: {
      // AI search engines look for a short editor-written abstract. Mirrors the OG description
      // but marks it as the authoritative short summary.
      'ai:summary': description,
      // Links the page's language variants in a format AI crawlers can consume cheaply.
      'ai:locale': locale,
      ...(lastModified
        ? { 'article:modified_time': new Date(lastModified).toISOString() }
        : {}),
    },
  };
}
