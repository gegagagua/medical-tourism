'use client';

import { useEffect, useState } from 'react';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sticky social dock — vertical stack bottom-right. Visible after the user scrolls
// 240 px so it doesn't fight the hero.
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    {
      href: 'https://wa.me/995322123456',
      label: 'WhatsApp',
      Icon: FaWhatsapp,
      bg: '#25D366',
      pulse: true,
    },
    {
      href: 'https://t.me/medtour_ge',
      label: 'Telegram',
      Icon: FaTelegramPlane,
      bg: '#229ED9',
    },
    {
      href: 'tel:+995322123456',
      label: 'Call',
      Icon: Phone,
      bg: '#2E6B66',
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-6 end-5 z-40 flex flex-col items-center gap-3"
        >
          {items.map((it) => (
            <a
              key={it.label}
              href={it.href}
              target={it.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer nofollow"
              aria-label={it.label}
              className="group relative flex h-12 w-12 items-center justify-center rounded-full text-white shadow-ticket transition-transform hover:scale-110 hover:no-underline motion-reduce:transform-none"
              style={{ backgroundColor: it.bg }}
            >
              {it.pulse && (
                <span
                  aria-hidden
                  className="absolute inset-0 animate-ping rounded-full opacity-50 motion-reduce:animate-none"
                  style={{ backgroundColor: it.bg }}
                />
              )}
              <it.Icon className="relative h-5 w-5" />
              <span className="pointer-events-none absolute end-full me-2 whitespace-nowrap rounded-input bg-ink px-2 py-1 text-small text-paper opacity-0 shadow-ticket transition-opacity group-hover:opacity-100">
                {it.label}
              </span>
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
