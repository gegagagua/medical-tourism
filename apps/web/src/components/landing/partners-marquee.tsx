'use client';

import { motion } from 'framer-motion';

// Marquee of trust badges / partner names. Pure SVG/text to stay crisp on retina and
// avoid remote-image flicker.
const BADGES = [
  'ITI Member',
  'ISHRS',
  'ADA Standards',
  'ISO 9001:2015',
  'Georgia Health',
  'EU GDPR',
  'Mastercard · Visa',
  'TBC Bank Payments',
  'Direct flights · TBS',
  '4.9 ★ Trustindex',
  'Google Reviews',
  'IAMFA Partner',
];

export function PartnersMarquee() {
  return (
    <section
      aria-label="Partners and standards"
      className="border-y border-line bg-surface py-6"
    >
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent rtl:bg-gradient-to-l" />
        <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent rtl:bg-gradient-to-r" />
        <motion.div
          className="flex gap-10 whitespace-nowrap text-ink-muted"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...BADGES, ...BADGES].map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="inline-flex items-center gap-2 text-small font-medium uppercase tracking-wide"
            >
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-balcony" />
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
