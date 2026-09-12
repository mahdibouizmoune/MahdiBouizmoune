import type {Metadata} from 'next';
import {dictionary,type Locale} from '../lib/i18n';
import {SITE} from '../lib/site';
import {ClientControls} from './client-controls';
import '@fontsource/public-sans/latin-400.css';
import '@fontsource/public-sans/latin-600.css';
import '@fontsource/public-sans/latin-700.css';
import '@fontsource/fraunces/latin-600.css';
import '@fontsource/fraunces/latin-700.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-600.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-700.css';
import '../app/globals.css';
export const documentMetadata:Metadata={title:SITE.name,icons:{icon:[{url:'/favicon.ico',sizes:'32x32'},{url:'/icon.svg',type:'image/svg+xml'}],apple:'/apple-touch-icon.png'},manifest:'/site.webmanifest'};
export function Document({locale,children}:{locale:Locale;children:React.ReactNode}){
 // oxlint-disable-next-line next/no-head-element -- This is the app's actual root <html> document (Vinext, not a Next.js page body); there is no next/head export to defer to here.
 return <html lang={locale} dir={locale==='ar'?'rtl':'ltr'}><head><meta name="theme-color" content="#EAE2CE"/><link rel="preload" as="image" href="/assets/mahdi-portrait-800.webp" imageSrcSet="/assets/mahdi-portrait-400.webp 400w, /assets/mahdi-portrait-800.webp 800w, /assets/mahdi-portrait-1200.webp 1200w" imageSizes="(max-width: 767px) 280px, (max-width: 1100px) 34vw, 400px"/></head><body><a className="skip-link" href="#main">{dictionary(locale).a11y.skipToContent}</a>{children}<ClientControls/></body></html>;}
