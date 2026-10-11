'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Smile,
  Scissors,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { href, type PublicLocale } from '@medtour/shared';
import { LocaleSwitcher } from './locale-switcher';
import { BookCallButton } from '@/features/booking/book-call-button';
import { cn } from '@/lib/cn';
import { TopBar } from './top-bar';

const PHONE_HREF = 'tel:+995322123456';
const PHONE_DISPLAY = '+995 32 2 123 456';

export function SiteHeader({ locale }: { locale: PublicLocale }) {
  const t = useTranslations('nav');
  const brand = useTranslations('brand');
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<null | 'specialties'>(null);

  const specialtyItems = [
    {
      icon: Smile,
      label: t('dental'),
      href: href('specialty-dentistry', locale),
      hint: 'Implants · All-on-4 · Veneers',
    },
    {
      icon: Scissors,
      label: t('hair'),
      href: href('specialty-hair', locale),
      hint: 'FUE · DHI · beard',
    },
    {
      icon: Sparkles,
      label: t('skin'),
      href: href('specialty-dermatology', locale),
      hint: 'Dermatology · lasers · peels',
    },
    {
      icon: Stethoscope,
      label: 'Checkup',
      href: href('home', locale),
      hint: 'Full-body screening',
    },
  ].filter((i): i is { icon: typeof Smile; label: string; href: string; hint: string } =>
    Boolean(i.href),
  );

  const topRight = [
    { label: t('prices'), href: href('prices', locale) },
    { label: t('clinics'), href: href('clinics', locale) },
    { label: t('howItWorks'), href: href('how-it-works', locale) },
    { label: t('aboutUs'), href: href('about-us', locale) },
    { label: t('contact'), href: href('contact', locale) },
  ].filter((i): i is { label: string; href: string } => Boolean(i.href));

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="container flex h-14 items-center gap-3 md:h-16 md:gap-4">
          {/* Brand — short label fits in-line; full name shows at xl+ */}
          <Link
            href={`/${locale}`}
            className="flex shrink-0 items-center gap-2 hover:no-underline"
          >
            <span
              aria-hidden
              className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl bg-balcony text-paper"
            >
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-saffron" />
              <Smile className="h-4 w-4" />
            </span>
            <span className="whitespace-nowrap font-display text-[0.95rem] font-medium text-ink md:text-[1rem]">
              <span className="xl:hidden">Medtour</span>
              <span className="hidden xl:inline">{brand('name')}</span>
            </span>
          </Link>

          {/* Primary nav — xl+ only */}
          <nav aria-label="Primary" className="ms-4 hidden xl:block">
            <ul className="flex items-center gap-4 text-small">
              <li
                className="relative"
                onMouseEnter={() => setMenu('specialties')}
                onMouseLeave={() => setMenu(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 whitespace-nowrap text-ink hover:text-balcony"
                  aria-haspopup="true"
                  aria-expanded={menu === 'specialties'}
                >
                  Specialties <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <div
                  className={cn(
                    'absolute start-0 top-full z-20 mt-2 w-[480px] rounded-panel border border-line bg-surface p-3 shadow-ticket',
                    menu === 'specialties' ? 'block' : 'hidden',
                  )}
                >
                  <ul className="grid grid-cols-2 gap-1.5">
                    {specialtyItems.map((it) => (
                      <li key={it.label}>
                        <Link
                          href={it.href}
                          className="flex gap-2.5 rounded-input p-2.5 hover:bg-mineral/40 hover:no-underline"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-input bg-mineral text-balcony">
                            <it.icon className="h-4 w-4" />
                          </span>
                          <span>
                            <span className="block font-medium text-ink">{it.label}</span>
                            <span className="block text-small text-ink-muted">{it.hint}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              {topRight.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="whitespace-nowrap text-ink hover:text-balcony hover:no-underline"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right cluster */}
          <div className="ms-auto flex shrink-0 items-center gap-2 md:gap-2.5">
            {/* Phone — pill button, icon-only on sm, full number on lg+ */}
            <a
              href={PHONE_HREF}
              aria-label={`Call ${PHONE_DISPLAY}`}
              className={cn(
                'group inline-flex items-center gap-2 rounded-full border border-balcony/30 bg-balcony/5',
                'px-2.5 py-1.5 text-small font-medium text-ink',
                'transition-colors hover:border-balcony hover:bg-balcony hover:text-paper hover:no-underline',
              )}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-balcony text-paper transition-colors group-hover:bg-paper group-hover:text-balcony">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <span className="hidden whitespace-nowrap tabular lg:inline">{PHONE_DISPLAY}</span>
            </a>

            {/* Compact locale dropdown */}
            <LocaleSwitcher />

            {/* Book — primary CTA */}
            <BookCallButton className="hidden whitespace-nowrap sm:inline-flex">
              <span className="hidden md:inline">{t('bookCall')}</span>
              <span className="md:hidden">{t('bookNow')}</span>
            </BookCallButton>

            {/* Burger for < xl */}
            <button
              type="button"
              aria-label={open ? t('closeMenu') : t('openMenu')}
              onClick={() => setOpen((v) => !v)}
              className="btn btn-secondary px-2.5 py-2 xl:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="xl:hidden">
            <nav className="container border-t border-line py-4" aria-label="Mobile">
              <ul className="grid gap-1 text-body">
                {specialtyItems.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className="flex items-center gap-3 rounded-input py-3 hover:bg-mineral/40 hover:no-underline"
                      onClick={() => setOpen(false)}
                    >
                      <it.icon className="h-5 w-5 text-balcony" /> {it.label}
                    </Link>
                  </li>
                ))}
                {topRight.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className="block rounded-input py-3 hover:bg-mineral/40 hover:no-underline"
                      onClick={() => setOpen(false)}
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between gap-3">
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-2 rounded-full border border-balcony/30 bg-balcony/5 px-3 py-1.5 text-small font-medium text-ink hover:no-underline"
                >
                  <Phone className="h-4 w-4 text-balcony" />{' '}
                  <span className="tabular">{PHONE_DISPLAY}</span>
                </a>
                <BookCallButton />
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
