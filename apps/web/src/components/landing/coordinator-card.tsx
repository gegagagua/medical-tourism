import { useTranslations } from 'next-intl';
import { BookCallButton } from '@/features/booking/book-call-button';

export function CoordinatorCard() {
  const t = useTranslations('sections.coordinator');
  return (
    <div className="panel grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
      <div
        aria-hidden
        className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-mineral font-display text-display-l text-balcony md:h-44 md:w-44"
      >
        N
      </div>
      <div>
        <div className="text-title font-medium">Nino Kiknadze</div>
        <div className="mt-1 text-small text-ink-muted">
          {t('languagesLabel')}: English · Russian · Georgian
        </div>
        <p className="mt-3 text-ink-muted">
          Replies within one working hour. Meets patients at TBS in person for first visits.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <BookCallButton />
          <a className="btn btn-secondary" href="https://wa.me/" rel="noreferrer nofollow">
            {t('whatsapp')}
          </a>
        </div>
        <p className="mt-3 text-small text-ink-muted">{t('slotsIn')}</p>
      </div>
    </div>
  );
}
