'use client';

import { useState } from 'react';
import {
  PROCEDURES,
  PUBLIC_LOCALES,
  SOURCE_COUNTRIES,
  SPECIALTIES,
  type PublicLocale,
  type SourceCountry,
  type SpecialtyKey,
} from '@medtour/shared';
import { Button } from '@/components/ui/button';

// Multi-step request shell — the real submit lives behind the API (SPEC §4.1). The
// upload step is intentionally a placeholder here; encrypted upload needs the API.
export function RequestFlow() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [specialty, setSpecialty] = useState<SpecialtyKey>('dentistry');
  const [procedureKey, setProcedureKey] = useState('dental-implants');
  const [country, setCountry] = useState<SourceCountry>('uk');
  const [travelStart, setTravelStart] = useState('');
  const [companions, setCompanions] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    telegram: '',
    language: 'en' as PublicLocale,
  });
  const [consents, setConsents] = useState({ processing: false, sharing: false, marketing: false });

  const procedures = PROCEDURES.filter((p) => p.specialty === specialty);
  const requiredFiles = PROCEDURES.find((p) => p.key === procedureKey)?.requiredFiles ?? [];

  return (
    <div className="panel">
      <Progress step={step} />

      {step === 1 && (
        <section aria-labelledby="r1" className="mt-6">
          <h2 id="r1" className="text-title font-medium">
            What are you looking for?
          </h2>
          <label className="mt-4 block">
            <span className="text-small text-ink-muted">Specialty</span>
            <select
              className="input mt-1"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value as SpecialtyKey)}
            >
              {SPECIALTIES.filter((s) => s.isBookable).map((s) => (
                <option key={s.key} value={s.key}>
                  {s.key}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-4 block">
            <span className="text-small text-ink-muted">Procedure</span>
            <select
              className="input mt-1"
              value={procedureKey}
              onChange={(e) => setProcedureKey(e.target.value)}
            >
              {procedures.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.key}
                </option>
              ))}
            </select>
          </label>
          <NavButtons onNext={() => setStep(2)} nextLabel="Next" />
        </section>
      )}

      {step === 2 && (
        <section aria-labelledby="r2" className="mt-6">
          <h2 id="r2" className="text-title font-medium">
            When and from where?
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-small text-ink-muted">Country</span>
              <select
                className="input mt-1"
                value={country}
                onChange={(e) => setCountry(e.target.value as SourceCountry)}
              >
                {SOURCE_COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-small text-ink-muted">Travel start (optional)</span>
              <input
                type="date"
                className="input mt-1"
                value={travelStart}
                onChange={(e) => setTravelStart(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-small text-ink-muted">Companions</span>
              <input
                type="number"
                min={0}
                max={5}
                className="input mt-1 tabular"
                value={companions}
                onChange={(e) => setCompanions(Number(e.target.value) || 0)}
              />
            </label>
          </div>
          <NavButtons onBack={() => setStep(1)} onNext={() => setStep(3)} />
        </section>
      )}

      {step === 3 && (
        <section aria-labelledby="r3" className="mt-6">
          <h2 id="r3" className="text-title font-medium">
            Files
          </h2>
          <p className="mt-2 text-small text-ink-muted">
            Please add the files relevant to your procedure. Max 25 MB per file. Files are encrypted
            on upload — this environment is a UI preview and does not store files.
          </p>
          <ul className="mt-4 list-disc ps-5 text-small text-ink-muted">
            {requiredFiles.length === 0 && <li>No required files for this procedure.</li>}
            {requiredFiles.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <label className="mt-4 block cursor-pointer rounded-input border border-dashed border-line bg-paper p-6 text-center">
            <span className="text-small text-ink-muted">
              Tap to add files (camera works on mobile)
            </span>
            <input
              type="file"
              multiple
              accept="image/*,application/pdf,.zip"
              className="hidden"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            />
          </label>
          {files.length > 0 && (
            <ul className="mt-4 text-small">
              {files.map((f) => (
                <li key={f.name} className="flex items-center justify-between gap-4 border-b border-line py-2">
                  <span>{f.name}</span>
                  <span className="tabular text-ink-muted">{Math.round(f.size / 1024)} KB</span>
                </li>
              ))}
            </ul>
          )}
          <NavButtons onBack={() => setStep(2)} onNext={() => setStep(4)} />
        </section>
      )}

      {step === 4 && (
        <section aria-labelledby="r4" className="mt-6">
          <h2 id="r4" className="text-title font-medium">
            A few medical questions
          </h2>
          <p className="mt-2 text-small text-ink-muted">
            Short, per-specialty questions. The clinic uses these to prepare your plan.
          </p>
          <div className="mt-4 grid gap-3">
            <label className="block">
              <span className="text-small text-ink-muted">Have you had any surgery in the past 12 months?</span>
              <textarea className="input mt-1 min-h-24" />
            </label>
            <label className="block">
              <span className="text-small text-ink-muted">Any allergies or regular medication?</span>
              <textarea className="input mt-1 min-h-24" />
            </label>
          </div>
          <NavButtons onBack={() => setStep(3)} onNext={() => setStep(5)} />
        </section>
      )}

      {step === 5 && (
        <section aria-labelledby="r5" className="mt-6">
          <h2 id="r5" className="text-title font-medium">
            How we reach you
          </h2>
          <div className="mt-4 grid gap-3">
            <label className="block">
              <span className="text-small text-ink-muted">Full name</span>
              <input
                className="input mt-1"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="text-small text-ink-muted">Email</span>
              <input
                type="email"
                className="input mt-1"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="text-small text-ink-muted">Phone / WhatsApp</span>
              <input
                type="tel"
                className="input mt-1"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="text-small text-ink-muted">Telegram (optional)</span>
              <input
                className="input mt-1"
                value={contact.telegram}
                onChange={(e) => setContact({ ...contact, telegram: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="text-small text-ink-muted">Language</span>
              <select
                className="input mt-1"
                value={contact.language}
                onChange={(e) =>
                  setContact({ ...contact, language: e.target.value as PublicLocale })
                }
              >
                {PUBLIC_LOCALES.map((l) => (
                  <option key={l} value={l}>
                    {l.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <NavButtons onBack={() => setStep(4)} onNext={() => setStep(6)} />
        </section>
      )}

      {step === 6 && (
        <section aria-labelledby="r6" className="mt-6">
          <h2 id="r6" className="text-title font-medium">
            Consents
          </h2>
          <div className="mt-4 grid gap-3 text-small">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={consents.processing}
                onChange={(e) => setConsents({ ...consents, processing: e.target.checked })}
              />
              <span>
                I agree to the processing of my personal data to prepare treatment plans
                (required).
              </span>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={consents.sharing}
                onChange={(e) => setConsents({ ...consents, sharing: e.target.checked })}
              />
              <span>
                I agree to share my case and files with vetted partner clinics selected by my
                coordinator (required).
              </span>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={consents.marketing}
                onChange={(e) => setConsents({ ...consents, marketing: e.target.checked })}
              />
              <span>I agree to receive updates about related procedures (optional).</span>
            </label>
          </div>
          <div className="mt-6">
            <Button
              disabled={!consents.processing || !consents.sharing}
              onClick={() =>
                alert('Submission simulated — the real API endpoint will handle the case creation.')
              }
            >
              Submit request
            </Button>
          </div>
          <NavButtons onBack={() => setStep(5)} />
        </section>
      )}
    </div>
  );
}

function Progress({ step }: { step: number }) {
  const steps = [1, 2, 3, 4, 5, 6];
  return (
    <ol
      aria-label="Request progress"
      className="flex items-center gap-1.5 text-small text-ink-muted"
    >
      {steps.map((n) => (
        <li
          key={n}
          className={`h-1 flex-1 rounded-full ${n <= step ? 'bg-balcony' : 'bg-line'}`}
          aria-current={n === step ? 'step' : undefined}
        />
      ))}
    </ol>
  );
}

function NavButtons({
  onBack,
  onNext,
  nextLabel = 'Next',
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
}) {
  return (
    <div className="mt-8 flex items-center justify-between">
      {onBack ? (
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
      ) : (
        <span />
      )}
      {onNext && <Button onClick={onNext}>{nextLabel}</Button>}
    </div>
  );
}
