import { NextResponse } from 'next/server';
import { buildLocaleSitemap } from '@/lib/seo/locale-sitemap';

export const dynamic = 'force-static';

export function GET() {
  return new NextResponse(buildLocaleSitemap('he'), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=3600',
    },
  });
}
