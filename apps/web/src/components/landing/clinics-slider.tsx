'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight, ArrowLeft, Shield, Star } from 'lucide-react';
import { CLINICS, href, type PublicLocale } from '@medtour/shared';
import { IMG } from '@/lib/media';
import { useLocale } from 'next-intl';

const CLINIC_PHOTOS = [IMG.clinic1, IMG.clinic2, IMG.clinic3];

export function ClinicsSlider() {
  const locale = useLocale() as PublicLocale;
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: true,
  });
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

  const clinicsHref = href('clinics', locale) ?? `/${locale}`;

  return (
    <section id="clinics-showcase" className="bg-mineral/30 py-14 md:py-16">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[640px]">
            <div className="text-small font-medium uppercase tracking-wide text-balcony">
              Partner clinics
            </div>
            <h2 className="mt-3 font-display text-display-l">
              Clinics we checked in person
            </h2>
            <p className="mt-3 text-lead text-ink-muted">
              License, insurance, written warranty — on file. A site visit from our team before
              the first patient flies.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous clinic"
              disabled={!canPrev}
              onClick={() => embla?.scrollPrev()}
              className="btn btn-secondary px-3 py-2 disabled:opacity-40"
            >
              <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Next clinic"
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
            {CLINICS.map((c, i) => (
              <article
                key={c.slug}
                className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_60%] lg:flex-[0_0_42%]"
              >
                <div className="group h-full overflow-hidden rounded-panel border border-line bg-surface">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={CLINIC_PHOTOS[i % CLINIC_PHOTOS.length] ?? IMG.clinic1}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 42vw, (min-width: 640px) 60vw, 85vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                    <div className="absolute start-4 top-4 flex items-center gap-1.5 rounded-full bg-surface/90 px-2.5 py-1 text-small backdrop-blur">
                      <Shield className="h-3.5 w-3.5 text-balcony" /> Vetted
                    </div>
                    <div className="absolute end-4 top-4 flex items-center gap-1.5 rounded-full bg-saffron px-2.5 py-1 text-small font-medium text-ink">
                      <Star className="h-3.5 w-3.5" fill="currentColor" /> 4.9
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-title font-medium">{c.name}</h3>
                    <div className="mt-1 text-small text-ink-muted">
                      {c.city} · License {c.licenseNumber}
                    </div>
                    <p className="mt-4 text-small text-ink-muted">{c.warrantyText}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {c.capabilities.slice(0, 4).map((cap) => (
                        <span
                          key={cap}
                          className="rounded-full border border-line px-2 py-0.5 text-small text-ink-muted"
                        >
                          {cap.toLowerCase().replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`${clinicsHref}/${c.slug}`}
                      className="mt-5 inline-flex items-center gap-1 text-small font-medium text-balcony hover:underline"
                    >
                      See the clinic <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
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
