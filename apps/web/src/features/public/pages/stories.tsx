import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { STORIES, formatMoney, type PublicLocale } from '@medtour/shared';
import { Container, Section } from '@/components/ui/container';
import { PageHero, Breadcrumbs } from './_shared';
import { StoryCard } from '@/components/landing/story-card';

export async function StoriesIndexPage({ locale }: { locale: PublicLocale }) {
  const t = await getTranslations({ locale, namespace: 'pages.stories' });
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ key: 'stories', label: t('title') }]} />
      <PageHero eyebrow="Stories" title={t('title')} intro={t('title')} locale={locale} cta="none" />
      <Section>
        <Container>
          <ul className="grid gap-4 md:grid-cols-2">
            {STORIES.map((s) => (
              <li key={s.slug}>
                <StoryCard story={s} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}

export async function StoryDetailPage({
  locale,
  slug,
}: {
  locale: PublicLocale;
  slug: string;
}) {
  const story = STORIES.find((s) => s.slug === slug);
  if (!story) notFound();
  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { key: 'stories', label: 'Stories' },
          { href: '', label: story.patientFirstName },
        ]}
      />
      <Section className="pt-6">
        <Container className="max-w-[760px]">
          <h1 className="font-display text-display-l">
            {story.patientFirstName}, {story.country}
          </h1>
          <div className="mt-2 text-ink-muted">
            {story.procedureKey} · {story.nights} nights · {formatMoney(story.totalPaid, locale)}
          </div>
          <p className="mt-6 text-lead">&ldquo;{story.excerpt}&rdquo;</p>
        </Container>
      </Section>
    </>
  );
}
