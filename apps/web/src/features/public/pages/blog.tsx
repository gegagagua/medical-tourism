import type { PublicLocale } from '@medtour/shared';
import { PageHero, Breadcrumbs } from './_shared';

export async function BlogIndexPage({ locale }: { locale: PublicLocale }) {
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ key: 'blog', label: 'Blog' }]} />
      <PageHero
        eyebrow="Blog"
        title="Articles reviewed by named doctors"
        intro="Writing is only published after a named doctor reviews it. Reviewed dates are on each article."
        locale={locale}
        cta="none"
      />
    </>
  );
}
