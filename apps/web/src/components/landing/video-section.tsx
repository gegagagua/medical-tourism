'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Clock, PhoneCall } from 'lucide-react';
import { YT_TOUR_ID, IMG } from '@/lib/media';
import { BookCallButton } from '@/features/booking/book-call-button';

export function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const poster = `https://i.ytimg.com/vi/${YT_TOUR_ID}/maxresdefault.jpg`;

  return (
    <section id="tour" className="relative isolate overflow-hidden py-14 md:py-16">
      <div className="absolute inset-0 -z-10">
        <Image src={IMG.airport} alt="" fill sizes="100vw" className="object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-paper via-paper/95 to-mineral/40" />
      </div>

      <div className="container grid gap-10 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:items-center">
        <div>
          <div className="text-small font-medium uppercase tracking-wide text-balcony">
            Take a tour
          </div>
          <h2 className="mt-3 font-display text-display-l">
            Two minutes inside a real trip
          </h2>
          <p className="mt-3 text-lead text-ink-muted">
            Watch what the day of arrival looks like: airport pickup, the drive, the first
            consultation. No stock footage.
          </p>
          <ul className="mt-6 grid gap-3 text-small">
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-balcony" /> 2 min 14 s
            </li>
            <li className="flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-balcony" /> Filmed in Tbilisi, 2026
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <BookCallButton>Talk to a coordinator</BookCallButton>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6 }}
          className="relative aspect-video overflow-hidden rounded-ticket border border-line bg-ink shadow-ticket"
        >
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${YT_TOUR_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Trip tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 flex items-center justify-center"
              aria-label="Play tour video"
            >
              <Image
                src={poster}
                alt=""
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-saffron text-ink shadow-ticket transition-transform group-hover:scale-110">
                <Play className="ms-1 h-8 w-8" fill="currentColor" />
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
