import { useTranslations } from 'next-intl';

export function ComparisonTable() {
  const t = useTranslations('sections.compare');
  const rows: Array<[string, string, string]> = [
    ['Patients per clinic per week', 'Low (15–25)', 'High (50–150)'],
    ['Dedicated coordinator', 'Yes, named', 'Shared desk'],
    ['Written warranty policy', 'Required by platform', 'Varies by clinic'],
    ['Direct flight time from UK', '5h 30m', '4h 00m'],
    ['Typical implant price (per unit)', '$750–1,100', '$450–900'],
    ['Hotel standard around clinic', 'Boutique, 3–4★', 'Chain, 4–5★'],
    ['Visa for most EU/UK/IL', 'Not required (365 days)', 'Not required (90 days)'],
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-small text-ink-muted">
            <th className="border-b border-line py-3 text-start font-medium">{t('colAspect')}</th>
            <th className="border-b border-line py-3 text-start font-medium">{t('colGeorgia')}</th>
            <th className="border-b border-line py-3 text-start font-medium">{t('colTurkey')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, g, tu]) => (
            <tr key={a} className="border-b border-line">
              <th scope="row" className="py-4 text-start font-medium">
                {a}
              </th>
              <td className="py-4 bg-mineral/30">{g}</td>
              <td className="py-4">{tu}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
