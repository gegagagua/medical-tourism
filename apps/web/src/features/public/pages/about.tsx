import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { PublicLocale } from '@medtour/shared';
import { Check, ShieldCheck, Users, Timer, Globe2 } from 'lucide-react';
import { Container, Section } from '@/components/ui/container';
import { PageHero, Breadcrumbs } from './_shared';
import { JsonLd } from '@/components/seo/jsonld';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { IMG } from '@/lib/media';

export async function AboutPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.about' });

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', url: `/${locale}` },
          { name: t('title'), url: `/${locale}/about-us` },
        ])}
      />

      <Breadcrumbs locale={locale} items={[{ key: 'about-us', label: t('title') }]} />

      {/* Full-bleed photo hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src={IMG.oldTown} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/85 to-paper/40" />
        </div>
        <div className="container py-20 md:py-28">
          <div className="max-w-[720px]">
            <div className="text-small font-medium uppercase tracking-wide text-balcony">
              Medtour Georgia
            </div>
            <h1 className="mt-3 font-display text-display-l md:text-[3rem]">{t('title')}</h1>
            <p className="mt-4 text-lead text-ink-muted">{t('intro')}</p>
          </div>
        </div>
      </section>

      {/* Mission + warranty */}
      <Section>
        <Container className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-title font-medium">{t('missionTitle')}</h2>
            <p className="mt-3 text-ink-muted">{t('missionBody')}</p>
          </div>
          <div>
            <h2 className="text-title font-medium">{t('warrantyTitle')}</h2>
            <p className="mt-3 text-ink-muted">{t('warrantyBody')}</p>
          </div>
        </Container>
      </Section>

      {/* Numbers band */}
      <section className="border-y border-line bg-ink text-paper">
        <div className="container grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {[
            { v: '1,200+', label: 'Patients treated' },
            { v: '12', label: 'Vetted clinics' },
            { v: '70%', label: 'Typical savings' },
            { v: '4.9/5', label: 'Average rating' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display tabular text-[2rem] md:text-[2.5rem]">
                {s.v.split('').map((ch, i) =>
                  /\d/.test(ch) ? (
                    <span key={i}>{ch}</span>
                  ) : (
                    <span key={i} className="text-saffron">
                      {ch}
                    </span>
                  ),
                )}
              </div>
              <div className="mt-2 text-small text-paper/70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <Section>
        <Container>
          <h2 className="font-display text-display-l">{t('whyUs')}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {(['a', 'b', 'c', 'd'] as const).map((k) => (
              <li key={k} className="panel">
                <span className="flex h-10 w-10 items-center justify-center rounded-input bg-mineral text-balcony">
                  <Check className="h-5 w-5" />
                </span>
                <p className="mt-4 text-ink">{t(`whyUsItems.${k}`)}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Team */}
      <Section className="bg-mineral/30">
        <Container>
          <div className="max-w-[640px]">
            <h2 className="font-display text-display-l">{t('teamTitle')}</h2>
            <p className="mt-3 text-lead text-ink-muted">{t('teamBody')}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Nino K.', role: 'Head coordinator', img: IMG.doctor1 },
              { name: 'Dr. Marina S.', role: 'Medical reviewer', img: IMG.doctor2 },
              { name: 'Dr. Giorgi A.', role: 'Dental advisor', img: IMG.doctor3 },
              { name: 'Dr. Levan M.', role: 'Prosthodontist', img: IMG.doctor4 },
            ].map((p) => (
              <article key={p.name} className="overflow-hidden rounded-panel border border-line bg-surface">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={p.img} alt={p.name} fill sizes="25vw" className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-small text-ink-muted">{p.role}</div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section>
        <Container>
          <h2 className="font-display text-display-l">{t('timelineTitle')}</h2>
          <ol className="relative mt-10 border-s border-line ps-6">
            {[
              { year: '2024 Q1', body: t('timeline1'), icon: Users },
              { year: '2024 Q4', body: t('timeline2'), icon: Timer },
              { year: '2025 Q3', body: t('timeline3'), icon: Globe2 },
              { year: '2026', body: t('timeline4'), icon: ShieldCheck },
            ].map((item) => (
              <li key={item.year} className="mb-8 last:mb-0">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-balcony text-paper">
                  <item.icon className="h-3.5 w-3.5" />
                </span>
                <div className="text-small font-medium text-balcony">{item.year}</div>
                <p className="mt-1 text-ink-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Not a clinic */}
      <Section className="pb-20">
        <Container className="max-w-[760px]">
          <div className="rounded-panel border border-line bg-surface p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-balcony" />
              <p className="text-ink-muted">{t('notAClinic')}</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
