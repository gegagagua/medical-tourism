export { LOCALES, PUBLIC_LOCALES, DEFAULT_LOCALE, RTL_LOCALES } from '../enums';
export type { Locale, PublicLocale } from '../enums';

import { RTL_LOCALES, type Locale } from '../enums';

export function dirFor(locale: Locale): 'ltr' | 'rtl' {
  return RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';
}
