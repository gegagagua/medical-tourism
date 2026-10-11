import { Phone, Mail, Clock } from 'lucide-react';

export function TopBar() {
  return (
    <div className="hidden border-b border-line/60 bg-ink text-paper md:block">
      <div className="container flex h-9 items-center justify-between text-small">
        <div className="flex items-center gap-5 text-paper/80">
          <span className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" /> +995 32 2 123 456
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" /> care@medtour.ge
          </span>
          <span className="hidden items-center gap-1.5 lg:flex">
            <Clock className="h-3.5 w-3.5" /> Mon–Sat · 09:00–20:00 Asia/Tbilisi
          </span>
        </div>
        <div className="flex items-center gap-4 text-paper/80">
          <a className="hover:text-paper" href="https://wa.me/" rel="noreferrer nofollow">
            WhatsApp
          </a>
          <span aria-hidden>·</span>
          <a className="hover:text-paper" href="https://t.me/" rel="noreferrer nofollow">
            Telegram
          </a>
        </div>
      </div>
    </div>
  );
}
