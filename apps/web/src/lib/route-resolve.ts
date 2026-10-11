import { SLUGS, type Locale, type RouteKey } from '@medtour/shared';

export interface ResolvedRoute {
  key: RouteKey;
  detailSlug?: string;
}

const INDEX_WITH_DETAIL: Record<string, RouteKey> = {
  clinics: 'clinics',
  doctors: 'doctors',
  stories: 'stories',
  blog: 'blog',
};

/**
 * Given a locale and the path segments after the locale, return the matching route key
 * (and, for clinics/doctors/stories/blog, the detail slug).
 */
export function resolveRoute(locale: Locale, segments: string[]): ResolvedRoute | null {
  if (segments.length === 0) return { key: 'home' };

  const first = segments[0] ?? '';

  // Check index-with-detail prefixes first using the English slug (SLUGS map is per-locale).
  for (const [enKey, routeKey] of Object.entries(INDEX_WITH_DETAIL)) {
    const localized = SLUGS[routeKey]?.[locale];
    if (localized && first === localized) {
      if (segments.length === 1) return { key: routeKey };
      return { key: routeKey, detailSlug: segments[1] };
    }
    // Also accept the raw english key as fallback (helps during dev).
    if (first === enKey) {
      if (segments.length === 1) return { key: routeKey };
      return { key: routeKey, detailSlug: segments[1] };
    }
  }

  // Full-path join for routes whose slug contains a slash (compare/*).
  const joined = segments.join('/');
  for (const [key, byLocale] of Object.entries(SLUGS)) {
    const slug = byLocale[locale];
    if (slug && slug === joined) return { key: key as RouteKey };
  }

  return null;
}
