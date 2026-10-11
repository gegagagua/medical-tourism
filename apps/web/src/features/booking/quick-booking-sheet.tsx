'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  CLINICS,
  PROCEDURES,
  PUBLIC_LOCALES,
  formatMoney,
  procedureByKey,
  type PublicLocale,
} from '@medtour/shared';
import {
  Check,
  Hotel,
  Car,
  Users,
  CalendarDays,
  Stethoscope,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { Sheet } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

// A simple 4-step service booking: service → trip → add-ons → contact.
// The treatment price is a median of partner clinic prices (USD cents) so the
// visitor sees a realistic total before the clinic sends the exact plan.

interface HotelTier {
  key: 'none' | 'standard' | 'comfort' | 'premium';
  label: string;
  perNight: number; // minor units USD
}

const HOTELS: HotelTier[] = [
  { key: 'none', label: 'No hotel — I will book my own', perNight: 0 },
  { key: 'standard', label: '3★ boutique near the clinic', perNight: 6000 },
  { key: 'comfort', label: '4★ comfort hotel', perNight: 11000 },
  { key: 'premium', label: '5★ premium stay', perNight: 20000 },
];

const TRANSFER_PRICE = 4000; // $40 round-trip airport

const DENTAL_KEYS = ['dental-implants', 'all-on-4', 'veneers', 'crowns', 'cleaning', 'bone-graft'];
const HAIR_KEYS = ['fue', 'dhi'];

export function QuickBookingSheet({
  open,
  onOpenChange,
  defaultProcedureKey,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  defaultProcedureKey?: string;
}) {
  const t = useTranslations();
  const locale = useLocale() as PublicLocale;

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [procedureKey, setProcedureKey] = useState<string>(
    defaultProcedureKey ?? 'dental-implants',
  );
  const [quantity, setQuantity] = useState(1);
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [companions, setCompanions] = useState(0);
  const [hotel, setHotel] = useState<HotelTier['key']>('comfort');
  const [transfer, setTransfer] = useState<'yes' | 'no'>('yes');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    language: locale,
    notes: '',
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const procedure = procedureByKey(procedureKey);

  // Median clinic USD price for this procedure.
  const treatmentUsd = useMemo(() => {
    const prices = CLINICS.flatMap((c) =>
      c.prices.filter((p) => p.procedureKey === procedureKey),
    );
    if (!prices.length) return null;
    const mids = prices.map((p) => (p.min + p.max) / 2);
    const avg = mids.reduce((a, b) => a + b, 0) / mids.length;
    return Math.round(avg);
  }, [procedureKey]);

  const nights = useMemo(() => {
    if (arrival && departure) {
      const a = new Date(arrival).getTime();
      const d = new Date(departure).getTime();
      const n = Math.round((d - a) / (1000 * 60 * 60 * 24));
      if (n >= 1 && n <= 30) return n;
    }
    return procedure?.typicalStayDays ?? 6;
  }, [arrival, departure, procedure?.typicalStayDays]);

  const hotelTier = HOTELS.find((h) => h.key === hotel)!;
  const hotelTotal = hotelTier.perNight * nights * Math.max(1, 1 + companions > 0 ? 1 : 1);
  const transferTotal = transfer === 'yes' ? TRANSFER_PRICE : 0;
  const treatmentTotal = (treatmentUsd ?? 0) * Math.max(1, quantity);
  const grandTotal = treatmentTotal + hotelTotal + transferTotal;

  async function submit() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    setSubmitting(false);
    setDone(true);
    setStep(5);
  }

  function reset() {
    setStep(1);
    setDone(false);
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) reset();
        onOpenChange(v);
      }}
      title="Book your treatment"
    >
      {!done && <Progress step={step} />}

      {step === 1 && (
        <section aria-labelledby="qb1" className="mt-5">
          <h3 id="qb1" className="flex items-center gap-2 text-title font-medium">
            <Stethoscope className="h-4 w-4 text-balcony" /> Choose a treatment
          </h3>
          <div className="mt-3 flex flex-wrap gap-1.5 text-small">
            {['Dentistry', 'Hair', 'Other'].map((g) => (
              <span key={g} className="rounded-full border border-line px-2.5 py-0.5 text-ink-muted">
                {g}
              </span>
            ))}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {PROCEDURES.filter((p) =>
              [...DENTAL_KEYS, ...HAIR_KEYS].includes(p.key),
            )
              .concat(
                // Append pseudo-procedures that aren't in the seed yet.
                [
                  { key: 'crowns', specialty: 'dentistry' } as const,
                  { key: 'bone-graft', specialty: 'dentistry' } as const,
                ].map((x) => x as unknown as (typeof PROCEDURES)[number]),
              )
              .map((p) => {
                const selected = procedureKey === p.key;
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setProcedureKey(p.key)}
                    className={cn(
                      'flex items-start justify-between gap-2 rounded-input border p-3 text-start transition-colors',
                      selected
                        ? 'border-balcony bg-balcony/5 text-ink'
                        : 'border-line bg-surface text-ink hover:border-balcony/50',
                    )}
                  >
                    <span>
                      <span className="block font-medium">{labelFor(p.key)}</span>
                      <span className="block text-small text-ink-muted">
                        {unitLabel(p.key)} · typical {p.typicalStayDays ?? '—'} nights
                      </span>
                    </span>
                    {selected && <Check className="mt-0.5 h-4 w-4 text-balcony" />}
                  </button>
                );
              })}
          </div>

          {unitIsCountable(procedureKey) && (
            <label className="mt-4 flex items-center justify-between gap-3 rounded-input border border-line bg-surface p-3">
              <span className="text-small font-medium">How many?</span>
              <input
                type="number"
                min={1}
                max={32}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="input w-24 tabular"
              />
            </label>
          )}

          <RunningTotal treatment={treatmentTotal} hotel={0} transfer={0} locale={locale} />
          <NavButtons onNext={() => setStep(2)} nextDisabled={!procedure && !['crowns', 'bone-graft'].includes(procedureKey)} />
        </section>
      )}

      {step === 2 && (
        <section aria-labelledby="qb2" className="mt-5">
          <h3 id="qb2" className="flex items-center gap-2 text-title font-medium">
            <CalendarDays className="h-4 w-4 text-balcony" /> When will you travel?
          </h3>
          <p className="mt-1 text-small text-ink-muted">
            Not sure yet? Pick a rough window — the coordinator confirms with the clinic.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-small text-ink-muted">Arrival</span>
              <input
                type="date"
                className="input mt-1"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-small text-ink-muted">Departure</span>
              <input
                type="date"
                className="input mt-1"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="text-small text-ink-muted flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" /> Companions
            </span>
            <input
              type="number"
              min={0}
              max={5}
              value={companions}
              onChange={(e) => setCompanions(Number(e.target.value) || 0)}
              className="input mt-1 tabular"
            />
          </label>

          <div className="mt-4 rounded-input border border-dashed border-line bg-paper p-3 text-small text-ink-muted">
            Estimated stay: <span className="font-medium text-ink tabular">{nights} nights</span>{' '}
            (based on {procedure?.typicalStayDays ?? 6}-night typical plan)
          </div>

          <RunningTotal treatment={treatmentTotal} hotel={0} transfer={0} locale={locale} />
          <NavButtons onBack={() => setStep(1)} onNext={() => setStep(3)} />
        </section>
      )}

      {step === 3 && (
        <section aria-labelledby="qb3" className="mt-5">
          <h3 id="qb3" className="flex items-center gap-2 text-title font-medium">
            <Hotel className="h-4 w-4 text-balcony" /> Where will you stay?
          </h3>
          <p className="mt-1 text-small text-ink-muted">
            Partner hotels within a 15-minute drive of the clinic. Prices per room, per night.
          </p>
          <div className="mt-4 grid gap-2">
            {HOTELS.map((h) => {
              const selected = h.key === hotel;
              return (
                <button
                  key={h.key}
                  type="button"
                  onClick={() => setHotel(h.key)}
                  className={cn(
                    'flex items-center justify-between gap-3 rounded-input border p-3 text-start transition-colors',
                    selected
                      ? 'border-balcony bg-balcony/5'
                      : 'border-line bg-surface hover:border-balcony/50',
                  )}
                >
                  <span>
                    <span className="block font-medium">{h.label}</span>
                    {h.perNight > 0 ? (
                      <span className="block text-small text-ink-muted">
                        {formatMoney({ amount: h.perNight, currency: 'USD' }, locale)} / night ·{' '}
                        {formatMoney(
                          { amount: h.perNight * nights, currency: 'USD' },
                          locale,
                        )}{' '}
                        total
                      </span>
                    ) : (
                      <span className="block text-small text-ink-muted">No hotel added</span>
                    )}
                  </span>
                  {selected && <Check className="h-4 w-4 shrink-0 text-balcony" />}
                </button>
              );
            })}
          </div>

          <h3 className="mt-6 flex items-center gap-2 text-title font-medium">
            <Car className="h-4 w-4 text-balcony" /> Airport transfer
          </h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(
              [
                {
                  key: 'yes' as const,
                  label: 'Round-trip, met at TBS',
                  sub: `${formatMoney({ amount: TRANSFER_PRICE, currency: 'USD' }, locale)} both ways`,
                },
                {
                  key: 'no' as const,
                  label: 'No — I will arrange my own',
                  sub: 'Taxi or metro',
                },
              ]
            ).map((opt) => {
              const selected = opt.key === transfer;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setTransfer(opt.key)}
                  className={cn(
                    'flex items-start justify-between gap-2 rounded-input border p-3 text-start transition-colors',
                    selected
                      ? 'border-balcony bg-balcony/5'
                      : 'border-line bg-surface hover:border-balcony/50',
                  )}
                >
                  <span>
                    <span className="block font-medium">{opt.label}</span>
                    <span className="block text-small text-ink-muted">{opt.sub}</span>
                  </span>
                  {selected && <Check className="mt-0.5 h-4 w-4 shrink-0 text-balcony" />}
                </button>
              );
            })}
          </div>

          <RunningTotal
            treatment={treatmentTotal}
            hotel={hotelTotal}
            transfer={transferTotal}
            nights={nights}
            locale={locale}
          />
          <NavButtons onBack={() => setStep(2)} onNext={() => setStep(4)} />
        </section>
      )}

      {step === 4 && (
        <section aria-labelledby="qb4" className="mt-5">
          <h3 id="qb4" className="text-title font-medium">
            Your details
          </h3>
          <div className="mt-4 grid gap-3">
            <label className="block">
              <span className="text-small text-ink-muted">Full name</span>
              <input
                className="input mt-1"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-small text-ink-muted">Email</span>
                <input
                  className="input mt-1"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </label>
              <label className="block">
                <span className="text-small text-ink-muted">Phone / WhatsApp</span>
                <input
                  className="input mt-1"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </label>
            </div>
            <label className="block">
              <span className="text-small text-ink-muted">Language</span>
              <select
                className="input mt-1"
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value as PublicLocale })}
              >
                {PUBLIC_LOCALES.map((l) => (
                  <option key={l} value={l}>
                    {l.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-small text-ink-muted">
                Notes for the coordinator (optional)
              </span>
              <textarea
                className="input mt-1 min-h-24"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </label>
            <label className="mt-1 flex items-start gap-2 text-small text-ink-muted">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              />
              <span>
                I agree to be contacted about this request and have read the privacy notice.
              </span>
            </label>
          </div>

          <RunningTotal
            treatment={treatmentTotal}
            hotel={hotelTotal}
            transfer={transferTotal}
            nights={nights}
            locale={locale}
          />
          <div className="mt-6 flex items-center justify-between">
            <Button variant="secondary" onClick={() => setStep(3)}>
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> Back
            </Button>
            <Button
              disabled={!form.consent || !form.name || !form.email || submitting}
              onClick={submit}
            >
              {submitting ? 'Submitting…' : 'Request plan'}
            </Button>
          </div>
          <p className="mt-3 text-small text-ink-muted">
            You will not be charged yet. The deposit is paid online only after you accept the
            clinic&apos;s written plan.
          </p>
        </section>
      )}

      {step === 5 && (
        <section aria-labelledby="qb5" className="mt-5">
          <div className="rounded-panel border border-balcony/40 bg-balcony/5 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-6 w-6 text-balcony" />
              <div>
                <h3 id="qb5" className="text-title font-medium">
                  Request received
                </h3>
                <p className="mt-1 text-ink-muted">
                  Your coordinator will reply within one working hour with the clinic&apos;s
                  written plan and the final fixed price.
                </p>
              </div>
            </div>
          </div>
          <dl className="mt-5 grid gap-2 text-small">
            <SummaryRow label="Treatment" value={`${labelFor(procedureKey)} × ${quantity}`} />
            <SummaryRow label="Dates" value={`${arrival || 'TBC'} → ${departure || 'TBC'} · ${nights} nights`} />
            <SummaryRow label="Hotel" value={hotelTier.label} />
            <SummaryRow label="Transfer" value={transfer === 'yes' ? 'Round-trip at TBS' : 'Self-arranged'} />
            <SummaryRow
              label="Indicative total"
              value={formatMoney({ amount: grandTotal, currency: 'USD' }, locale)}
              strong
            />
          </dl>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </section>
      )}
    </Sheet>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <ol
      aria-label="Booking progress"
      className="flex items-center gap-1.5"
    >
      {[1, 2, 3, 4].map((n) => (
        <li
          key={n}
          className={cn(
            'h-1 flex-1 rounded-full',
            n <= step ? 'bg-balcony' : 'bg-line',
          )}
          aria-current={n === step ? 'step' : undefined}
        />
      ))}
    </ol>
  );
}

function RunningTotal({
  treatment,
  hotel,
  transfer,
  nights,
  locale,
}: {
  treatment: number;
  hotel: number;
  transfer: number;
  nights?: number;
  locale: string;
}) {
  const total = treatment + hotel + transfer;
  const fmt = (v: number) => formatMoney({ amount: v, currency: 'USD' }, locale);
  return (
    <div className="mt-5 rounded-panel border border-line bg-surface p-4">
      <div className="text-small font-medium text-ink-muted">Indicative total</div>
      <dl className="mt-2 grid gap-1 text-small">
        <div className="flex items-center justify-between">
          <dt className="text-ink-muted">Treatment</dt>
          <dd className="tabular">{fmt(treatment)}</dd>
        </div>
        {hotel > 0 && (
          <div className="flex items-center justify-between">
            <dt className="text-ink-muted">Hotel{nights ? ` × ${nights} nights` : ''}</dt>
            <dd className="tabular">{fmt(hotel)}</dd>
          </div>
        )}
        {transfer > 0 && (
          <div className="flex items-center justify-between">
            <dt className="text-ink-muted">Airport transfer</dt>
            <dd className="tabular">{fmt(transfer)}</dd>
          </div>
        )}
        <div className="mt-1 flex items-center justify-between border-t border-dashed border-line pt-2">
          <dt className="font-medium">Total</dt>
          <dd className="font-display tabular text-title">{fmt(total)}</dd>
        </div>
      </dl>
      <p className="mt-2 text-small text-ink-muted">
        Deposit online · balance at the clinic. Final price confirmed in writing.
      </p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-2 last:border-0 last:pb-0">
      <dt className="text-ink-muted">{label}</dt>
      <dd className={cn('text-end tabular', strong && 'font-display text-title')}>{value}</dd>
    </div>
  );
}

function NavButtons({
  onBack,
  onNext,
  nextDisabled,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
}) {
  return (
    <div className="mt-6 flex items-center justify-between">
      {onBack ? (
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> Back
        </Button>
      ) : (
        <span />
      )}
      {onNext && (
        <Button onClick={onNext} disabled={nextDisabled}>
          Continue <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Button>
      )}
    </div>
  );
}

function labelFor(key: string): string {
  switch (key) {
    case 'dental-implants':
      return 'Dental implant';
    case 'all-on-4':
      return 'All-on-4 (one arch)';
    case 'veneers':
      return 'Ceramic veneer';
    case 'crowns':
      return 'Zirconium crown';
    case 'cleaning':
      return 'Professional cleaning';
    case 'bone-graft':
      return 'Bone graft / sinus lift';
    case 'fue':
      return 'FUE hair transplant';
    case 'dhi':
      return 'DHI hair transplant';
    default:
      return key;
  }
}

function unitLabel(key: string): string {
  switch (key) {
    case 'dental-implants':
    case 'veneers':
    case 'crowns':
      return 'per unit';
    case 'all-on-4':
      return 'per arch';
    case 'fue':
    case 'dhi':
      return 'per graft';
    case 'cleaning':
      return 'per visit';
    case 'bone-graft':
      return 'per site';
    default:
      return '';
  }
}

function unitIsCountable(key: string): boolean {
  return ['dental-implants', 'veneers', 'crowns', 'fue', 'dhi'].includes(key);
}
