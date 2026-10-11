import createMiddleware from 'next-intl/middleware';
import { PUBLIC_LOCALES, DEFAULT_LOCALE } from '@medtour/shared';

const locales = PUBLIC_LOCALES as readonly string[] as string[];

export default createMiddleware({
  locales,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
  localeDetection: true,
});

export const config = {
  // Skip Next.js internals and files with extensions. Public routes are matched below.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
