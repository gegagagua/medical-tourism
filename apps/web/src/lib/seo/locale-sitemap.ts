import { PUBLIC_LOCALES, ROUTE_KEYS, href, type PublicLocale } from '@medtour/shared';
import { SITE_URL } from './metadata';

const PRIORITY: Record<string, number> = {
  home: 1,
  'specialty-dentistry': 0.9,
  'procedure-dental-implants': 0.9,
  'procedure-all-on-4': 0.85,
  'procedure-veneers': 0.85,
  'specialty-hair': 0.8,
  'procedure-fue': 0.8,
  'procedure-dhi': 0.8,
  'specialty-dermatology': 0.75,
  prices: 0.85,
  clinics: 0.8,
  doctors: 0.7,
  'how-it-works': 0.75,
  'about-us': 0.7,
  contact: 0.7,
  faq: 0.65,
  'tbilisi-guide': 0.6,
  stories: 0.6,
  blog: 0.6,
  'compare-georgia-vs-turkey-dental': 0.75,
  request: 0.9,
};

export function buildLocaleSitemap(locale: PublicLocale): string {
  const lastmod = new Date().toISOString();
  const urls: string[] = [];

  for (const key of ROUTE_KEYS) {
    if (key === 'account') continue;
    const h = href(key, locale);
    if (!h) continue;

    const alternates = PUBLIC_LOCALES.map((l) => {
      const alt = href(key, l);
      return alt ? `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${alt}" />` : '';
    })
      .filter(Boolean)
      .join('\n');

    const xDefaultHref = href(key, 'en');
    const xDefault = xDefaultHref
      ? `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${xDefaultHref}" />`
      : '';

    const priority = PRIORITY[key] ?? 0.5;
    const changefreq = key === 'home' ? 'daily' : 'weekly';

    urls.push(
      `  <url>\n    <loc>${SITE_URL}${h}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority.toFixed(2)}</priority>\n${alternates}\n${xDefault}\n  </url>`,
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;
}
