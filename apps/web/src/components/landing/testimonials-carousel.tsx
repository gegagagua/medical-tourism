'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Star, Quote, ArrowRight, ArrowLeft } from 'lucide-react';
import { IMG, flagUrl } from '@/lib/media';

const TESTIMONIALS = [
  {
    name: 'James',
    country: 'United Kingdom',
    cc: 'gb',
    procedure: '4 implants + bone graft',
    paid: '$3,900',
    rating: 5,
    quote:
      'The written plan came back in two days. The price never changed. Nino met me at the airport at 1am, not a driver with a sign — Nino.',
    photo: IMG.patient1,
  },
  {
    name: 'Yael',
    country: 'Israel',
    cc: 'il',
    procedure: 'FUE hair transplant',
    paid: '$2,300',
    rating: 5,
    quote:
      'I was ready for a factory. It was two doctors, one nurse, a long lunch break. The follow-up on day 30 was a video call, not a form.',
    photo: IMG.patient2,
  },
  {
    name: 'Katarina',
    country: 'Germany',
    cc: 'de',
    procedure: 'All-on-4, upper arch',
    paid: '$7,100',
    rating: 5,
    quote:
      'Compared quotes from four countries. Georgia was not the cheapest. It was the only one that answered my CBCT question before taking money.',
    photo: IMG.patient3,
  },
  {
    name: 'Sophie',
    country: 'France',
    cc: 'fr',
    procedure: '6 veneers',
    paid: '$2,160',
    rating: 5,
    quote:
      'Six nights, two visits, a quiet hotel near the clinic. The ticket I saw online matched the invoice at the clinic to the dollar.',
    photo: IMG.patient4,
  },
];

export function TestimonialsCarousel() {
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: true })],
  );
  const [idx, setIdx] = useState(0);

  const update = useCallback(() => {
    if (!embla) return;
    setIdx(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    update();
    embla.on('select', update);
    embla.on('reInit', update);
  }, [embla, update]);

  return (
    <section id="stories" className="bg-ink py-20 text-paper md:py-24">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[640px]">
            <div className="text-small font-medium uppercase tracking-wide text-saffron">
              Verified treatments
            </div>
            <h2 className="mt-3 font-display text-display-l">Patients, in their own words</h2>
            <p className="mt-3 text-lead text-paper/70">
              Reviews only from completed cases. Labelled &ldquo;Verified treatment&rdquo; after a
              clinic confirms the final amount.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => embla?.scrollPrev()}
              className="rounded-input border border-paper/20 bg-paper/5 p-2 text-paper hover:bg-paper/10"
            >
              <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => embla?.scrollNext()}
              className="rounded-input border border-paper/20 bg-paper/5 p-2 text-paper hover:bg-paper/10"
            >
              <ArrowRight className="h-5 w-5 rtl:rotate-180" />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                className="min-w-0 flex-[0_0_90%] md:flex-[0_0_55%] lg:flex-[0_0_38%]"
              >
                <div className="h-full rounded-panel border border-paper/10 bg-paper/5 p-7 backdrop-blur">
                  <Quote className="h-7 w-7 text-saffron" />
                  <p className="mt-4 text-lead leading-snug text-paper">&ldquo;{t.quote}&rdquo;</p>

                  <div className="mt-6 flex items-center gap-3">
                    <span className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-paper/20">
                      <Image src={t.photo} alt="" fill sizes="48px" className="object-cover" />
                    </span>
                    <div>
                      <div className="font-medium">
                        {t.name},{' '}
                        <Image
                          src={flagUrl(t.cc)}
                          alt={t.country}
                          width={18}
                          height={13}
                          className="inline-block align-text-top"
                        />{' '}
                        {t.country}
                      </div>
                      <div className="text-small text-paper/70">
                        {t.procedure} · paid {t.paid}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-1 text-saffron">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4" fill="currentColor" />
                    ))}
                    <span className="ms-2 rounded-full border border-paper/20 px-2 py-0.5 text-small text-paper/80">
                      Verified treatment
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-1.5" aria-hidden>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => embla?.scrollTo(i)}
              className={`h-1 w-10 rounded-full transition-colors ${
                i === idx ? 'bg-saffron' : 'bg-paper/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
