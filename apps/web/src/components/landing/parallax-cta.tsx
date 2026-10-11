'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { href, type PublicLocale } from '@medtour/shared';
import { BookCallButton } from '@/features/booking/book-call-button';
import { IMG } from '@/lib/media';

export function ParallaxCTA() {
  const locale = useLocale() as PublicLocale;
  const t = useTranslations('sections.closing');
  const nav = useTranslations('nav');
  const requestHref = href('request', locale) ?? `/${locale}`;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      ref={ref}
      aria-label="Ready to see your plan"
      // Solid ink fallback so contrast holds even if the remote image stalls.
      className="relative isolate h-[48vh] min-h-[380px] w-full overflow-hidden bg-ink"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-[-10%] will-change-transform motion-reduce:transform-none"
      >
        <Image
          src={IMG.oldTown}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-55"
        />
      </motion.div>
      {/* Dark wash on top of the image so the paper-coloured text stays legible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink via-ink/80 to-ink/40" />

      <div className="relative z-10 flex h-full items-center">
        <div className="container">
          <div className="max-w-[640px] text-paper">
            <div className="inline-flex items-center gap-2 rounded-full border border-paper/30 bg-paper/10 px-3 py-1 text-small backdrop-blur">
              Free · 15 minutes · No account
            </div>
            <h2 className="mt-4 font-display text-[1.75rem] leading-[1.1] md:text-[2.4rem]">
              {t('title')}
            </h2>
            <p className="mt-3 max-w-[520px] text-lead text-paper/85">{t('body')}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={requestHref} className="btn btn-primary">
                {nav('getPlan')}
              </Link>
              <BookCallButton
                variant="secondary"
                className="border border-paper/40 bg-paper/10 text-paper backdrop-blur hover:bg-paper/20"
              >
                {nav('bookCall')}
              </BookCallButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
