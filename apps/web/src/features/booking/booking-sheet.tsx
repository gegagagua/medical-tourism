'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { CALL_TYPES, PUBLIC_LOCALES, type CallType, type PublicLocale } from '@medtour/shared';
import { Sheet } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Three-step booking (DESIGN.md §5 §5): call type → slot → details → done.
// No account needed (SPEC §4.12). This is the shell + validation only; wiring to a
// `/consultations/slots` endpoint lives behind the API work.
export function BookingSheet({
  open,
  onOpenChange,
  defaultProcedureKey = '',
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  defaultProcedureKey?: string;
}) {
  const t = useTranslations('bookingSheet');
  const locale = useLocale() as PublicLocale;
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [callType, setCallType] = useState<CallType>('WHATSAPP_VIDEO');
  const [slot, setSlot] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    language: locale,
    procedureKey: defaultProcedureKey,
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const slots = fakeSlots();

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      // POST /api/v1/consultations happens here when the API is wired up.
      await new Promise((r) => setTimeout(r, 400));
      setStep(4);
    } catch {
      setError(t('errorGeneric'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange} title={t('title')}>
      <Stepper step={step} />
      {step === 1 && (
        <section aria-labelledby="step1-title" className="mt-6">
          <h3 id="step1-title" className="text-title font-medium">
            {t('step1')}
          </h3>
          <div className="mt-4 grid gap-3">
            {CALL_TYPES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCallType(c)}
                className={`panel flex items-center justify-between text-start ${
                  callType === c ? 'ring-2 ring-balcony' : ''
                }`}
              >
                <span className="font-medium">{t(`step1Options.${c}`)}</span>
                <span aria-hidden className="h-3 w-3 rounded-full border border-line">
                  {callType === c && <span className="block h-full w-full rounded-full bg-balcony" />}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={() => setStep(2)}>→</Button>
          </div>
        </section>
      )}
      {step === 2 && (
        <section aria-labelledby="step2-title" className="mt-6">
          <h3 id="step2-title" className="text-title font-medium">
            {t('step2')}
          </h3>
          <p className="mt-1 text-small text-ink-muted">
            {t('step2YourTz')} ·{' '}
            <span className="tabular">
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </span>{' '}
            · {t('step2Tbilisi')} <span className="tabular">Asia/Tbilisi</span>
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {slots.map((s) => (
              <li key={s.iso}>
                <button
                  type="button"
                  onClick={() => setSlot(s.iso)}
                  className={`btn w-full justify-center ${
                    slot === s.iso ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-between">
            <Button variant="secondary" onClick={() => setStep(1)}>
              ←
            </Button>
            <Button disabled={!slot} onClick={() => setStep(3)}>
              →
            </Button>
          </div>
        </section>
      )}
      {step === 3 && (
        <section aria-labelledby="step3-title" className="mt-6">
          <h3 id="step3-title" className="text-title font-medium">
            {t('step3')}
          </h3>
          <div className="mt-4 grid gap-3">
            <label className="block">
              <span className="text-small text-ink-muted">{t('name')}</span>
              <input
                className="input mt-1"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </label>
            <label className="block">
              <span className="text-small text-ink-muted">{t('email')}</span>
              <input
                className="input mt-1"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </label>
            <label className="block">
              <span className="text-small text-ink-muted">{t('phone')}</span>
              <input
                className="input mt-1"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </label>
            <label className="block">
              <span className="text-small text-ink-muted">{t('language')}</span>
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
              <span className="text-small text-ink-muted">{t('procedureOfInterest')}</span>
              <input
                className="input mt-1"
                value={form.procedureKey}
                onChange={(e) => setForm({ ...form, procedureKey: e.target.value })}
                placeholder="e.g. dental implants"
              />
            </label>
            <label className="mt-2 flex items-start gap-2 text-small text-ink-muted">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              />
              <span>{t('consent')}</span>
            </label>
          </div>
          {error && <p className="mt-3 text-small text-alert">{error}</p>}
          <div className="mt-8 flex justify-between">
            <Button variant="secondary" onClick={() => setStep(2)}>
              ←
            </Button>
            <Button
              disabled={!form.consent || !form.name || !form.email || submitting}
              onClick={submit}
            >
              {submitting ? t('submitting') : t('submit')}
            </Button>
          </div>
        </section>
      )}
      {step === 4 && (
        <section className="mt-6">
          <p className="text-lead">{t('success')}</p>
          <Button className="mt-6" variant="secondary" onClick={() => onOpenChange(false)}>
            ×
          </Button>
        </section>
      )}
    </Sheet>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="flex items-center gap-2 text-small text-ink-muted" aria-label="Booking progress">
      {[1, 2, 3].map((n) => (
        <li key={n} className="flex items-center gap-2">
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${
              step >= n ? 'border-balcony bg-balcony text-paper' : 'border-line'
            }`}
          >
            {n}
          </span>
          {n < 3 && <span aria-hidden className="h-px w-6 bg-line" />}
        </li>
      ))}
    </ol>
  );
}

// Mock slots — the real engine lives in the API (ConsultationAvailability + overlap).
function fakeSlots() {
  const now = Date.now();
  const out: Array<{ iso: string; label: string }> = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(now + (2 + i) * 3600_000);
    d.setMinutes(0, 0, 0);
    out.push({
      iso: d.toISOString(),
      label: d.toLocaleString(undefined, {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  }
  return out;
}
