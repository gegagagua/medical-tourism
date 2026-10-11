import { Unbounded, Noto_Sans } from 'next/font/google';

// DESIGN.md §3.2 — Unbounded for display (Latin/Cyrillic), FiraGO ideal but not on Google Fonts.
// Noto Sans is the closest multi-script Google-hosted fallback until we self-host FiraGO
// (Noto subsets cover Latin, Cyrillic and Hebrew via @next/font per-locale weights).
export const display = Unbounded({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['500', '600'],
  variable: '--font-display',
  display: 'swap',
});

// Hebrew subset is covered by the browser's default Hebrew font (fallback to system);
// a future task self-hosts FiraGO which covers Hebrew directly (DESIGN.md §3.2).
export const text = Noto_Sans({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-text',
  display: 'swap',
});
