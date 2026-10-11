import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa';

export function ContactSection() {
  return (
    <section id="contact" className="relative isolate py-14 md:py-16">
      <div className="container grid gap-10 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)]">
        <div>
          <div className="text-small font-medium uppercase tracking-wide text-balcony">
            Talk to us
          </div>
          <h2 className="mt-3 font-display text-display-l">
            One office in Tbilisi. One phone number.
          </h2>
          <p className="mt-3 text-lead text-ink-muted">
            We answer in English, Russian or Hebrew within one working hour. Weekends too.
          </p>

          <ul className="mt-8 grid gap-4">
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-input bg-mineral text-balcony">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <div className="font-medium">11 Rustaveli Avenue, Tbilisi 0108</div>
                <div className="text-small text-ink-muted">Office hours · Mon–Sat 09:00–20:00</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-input bg-mineral text-balcony">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <a href="tel:+995322123456" className="font-medium text-ink hover:text-balcony">
                  +995 32 2 123 456
                </a>
                <div className="text-small text-ink-muted">Calls and WhatsApp</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-input bg-mineral text-balcony">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <a href="mailto:care@medtour.ge" className="font-medium text-ink hover:text-balcony">
                  care@medtour.ge
                </a>
                <div className="text-small text-ink-muted">Replies within 1 working hour</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-input bg-mineral text-balcony">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <div className="font-medium">Asia/Tbilisi · UTC+4</div>
                <div className="text-small text-ink-muted">
                  Shown in your time zone when you book a call.
                </div>
              </div>
            </li>
          </ul>

          <div className="mt-8">
            <div className="text-small font-medium text-ink-muted">Follow us</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {[
                { href: 'https://wa.me/995322123456', label: 'WhatsApp', Icon: FaWhatsapp, color: '#25D366' },
                { href: 'https://t.me/medtour_ge', label: 'Telegram', Icon: FaTelegramPlane, color: '#229ED9' },
                { href: 'https://instagram.com/', label: 'Instagram', Icon: FaInstagram, color: '#E1306C' },
                { href: 'https://facebook.com/', label: 'Facebook', Icon: FaFacebookF, color: '#1877F2' },
                { href: 'https://youtube.com/', label: 'YouTube', Icon: FaYoutube, color: '#FF0000' },
                { href: 'https://tiktok.com/', label: 'TikTok', Icon: FaTiktok, color: '#000000' },
                { href: '/en/stories', label: 'Reviews', Icon: MessageCircle, color: '#2E6B66' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer nofollow"
                  aria-label={s.label}
                  style={{ color: s.color }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface transition-transform hover:-translate-y-0.5 hover:no-underline"
                >
                  <s.Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-panel border border-line">
          <iframe
            title="Office location in Tbilisi"
            src="https://www.google.com/maps?q=Rustaveli%20Avenue%2011%20Tbilisi&output=embed"
            width="100%"
            height="520"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block border-0"
          />
        </div>
      </div>
    </section>
  );
}
