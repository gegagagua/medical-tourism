import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/features/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        balcony: 'var(--balcony)',
        mineral: 'var(--mineral)',
        saffron: 'var(--saffron)',
        alert: 'var(--alert)',
        line: 'var(--line)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'var(--font-text)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-text)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['2.75rem', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-l': ['2.1rem', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
        title: ['1.35rem', { lineHeight: '1.3' }],
        lead: ['1.125rem', { lineHeight: '1.55' }],
        body: ['0.9375rem', { lineHeight: '1.6' }],
        small: ['0.8125rem', { lineHeight: '1.5' }],
        'ticket-figure': ['1.5rem', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        input: '10px',
        panel: '16px',
        ticket: '24px',
      },
      spacing: {
        'section-y': '4.5rem', // 72px desktop — denser than §3.3's 96 after visual review
      },
      boxShadow: {
        ticket: '0 24px 48px -24px rgba(22,36,44,.35)',
      },
      keyframes: {
        'ticket-print': {
          '0%': { clipPath: 'inset(0 0 100% 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
      },
      animation: {
        'ticket-print': 'ticket-print 600ms cubic-bezier(.2,.8,.2,1) both',
      },
    },
  },
  plugins: [],
};

export default config;
