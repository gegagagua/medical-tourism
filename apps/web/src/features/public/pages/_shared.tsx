import Link from 'next/link';
import type { ReactNode } from 'react';
import { href, type PublicLocale, type RouteKey } from '@medtour/shared';
import { Container, Section } from '@/components/ui/container';
import { BookCallButton } from '@/features/booking/book-call-button';

export function PageHero({
  eyebrow,
  title,
  intro,
  cta = 'both',
  locale,
  procedureHref,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
  cta?: 'both' | 'plan' | 'none';
  locale: PublicLocale;
  procedureHref?: string;
}) {
  const requestHref = procedureHref ?? href('request', locale) ?? `/${locale}`;
  return (
    <Section className="pb-6 pt-10">
      <Container className="max-w-[760px]">
        {eyebrow && (
          <div className="text-small font-medium uppercase tracking-wide text-balcony">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-3 font-display text-display-l md:text-[2.75rem] md:leading-[1.1]">
          {title}
        </h1>
        <p className="mt-4 text-lead text-ink-muted">{intro}</p>
        {cta !== 'none' && (
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={requestHref} className="btn btn-primary">
              Get my plan
            </Link>
            {cta === 'both' && <BookCallButton variant="secondary">Book a free call</BookCallButton>}
          </div>
        )}
      </Container>
    </Section>
  );
}

export function Breadcrumbs({
  locale,
  items,
}: {
  locale: PublicLocale;
  items: Array<{ key: RouteKey; label: string } | { href: string; label: string }>;
}) {
  const home = href('home', locale) ?? `/${locale}`;
  return (
    <nav aria-label="Breadcrumb" className="container pt-4 text-small text-ink-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href={home} className="hover:text-ink">
            Home
          </Link>
        </li>
        {items.map((it, i) => {
          const h = 'key' in it ? href(it.key, locale) ?? home : it.href;
          return (
            <li key={i} className="flex items-center gap-2">
              <span aria-hidden>/</span>
              {i < items.length - 1 ? (
                <Link href={h} className="hover:text-ink">
                  {it.label}
                </Link>
              ) : (
                <span className="text-ink">{it.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-display-l">{children}</h2>;
}
