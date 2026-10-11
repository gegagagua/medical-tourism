import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { PUBLIC_LOCALES, type PublicLocale, dirFor } from '@medtour/shared';
import { display, text } from '@/lib/fonts';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { FloatingWhatsApp } from '@/components/site/floating-whatsapp';

export function generateStaticParams() {
  return PUBLIC_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!PUBLIC_LOCALES.includes(locale as PublicLocale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = dirFor(locale as PublicLocale);

  return (
    <html lang={locale} dir={dir} className={`${display.variable} ${text.variable}`}>
      <body className="min-h-screen bg-paper text-ink antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-3 focus:py-2"
          >
            Skip to content
          </a>
          <SiteHeader locale={locale as PublicLocale} />
          <main id="main">{children}</main>
          <SiteFooter locale={locale as PublicLocale} />
          <FloatingWhatsApp />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
