import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { PublicLocale } from '@medtour/shared';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa';
import { Container, Section } from '@/components/ui/container';
import { PageHero, Breadcrumbs } from './_shared';
import { ContactForm } from '@/features/contact/contact-form';
import { JsonLd } from '@/components/seo/jsonld';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { IMG } from '@/lib/media';

export async function ContactPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.contact' });

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', url: `/${locale}` },
          { name: t('title'), url: `/${locale}/contact` },
        ])}
      />
      <Breadcrumbs locale={locale} items={[{ key: 'contact', label: t('title') }]} />

      {/* Full-bleed office photo band */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src={IMG.clinic2} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/90 to-paper/40" />
        </div>
        <div className="container py-20 md:py-24">
          <div className="max-w-[720px]">
            <div className="text-small font-medium uppercase tracking-wide text-balcony">Contact</div>
            <h1 className="mt-3 font-display text-display-l md:text-[3rem]">{t('title')}</h1>
            <p className="mt-4 text-lead text-ink-muted">{t('intro')}</p>
          </div>
        </div>
      </section>

      {/* Fast-contact cards */}
      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-4">
            <FastCard
              Icon={FaWhatsapp}
              title={t('whatsapp')}
              value="+995 32 2 123 456"
              href="https://wa.me/995322123456"
              color="#25D366"
            />
            <FastCard
              Icon={FaTelegramPlane}
              title={t('telegram')}
              value="@medtour_ge"
              href="https://t.me/medtour_ge"
              color="#229ED9"
            />
            <FastCard
              Icon={Phone}
              title={t('phone')}
              value="+995 32 2 123 456"
              href="tel:+995322123456"
              color="#2E6B66"
            />
            <FastCard
              Icon={Mail}
              title={t('email')}
              value="care@medtour.ge"
              href="mailto:care@medtour.ge"
              color="#E2A12B"
            />
          </div>
        </Container>
      </Section>

      {/* Form + info + map */}
      <Section className="bg-mineral/30">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div>
            <h2 className="font-display text-display-l">{t('formTitle')}</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
          <aside className="grid content-start gap-5">
            <InfoRow Icon={MapPin} title={t('address')} value={t('addressValue')} />
            <InfoRow Icon={Clock} title={t('hours')} value={t('hoursValue')} />
            <InfoRow Icon={Phone} title={t('phone')} value="+995 32 2 123 456" />
            <InfoRow Icon={Mail} title={t('email')} value="care@medtour.ge" />
            <div className="mt-2">
              <div className="text-small font-medium text-ink-muted">Follow</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { href: 'https://instagram.com/', Icon: FaInstagram, label: 'Instagram' },
                  { href: 'https://facebook.com/', Icon: FaFacebookF, label: 'Facebook' },
                  { href: 'https://youtube.com/', Icon: FaYoutube, label: 'YouTube' },
                  { href: 'https://tiktok.com/', Icon: FaTiktok, label: 'TikTok' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer nofollow"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink hover:-translate-y-0.5 hover:no-underline"
                  >
                    <s.Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </Container>
      </Section>

      {/* Full-bleed map */}
      <section aria-label="Office map" className="h-[460px] w-full">
        <iframe
          title="Office location in Tbilisi"
          src="https://www.google.com/maps?q=Rustaveli%20Avenue%2011%20Tbilisi&output=embed"
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block border-0"
        />
      </section>
    </>
  );
}

function FastCard({
  Icon,
  title,
  value,
  href,
  color,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href: string;
  color: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer nofollow"
      className="group panel transition-all hover:-translate-y-0.5 hover:no-underline hover:shadow-ticket"
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-input text-white"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="mt-4 text-small text-ink-muted">{title}</div>
      <div className="mt-1 font-medium text-ink group-hover:text-balcony">{value}</div>
    </a>
  );
}

function InfoRow({
  Icon,
  title,
  value,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-input bg-surface text-balcony">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="text-small text-ink-muted">{title}</div>
        <div className="mt-0.5 font-medium">{value}</div>
      </div>
    </div>
  );
}
