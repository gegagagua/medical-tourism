'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Languages, Stethoscope } from 'lucide-react';
import { IMG } from '@/lib/media';

const DOCTORS = [
  {
    name: 'Dr. Nino Kiknadze',
    role: 'Implantology · 14 years',
    languages: 'English · Russian · Georgian',
    photo: IMG.doctor1,
    clinic: 'Tbilisi Dental Studio',
  },
  {
    name: 'Dr. Marina Shalvashvili',
    role: 'Hair restoration · ISHRS member',
    languages: 'English · Russian · Hebrew',
    photo: IMG.doctor2,
    clinic: 'Batumi Hair & Smile',
  },
  {
    name: 'Dr. Giorgi Abramia',
    role: 'Surgical dentistry · 12 years',
    languages: 'English · Russian',
    photo: IMG.doctor3,
    clinic: 'Batumi Hair & Smile',
  },
  {
    name: 'Dr. Levan Makashvili',
    role: 'Prosthodontics · 9 years',
    languages: 'English · Georgian',
    photo: IMG.doctor4,
    clinic: 'Tbilisi Dental Studio',
  },
];

export function DoctorsGrid() {
  return (
    <section id="doctors" className="py-14 md:py-16">
      <div className="container">
        <div className="max-w-[640px]">
          <div className="text-small font-medium uppercase tracking-wide text-balcony">
            Named doctors
          </div>
          <h2 className="mt-3 font-display text-display-l">
            Doctors — not call-centres
          </h2>
          <p className="mt-3 text-lead text-ink-muted">
            Every treatment plan is signed by the dentist or surgeon who will perform the work.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DOCTORS.map((d, i) => (
            <motion.article
              key={d.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-panel border border-line bg-surface"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={d.photo}
                  alt={d.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/50 to-transparent p-5 text-paper">
                  <div className="text-small opacity-80">{d.clinic}</div>
                  <div className="text-title font-medium">{d.name}</div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start gap-2 text-small text-ink-muted">
                  <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-balcony" />
                  <span>{d.role}</span>
                </div>
                <div className="mt-2 flex items-start gap-2 text-small text-ink-muted">
                  <Languages className="mt-0.5 h-4 w-4 shrink-0 text-balcony" />
                  <span>{d.languages}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
