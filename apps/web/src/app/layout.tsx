// Root layout — the [locale] layout owns <html>. This file renders only children.
import type { ReactNode } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
