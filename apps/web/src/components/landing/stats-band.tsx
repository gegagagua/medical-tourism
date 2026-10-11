'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 1200, suffix: '+', label: 'Patients treated' },
  { value: 12, suffix: '', label: 'Vetted clinics' },
  { value: 70, suffix: '%', label: 'Typical savings' },
  { value: 4.9, suffix: '/5', label: 'Average rating' },
];

export function StatsBand() {
  return (
    <section className="relative isolate border-y border-line bg-ink py-10 text-paper">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,_rgba(46,107,102,0.35)_0%,_transparent_55%),radial-gradient(circle_at_80%_80%,_rgba(226,161,43,0.18)_0%,_transparent_55%)]" />
      <div className="container grid grid-cols-2 gap-6 md:grid-cols-4">
        {STATS.map((s) => (
          <Counter key={s.label} stat={s} />
        ))}
      </div>
    </section>
  );
}

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, stat.value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setN(v),
    });
    return () => controls.stop();
  }, [inView, stat.value]);

  const display =
    stat.value % 1 === 0 ? Math.round(n).toLocaleString() : n.toFixed(1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-start"
    >
      <div className="font-display text-[2rem] tabular leading-none md:text-[2.5rem]">
        {display}
        <span className="text-saffron">{stat.suffix}</span>
      </div>
      <div className="mt-2 text-small text-paper/70">{stat.label}</div>
    </motion.div>
  );
}
