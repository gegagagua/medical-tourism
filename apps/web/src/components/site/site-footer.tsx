import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { href, type PublicLocale } from '@medtour/shared';
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa';

export function SiteFooter({ locale }: { locale: PublicLocale }) {
  const t = useTranslations();

  const specialtyLinks = [
    { k: 'specialty-dentistry' as const, label: t('nav.dental') },
    { k: 'specialty-hair' as const, label: t('nav.hair') },
    { k: 'specialty-dermatology' as const, label: t('nav.skin') },
  ];

  const siteLinks = [
    { k: 'how-it-works' as const, label: t('nav.howItWorks') },
    { k: 'prices' as const, label: t('nav.prices') },
    { k: 'clinics' as const, label: t('nav.clinics') },
    { k: 'faq' as const, label: t('footer.faq') },
    { k: 'tbilisi-guide' as const, label: 'Tbilisi guide' },
  ];

  return (
    <footer className="relative isolate mt-24 bg-ink text-paper">
      {/* Newsletter card lifted out of the ink */}
      <div className="container -translate-y-12">
        <div className="relative overflow-hidden rounded-ticket border border-balcony/30 bg-balcony p-8 text-paper shadow-ticket md:p-10">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-saffron/30 blur-3xl" />
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:items-center">
            <div>
              <h2 className="font-display text-[1.75rem] leading-tight md:text-[2.25rem]">
                A quiet newsletter — once a month.
              </h2>
              <p className="mt-2 text-paper/80">
                Real prices, new partner clinics, one patient story. No spam, unsubscribe in one
                click.
              </p>
            </div>
            <form className="flex flex-col gap-2 sm:flex-row" action="#" method="post">
              <label className="sr-only" htmlFor="newsletter-email">
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@email.com"
                className="input w-full bg-surface text-ink placeholder:text-ink-muted"
              />
              <button type="submit" className="btn btn-primary shrink-0">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container -mt-6 grid gap-12 pb-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 hover:no-underline">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-saffron text-ink">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <span className="font-display text-lead font-medium">{t('brand.name')}</span>
          </Link>
          <p className="mt-4 max-w-sm text-small text-paper/70">{t('brand.disclaimer')}</p>
          <p className="mt-2 max-w-sm text-small text-paper/70">{t('footer.notAClinic')}</p>

          <ul className="mt-6 grid gap-2 text-small">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-saffron" /> 11 Rustaveli Avenue, Tbilisi 0108
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-saffron" /> +995 32 2 123 456
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-saffron" /> care@medtour.ge
            </li>
          </ul>

          <div className="mt-6 flex items-center gap-2">
            {[
              { href: 'https://wa.me/995322123456', label: 'WhatsApp', Icon: FaWhatsapp },
              { href: 'https://t.me/medtour_ge', label: 'Telegram', Icon: FaTelegramPlane },
              { href: 'https://instagram.com/', label: 'Instagram', Icon: FaInstagram },
              { href: 'https://facebook.com/', label: 'Facebook', Icon: FaFacebookF },
              { href: 'https://youtube.com/', label: 'YouTube', Icon: FaYoutube },
              { href: 'https://tiktok.com/', label: 'TikTok', Icon: FaTiktok },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer nofollow"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 bg-paper/5 text-paper transition-transform hover:-translate-y-0.5 hover:bg-paper/10 hover:no-underline"
              >
                <s.Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <nav className="md:col-span-3" aria-labelledby="foot-specialties">
          <h2 id="foot-specialties" className="text-small font-medium uppercase tracking-wide text-paper/70">
            {t('footer.specialties')}
          </h2>
          <ul className="mt-4 grid gap-2 text-small">
            {specialtyLinks.map((it) => {
              const h = href(it.k, locale);
              return h ? (
                <li key={it.k}>
                  <Link href={h} className="text-paper/80 hover:text-paper">
                    {it.label}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </nav>

        <nav className="md:col-span-3" aria-labelledby="foot-site">
          <h2 id="foot-site" className="text-small font-medium uppercase tracking-wide text-paper/70">
            Help
          </h2>
          <ul className="mt-4 grid gap-2 text-small">
            {siteLinks.map((it) => {
              const h = href(it.k, locale);
              return h ? (
                <li key={it.k}>
                  <Link href={h} className="text-paper/80 hover:text-paper">
                    {it.label}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </nav>

        <nav className="md:col-span-2" aria-labelledby="foot-legal">
          <h2 id="foot-legal" className="text-small font-medium uppercase tracking-wide text-paper/70">
            {t('footer.legal')}
          </h2>
          <ul className="mt-4 grid gap-2 text-small">
            <li><span className="text-paper/80">{t('footer.privacy')}</span></li>
            <li><span className="text-paper/80">{t('footer.terms')}</span></li>
            <li><span className="text-paper/80">{t('footer.cookies')}</span></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-paper/10">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-6 text-small text-paper/60">
          <span>© {new Date().getFullYear()} {t('brand.name')}. All rights reserved.</span>
          <span>Payments by Mastercard · Visa · Apple Pay · Google Pay</span>
        </div>
      </div>
    </footer>
  );
}
