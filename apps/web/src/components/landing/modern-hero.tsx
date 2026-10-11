'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, Shield, Clock, Star, PlayCircle } from 'lucide-react';
import { href, type PublicLocale } from '@medtour/shared';
import { TicketEstimator } from '@/components/ticket/ticket-estimator';
import { BookCallButton } from '@/features/booking/book-call-button';
import { IMG, flagUrl } from '@/lib/media';

export function ModernHero({ locale }: { locale: PublicLocale }) {
  const t = useTranslations('hero');
  const requestHref = href('request', locale) ?? `/${locale}`;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section ref={ref} className="relative isolate overflow-hidden pb-14 pt-8 md:pb-20 md:pt-12">
      {/* Parallax background image + soft wash */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10 will-change-transform motion-reduce:transform-none"
      >
        <Image
          src={IMG.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/80 via-paper/92 to-paper" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--mineral)_0%,_transparent_55%)] opacity-70" />
      </motion.div>

      <div className="container grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-center lg:gap-12">
        <div className="max-w-[560px]">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-balcony/30 bg-surface/70 px-3 py-1 text-small text-balcony backdrop-blur"
          >
            <Shield className="h-3.5 w-3.5" />
            Vetted clinics · Written warranty · One coordinator
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-4 font-display text-[1.85rem] leading-[1.12] md:text-[2.5rem] md:leading-[1.08]"
          >
            {t('titleDental')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-3 max-w-[480px] text-lead text-ink-muted"
          >
            {t('subtitleDental')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 flex flex-wrap gap-2.5"
          >
            <Link href={requestHref} className="btn btn-primary">
              {t('ctaPrimary')}
            </Link>
            <BookCallButton variant="secondary">
              <PlayCircle className="h-4 w-4" /> {t('ctaSecondary')}
            </BookCallButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-ink-muted"
          >
            <li className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-balcony" aria-hidden /> {t('proof1')}
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-balcony" aria-hidden /> {t('proof2')}
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-balcony" aria-hidden /> {t('proof3')}
            </li>
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-6 flex flex-wrap items-center gap-3 rounded-panel border border-line bg-surface/80 p-2.5 backdrop-blur"
          >
            <div className="flex -space-x-2">
              {[IMG.patient1, IMG.patient2, IMG.patient3, IMG.patient4].map((src, i) => (
                <span
                  key={src}
                  className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-surface"
                  style={{ zIndex: 4 - i }}
                >
                  <Image src={src} alt="" fill sizes="32px" className="object-cover" />
                </span>
              ))}
            </div>
            <div className="text-small">
              <div className="flex items-center gap-1 text-saffron">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3 w-3" fill="currentColor" />
                ))}
                <span className="ms-1 font-medium text-ink">4.9/5</span>
                <span className="ms-1 text-ink-muted">· 1,200+ patients</span>
              </div>
              <div className="mt-0.5 flex items-center gap-1 text-ink-muted">
                from{' '}
                <Image src={flagUrl('gb')} alt="UK" width={14} height={10} /> UK ·{' '}
                <Image src={flagUrl('de')} alt="DE" width={14} height={10} /> DE ·{' '}
                <Image src={flagUrl('il')} alt="IL" width={14} height={10} /> IL ·{' '}
                <Image src={flagUrl('fr')} alt="FR" width={14} height={10} /> FR
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
        >
          <TicketEstimator defaultProcedureKey="dental-implants" />

          {/* Reply chip under the ticket (replaces the overlapping floating badges) */}
          <div className="mt-3 flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-small text-ink-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-balcony/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-balcony" />
            </span>
            <Clock className="h-3.5 w-3.5" /> Replies in 1 working hour · Mon–Sat
          </div>
        </motion.div>
      </div>
    </section>
  );
}
