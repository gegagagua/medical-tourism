'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight, ArrowLeft, Clock, Hash } from 'lucide-react';
import { useLocale } from 'next-intl';
import { href, type PublicLocale } from '@medtour/shared';
import { QuickBookButton } from '@/features/booking/quick-book-button';
import { IMG } from '@/lib/media';

interface Proc {
  key: string;
  routeKey?:
    | 'procedure-dental-implants'
    | 'procedure-all-on-4'
    | 'procedure-veneers';
  title: string;
  priceFrom: string;
  stay: string;
  visits: number;
  warranty: string;
  image: string;
  tag: string;
}

const PROCEDURES: Proc[] = [
  {
    key: 'dental-implants',
    routeKey: 'procedure-dental-implants',
    title: 'Dental implants',
    priceFrom: 'from $750',
    stay: '6 nights',
    visits: 2,
    warranty: '5-year warranty',
    image:
      'https://images.unsplash.com/photo-1606811842618-7ba15b57c0a0?w=1200&q=80&auto=format&fit=crop',
    tag: 'Most booked',
  },
  {
    key: 'all-on-4',
    routeKey: 'procedure-all-on-4',
    title: 'All-on-4, one arch',
    priceFrom: 'from $6,500',
    stay: '7 nights',
    visits: 2,
    warranty: '5-year warranty',
    image:
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&q=80&auto=format&fit=crop',
    tag: 'Full-arch',
  },
  {
    key: 'veneers',
    routeKey: 'procedure-veneers',
    title: 'Ceramic veneers',
    priceFrom: 'from $280 / tooth',
    stay: '5 nights',
    visits: 2,
    warranty: '2-year warranty',
    image:
      'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=1200&q=80&auto=format&fit=crop',
    tag: 'Smile makeover',
  },
  {
    key: 'crowns',
    title: 'Zirconium crowns',
    priceFrom: 'from $190 / tooth',
    stay: '4 nights',
    visits: 2,
    warranty: '2-year warranty',
    image:
      'https://images.unsplash.com/photo-1588776813047-c7c3b85b1bd7?w=1200&q=80&auto=format&fit=crop',
    tag: 'Fast turnaround',
  },
  {
    key: 'cleaning',
    title: 'Professional cleaning',
    priceFrom: '$50',
    stay: '1 night',
    visits: 1,
    warranty: 'Add during visit',
    image:
      'https://images.unsplash.com/photo-1559591937-abc3a5131d31?w=1200&q=80&auto=format&fit=crop',
    tag: 'Add-on',
  },
  {
    key: 'bone-graft',
    title: 'Bone graft / sinus lift',
    priceFrom: 'from $320',
    stay: '7 nights',
    visits: 2,
    warranty: 'Written plan',
    image:
      'https://images.unsplash.com/photo-1631815587646-b85a1bb027e2?w=1200&q=80&auto=format&fit=crop',
    tag: 'Pre-implant',
  },
];

export function DentalProceduresSlider() {
  const locale = useLocale() as PublicLocale;
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    update();
    embla.on('select', update);
    embla.on('reInit', update);
  }, [embla, update]);

  const dentalHref = href('specialty-dentistry', locale) ?? `/${locale}`;

  return (
    <section id="dental" className="relative py-14 md:py-16">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[640px]">
            <div className="flex items-center gap-2 text-small font-medium uppercase tracking-wide text-balcony">
              <Image src={IMG.specialtyDental} alt="" width={28} height={28} className="rounded-full object-cover" unoptimized={false} />
              Dentistry — our #1 specialty
            </div>
            <h2 className="mt-3 font-display text-display-l">
              Dental procedures with a fixed price before you fly
            </h2>
            <p className="mt-3 text-lead text-ink-muted">
              Six procedures covered end-to-end — written plan, named dentist, warranty on paper.
              Tap any to book a free call with the coordinator for that procedure.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous"
              disabled={!canPrev}
              onClick={() => embla?.scrollPrev()}
              className="btn btn-secondary px-3 py-2 disabled:opacity-40"
            >
              <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Next"
              disabled={!canNext}
              onClick={() => embla?.scrollNext()}
              className="btn btn-secondary px-3 py-2 disabled:opacity-40"
            >
              <ArrowRight className="h-5 w-5 rtl:rotate-180" />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {PROCEDURES.map((p) => (
              <article
                key={p.key}
                className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_60%] lg:flex-[0_0_32%]"
              >
                <div className="group flex h-full flex-col overflow-hidden rounded-panel border border-line bg-surface transition-shadow hover:shadow-ticket">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 60vw, 85vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                    <div className="absolute start-4 top-4 rounded-full bg-surface/90 px-2.5 py-1 text-small font-medium text-ink backdrop-blur">
                      {p.tag}
                    </div>
                    <div className="absolute end-4 top-4 rounded-full bg-saffron px-2.5 py-1 text-small font-medium text-ink">
                      {p.priceFrom}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-title font-medium">{p.title}</h3>
                    <ul className="mt-3 grid gap-1.5 text-small text-ink-muted">
                      <li className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-balcony" /> {p.stay} ·{' '}
                        {p.visits} visits
                      </li>
                      <li className="flex items-center gap-2">
                        <Hash className="h-3.5 w-3.5 text-balcony" /> {p.warranty}
                      </li>
                    </ul>
                    <div className="mt-5 flex flex-1 items-end gap-2">
                      <QuickBookButton
                        procedureKey={p.key}
                        className="flex-1 justify-center"
                        size="md"
                      >
                        Book now
                      </QuickBookButton>
                      {p.routeKey && (
                        <Link
                          href={href(p.routeKey, locale) ?? dentalHref}
                          className="btn btn-secondary"
                          aria-label={`Details for ${p.title}`}
                        >
                          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
