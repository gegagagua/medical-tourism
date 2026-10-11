import Link from 'next/link';
import { href, type PublicLocale, type StorySeed, formatMoney } from '@medtour/shared';
import { useLocale, useTranslations } from 'next-intl';

export function StoryCard({ story }: { story: StorySeed }) {
  const locale = useLocale() as PublicLocale;
  const t = useTranslations('sections.stories');
  const storiesHref = href('stories', locale);
  const detail = storiesHref ? `${storiesHref}/${story.slug}` : `/${locale}`;
  const paid = formatMoney(story.totalPaid, locale);

  return (
    <article className="panel">
      <div className="text-small text-ink-muted">
        <span className="rounded-full bg-mineral px-2 py-0.5 text-balcony">
          {t('readStory')}
        </span>
        <span className="ms-3">
          {story.patientFirstName} · {story.country} · {story.nights} nights · {paid}
        </span>
      </div>
      <p className="mt-4 text-lead text-ink">&ldquo;{story.excerpt}&rdquo;</p>
      <Link
        href={detail}
        className="mt-5 inline-block text-small font-medium text-balcony hover:underline"
      >
        {t('readStory')} →
      </Link>
    </article>
  );
}
