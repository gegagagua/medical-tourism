'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import {
  PUBLIC_LOCALES,
  SLUGS,
  href,
  type Locale,
  type PublicLocale,
  type RouteKey,
} from '@medtour/shared';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { flagUrl } from '@/lib/media';

// Resolve the current path's route key by matching the current locale's slug to SLUGS,
// then rebuild the href in the target locale. For dynamic details (/clinics/{slug}) we
// keep the detail slug unchanged — detail pages have the same slug across locales.
function resolveKey(
  locale: Locale,
  pathAfterLocale: string[],
): { key: RouteKey; detail?: string } | null {
  if (pathAfterLocale.length === 0) return { key: 'home' };
  const first = pathAfterLocale[0] ?? '';
  const indexKeys: Record<string, RouteKey> = {
    clinics: 'clinics',
    doctors: 'doctors',
    stories: 'stories',
    blog: 'blog',
  };
  for (const [enSlug, routeKey] of Object.entries(indexKeys)) {
    const localized = SLUGS[routeKey]?.[locale];
    if ((localized && first === localized) || first === enSlug) {
      return pathAfterLocale.length > 1
        ? { key: routeKey, detail: pathAfterLocale[1] }
        : { key: routeKey };
    }
  }
  const joined = pathAfterLocale.join('/');
  for (const [k, byLocale] of Object.entries(SLUGS)) {
    if (byLocale[locale] && byLocale[locale] === joined) return { key: k as RouteKey };
  }
  return null;
}

const FLAG: Record<PublicLocale, string> = {
  en: 'gb',
  de: 'de',
  ru: 'ru',
  he: 'il',
};

export function LocaleSwitcher() {
  const locale = useLocale() as PublicLocale;
  const pathname = usePathname();
  const t = useTranslations('locales');
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Click-outside / escape to close.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function hrefFor(target: PublicLocale): string {
    if (!pathname) return `/${target}`;
    const segments = pathname.split('/').filter(Boolean);
    const after = segments[0] === locale ? segments.slice(1) : segments;
    const resolved = resolveKey(locale, after);
    if (!resolved) return `/${target}`;
    const base = href(resolved.key, target);
    if (!base) return `/${target}`;
    return resolved.detail ? `${base}/${resolved.detail}` : base;
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className={cn(
          'inline-flex items-center gap-1.5 whitespace-nowrap rounded-input border border-line bg-surface px-2.5 py-1.5 text-small font-medium text-ink',
          'hover:border-balcony/60',
        )}
      >
        <Image
          src={flagUrl(FLAG[locale])}
          alt=""
          width={18}
          height={13}
          className="h-3.5 w-auto"
        />
        <span className="uppercase">{locale}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <ul
          role="listbox"
          className={cn(
            'absolute end-0 top-[calc(100%+6px)] z-50 min-w-[170px] overflow-hidden',
            'rounded-input border border-line bg-surface py-1 shadow-ticket',
          )}
        >
          {PUBLIC_LOCALES.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <Link
                href={hrefFor(l)}
                hrefLang={l}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-2 whitespace-nowrap px-3 py-2 text-small hover:bg-mineral/40 hover:no-underline',
                  l === locale ? 'font-medium text-ink' : 'text-ink-muted',
                )}
              >
                <Image
                  src={flagUrl(FLAG[l])}
                  alt=""
                  width={18}
                  height={13}
                  className="h-3.5 w-auto"
                />
                <span>{t(l)}</span>
                {l === locale && (
                  <span className="ms-auto text-balcony" aria-hidden>
                    ✓
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
