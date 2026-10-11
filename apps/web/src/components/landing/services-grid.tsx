'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { href, type PublicLocale } from '@medtour/shared';
import { IMG } from '@/lib/media';

interface Service {
  key: 'dental' | 'hair' | 'skin' | 'checkup';
  title: string;
  priceFrom: string;
  stay: string;
  image: string;
  href?: string;
}

export function ServicesGrid({ locale }: { locale: PublicLocale }) {
  const services: Service[] = [
    {
      key: 'dental',
      title: 'Dental implants, All-on-4, veneers',
      priceFrom: 'from $750 / implant',
      stay: '6 nights',
      image: IMG.specialtyDental,
      href: href('specialty-dentistry', locale) ?? undefined,
    },
    {
      key: 'hair',
      title: 'Hair transplant — FUE & DHI',
      priceFrom: 'from $1.50 / graft',
      stay: '4 nights',
      image: IMG.specialtyHair,
      href: href('specialty-hair', locale) ?? undefined,
    },
    {
      key: 'skin',
      title: 'Dermatology & aesthetic skin',
      priceFrom: 'from $90 / session',
      stay: '3 nights',
      image: IMG.specialtyDerm,
      href: href('specialty-dermatology', locale) ?? undefined,
    },
    {
      key: 'checkup',
      title: 'Full-body health checkup',
      priceFrom: 'from $390',
      stay: '2 nights',
      image: IMG.specialtyCheckup,
    },
  ];

  return (
    <section id="services" className="py-14 md:py-16">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[640px]">
            <div className="text-small font-medium uppercase tracking-wide text-balcony">
              What we help with
            </div>
            <h2 className="mt-3 font-display text-display-l">
              Four priorities. Everything else by request.
            </h2>
            <p className="mt-3 text-lead text-ink-muted">
              Dentistry comes first because it is the easiest to plan from a photo and an X-ray.
              Hair, skin and screening follow. For anything else, a coordinator pairs you with
              a clinic by hand.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <ServiceCard service={s} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const classes =
    'group relative block overflow-hidden rounded-panel border border-line bg-surface transition-shadow hover:shadow-ticket hover:no-underline';
  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
        <span className="absolute start-4 top-4 rounded-full bg-surface/90 px-2.5 py-1 text-small font-medium text-ink backdrop-blur">
          {service.priceFrom}
        </span>
      </div>
      <div className="p-5">
        <div className="text-small text-ink-muted">{service.stay}</div>
        <h3 className="mt-1 font-medium text-ink">{service.title}</h3>
        <span className="mt-3 inline-flex items-center gap-1 text-small font-medium text-balcony">
          Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
    </>
  );
  return service.href ? (
    <Link href={service.href} className={classes}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}
