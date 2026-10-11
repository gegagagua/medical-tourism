import type { MetadataRoute } from 'next';
import { PUBLIC_LOCALES } from '@medtour/shared';
import { SITE_URL } from '@/lib/seo/metadata';

// Sitemap INDEX — points at per-locale sitemaps (SEO.md §4). Each locale sitemap
// is served by `app/sitemap-[locale].xml/route.ts` and contains the full URL list
// for that locale with reciprocal hreflang alternates.
export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_LOCALES.map((locale) => ({
    url: `${SITE_URL}/sitemap-${locale}.xml`,
    lastModified: new Date(),
  }));
}
