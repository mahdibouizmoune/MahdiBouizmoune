import type { Metadata } from 'next';
import { indexable, siteUrl } from '../lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: 'El Mahdi Bouizmoune | Digital Marketing Manager',
    template: '%s | Mahdi Bouizmoune',
  },
  description:
    'Digital Marketing Manager based in Safi, Morocco. Paid social advertising, SEO, GoHighLevel CRM automation and AI content systems. Experience since 2018.',
  robots: { index: indexable, follow: indexable },
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
