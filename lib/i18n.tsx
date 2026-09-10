import en from '../locales/en.json';
import fr from '../locales/fr.json';
import ar from '../locales/ar.json';
export const locales = ['en', 'fr', 'ar'] as const;
export type Locale = typeof locales[number];
export type Dictionary = typeof en;
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
export function dictionary(locale: Locale): Dictionary { return { en, fr, ar }[locale] as Dictionary; }
export function localizePath(path: string, locale: Locale): string {
  const clean = path.replace(/^\/(fr|ar)(?=\/|#|\?|$)/, '') || '/';
  return locale === 'en' ? clean : '/' + locale + (clean === '/' ? '' : clean);
}
export function Text({children, locale}: {children: string; locale: Locale}) {
  if (locale !== 'ar') return children;
  return children.split(/([A-Za-z0-9][A-Za-z0-9 .,/@+&():%\-–]*[A-Za-z0-9]|[A-Za-z0-9])/g).map((s,i)=> /[A-Za-z0-9]/.test(s) ? <bdi dir="ltr" key={i}>{s}</bdi> : s);
}
