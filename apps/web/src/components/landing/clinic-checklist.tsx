import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ClinicCheckList() {
  const t = useTranslations('sections.clinics');
  const items = [
    t('licenseVerified'),
    t('insurance'),
    t('warranty'),
    t('siteVisit'),
    t('contract'),
  ];
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((label) => (
        <li key={label} className="flex items-start gap-3">
          <span
            aria-hidden
            className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-mineral text-balcony"
          >
            <Check className="h-3.5 w-3.5" />
          </span>
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}
