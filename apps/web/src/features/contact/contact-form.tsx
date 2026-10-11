'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const t = useTranslations('pages.contact');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // POST to the API when wired. For now simulate.
    await new Promise((r) => setTimeout(r, 500));
    setSubmitting(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="panel flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-5 w-5 text-balcony" />
        <p>{t('formSuccess')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-small text-ink-muted">{t('formName')}</span>
          <input required className="input mt-1" name="name" />
        </label>
        <label className="block">
          <span className="text-small text-ink-muted">{t('formEmail')}</span>
          <input required type="email" className="input mt-1" name="email" />
        </label>
      </div>
      <label className="block">
        <span className="text-small text-ink-muted">{t('formPhone')}</span>
        <input className="input mt-1" name="phone" />
      </label>
      <label className="block">
        <span className="text-small text-ink-muted">{t('formSubject')}</span>
        <select className="input mt-1" name="subject">
          <option>Dental — implants, All-on-4, veneers</option>
          <option>Hair transplant — FUE / DHI</option>
          <option>Skin / dermatology</option>
          <option>Full-body checkup</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="block">
        <span className="text-small text-ink-muted">{t('formMessage')}</span>
        <textarea className="input mt-1 min-h-32" name="message" />
      </label>
      <Button disabled={submitting} type="submit">
        <Send className="h-4 w-4" />
        {t('formSubmit')}
      </Button>
    </form>
  );
}
