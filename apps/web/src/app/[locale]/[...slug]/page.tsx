import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PUBLIC_LOCALES, type PublicLocale } from '@medtour/shared';
import { buildMetadata } from '@/lib/seo/metadata';
import { resolveRoute } from '@/lib/route-resolve';
import { renderRouteKey, titleForRoute } from '@/features/public/renderer';
import { ogImageFor } from '@/features/public/og-helper';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!PUBLIC_LOCALES.includes(locale as PublicLocale)) return {};
  const resolved = resolveRoute(locale as PublicLocale, slug);
  if (!resolved) return {};
  const t = await getTranslations({ locale, namespace: 'pages' });
  const { title, description } = titleForRoute(resolved.key, t);
  return buildMetadata({
    routeKey: resolved.key,
    locale: locale as PublicLocale,
    title,
    description,
    images: [{ url: ogImageFor(resolved.key), width: 1200, height: 630 }],
  });
}

export default async function CatchAllPublicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  if (!PUBLIC_LOCALES.includes(locale as PublicLocale)) notFound();
  setRequestLocale(locale);

  const resolved = resolveRoute(locale as PublicLocale, slug);
  if (!resolved) notFound();

  return renderRouteKey({
    key: resolved.key,
    detailSlug: resolved.detailSlug,
    locale: locale as PublicLocale,
  });
}
