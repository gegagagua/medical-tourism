'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { IMG } from '@/lib/media';

const PHOTOS = [
  { src: IMG.oldTown, label: 'Old Town, 10 min from the clinic', span: 'lg:col-span-2 lg:row-span-2' },
  { src: IMG.tbilisi1, label: 'Mtatsminda funicular', span: '' },
  { src: IMG.tbilisi2, label: 'Rustaveli at dusk', span: '' },
  { src: IMG.bath, label: 'Sulphur baths — from day 5', span: '' },
  { src: IMG.tbilisi4, label: 'Walkable neighbourhoods', span: 'lg:col-span-2' },
];

export function TbilisiGallery() {
  return (
    <section id="tbilisi" className="py-14 md:py-16">
      <div className="container">
        <div className="max-w-[640px]">
          <div className="text-small font-medium uppercase tracking-wide text-balcony">
            Tbilisi while you heal
          </div>
          <h2 className="mt-3 font-display text-display-l">
            Six quiet nights, not a hospital stay
          </h2>
          <p className="mt-3 text-lead text-ink-muted">
            Hotels within a 15-minute drive of the clinic. Streets you can actually walk. A bath
            you can use from day five.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:grid-rows-2">
          {PHOTOS.map((p, i) => (
            <motion.figure
              key={p.src}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className={`group relative aspect-[4/3] overflow-hidden rounded-panel ${p.span}`}
            >
              <Image
                src={p.src}
                alt={p.label}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent p-3 text-small text-paper">
                {p.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
