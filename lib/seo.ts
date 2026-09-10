import type { Metadata } from 'next';

// Production origin confirmed by Mahdi. An explicit SITE_URL can override it after a domain change.
const configured =
  process.env.SITE_URL || 'https://mahdi-bouizmoune.vercel.app';
export const siteUrl = (() => {
  if (!configured) return undefined;
  try {
    const url = new URL(configured);
    return url.protocol === 'https:' ? url.origin : undefined;
  } catch {
    return undefined;
  }
})();
export const indexable =
  Boolean(siteUrl) &&
  process.env.VERCEL_ENV !== 'preview' &&
  process.env.NODE_ENV === 'production';
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: siteUrl ? { canonical: siteUrl + path } : undefined,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'El Mahdi Bouizmoune',
      locale: 'en_US',
      ...(siteUrl ? { url: siteUrl + path } : {}),
    },
    twitter: { card: 'summary', title, description },
  };
}
