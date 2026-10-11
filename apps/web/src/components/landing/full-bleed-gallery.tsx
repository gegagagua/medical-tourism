'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { IMG } from '@/lib/media';

const PHOTOS = [
  { src: IMG.oldTown, label: 'Old Town' },
  { src: IMG.tbilisi1, label: 'Mtatsminda' },
  { src: IMG.tbilisi2, label: 'Rustaveli at dusk' },
  { src: IMG.bath, label: 'Sulphur baths' },
  { src: IMG.tbilisi4, label: 'Walkable centre' },
  { src: IMG.clinic1, label: 'Clinic interior' },
  { src: IMG.clinic3, label: 'Consultation room' },
  { src: IMG.airport, label: 'Arrival at TBS' },
];

// Edge-to-edge, no container. Infinite marquee of photos.
export function FullBleedGallery() {
  return (
    <section aria-label="Photos" className="relative overflow-hidden bg-ink py-8">
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      >
        {[...PHOTOS, ...PHOTOS].map((p, i) => (
          <figure
            key={`${p.src}-${i}`}
            className="relative inline-block aspect-[4/3] h-56 shrink-0 overflow-hidden rounded-panel md:h-64"
          >
            <Image
              src={p.src}
              alt={p.label}
              fill
              sizes="320px"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3 text-small text-paper">
              {p.label}
            </figcaption>
          </figure>
        ))}
      </motion.div>
    </section>
  );
}
