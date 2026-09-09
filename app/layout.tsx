import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:{default:'El Mahdi Bouizmoune — Digital Marketing & Automation',template:'%s — Mahdi B.'},description:'Digital marketing, paid media, CRM automation, and AI content systems. Selected work by El Mahdi Bouizmoune, based in Morocco and working worldwide.',robots:{index:false,follow:false}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>}
