import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { PUBLIC_LOCALES, type PublicLocale } from '@medtour/shared';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) as PublicLocale | undefined;
  if (!locale || !PUBLIC_LOCALES.includes(locale as PublicLocale)) {
    notFound();
  }
  return {
    locale: locale as string,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
