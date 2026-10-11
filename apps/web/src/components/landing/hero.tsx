import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { href, type PublicLocale } from '@medtour/shared';
import { TicketEstimator } from '@/components/ticket/ticket-estimator';
import { BookCallButton } from '@/features/booking/book-call-button';

export function Hero({
  variant = 'dental',
  defaultProcedureKey = 'dental-implants',
}: {
  variant?: 'dental' | 'hair';
  defaultProcedureKey?: string;
}) {
  const t = useTranslations('hero');
  const locale = useLocale() as PublicLocale;
  const requestHref = href('request', locale) ?? `/${locale}`;

  const title = variant === 'dental' ? t('titleDental') : t('titleHairTransplant');
  const subtitle = variant === 'dental' ? t('subtitleDental') : t('subtitleHair');

  return (
    <section className="pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="container grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-14">
        <div className="max-w-[640px]">
          <h1 className="font-display text-[2.4rem] leading-[1.05] md:text-display-xl">{title}</h1>
          <p className="mt-5 text-lead text-ink-muted">{subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={requestHref} className="btn btn-primary">
              {t('ctaPrimary')}
            </Link>
            <BookCallButton variant="secondary">{t('ctaSecondary')}</BookCallButton>
          </div>
          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-ink-muted">
            <li className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-balcony" aria-hidden /> {t('proof1')}
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-balcony" aria-hidden /> {t('proof2')}
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-balcony" aria-hidden /> {t('proof3')}
            </li>
          </ul>
        </div>
        <div>
          <TicketEstimator defaultProcedureKey={defaultProcedureKey} />
        </div>
      </div>
    </section>
  );
}
