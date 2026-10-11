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

interface BuildMetadataInput {
  routeKey?: RouteKey;
  locale: PublicLocale;
  title: string;
  description: string;
  path?: string; // used for routes without a slug-map entry (e.g. dynamic clinics)
  images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
  noindex?: boolean;
}

export function buildMetadata({
  routeKey,
  locale,
  title,
  description,
  path,
  images,
  noindex,
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

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      locale,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}
