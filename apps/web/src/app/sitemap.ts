import type { MetadataRoute } from 'next';
import { PUBLIC_LOCALES, ROUTE_KEYS, href } from '@medtour/shared';
import { SITE_URL } from '@/lib/seo/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  for (const locale of PUBLIC_LOCALES) {
    for (const key of ROUTE_KEYS) {
      // Skip authenticated routes.
      if (key === 'account') continue;
      const h = href(key, locale);
      if (!h) continue;
      out.push({
        url: `${SITE_URL}${h}`,
        changeFrequency: key === 'home' ? 'daily' : 'weekly',
        priority: key === 'home' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            PUBLIC_LOCALES.map((l) => [l, href(key, l)]).filter(([, v]) => v) as Array<[string, string]>,
          ),
        },
      });
    }
  }
  return out;
}
