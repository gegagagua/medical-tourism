import { useTranslations } from 'next-intl';

export function StepSequence() {
  const t = useTranslations('sections.howItWorks');
  const steps = [1, 2, 3, 4, 5, 6] as const;
  return (
    <ol className="grid gap-6 md:grid-cols-2">
      {steps.map((n) => (
        <li key={n} className="flex gap-4">
          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line font-display tabular text-small text-ink"
          >
            {n}
          </span>
          <div>
            <h3 className="text-title font-medium">{t(`step${n}` as `step${1 | 2 | 3 | 4 | 5 | 6}`)}</h3>
            <p className="mt-1 text-ink-muted">
              {t(`step${n}Body` as `step${1 | 2 | 3 | 4 | 5 | 6}Body`)}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
