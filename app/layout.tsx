/* oxlint-disable next/no-page-custom-font -- Arabic font is intentionally loaded only by Arabic root layouts. */
import type {Metadata} from 'next';
import {isLocale,dictionary} from '../lib/i18n';
import {SITE} from '../lib/site';
import {ClientControls} from '../components/client-controls';
import './globals.css';
import './enhancements.css';
export const metadata:Metadata={title:SITE.name,icons:{icon:[{url:'/favicon.ico',sizes:'32x32'},{url:'/icon.svg',type:'image/svg+xml'}],apple:'/apple-touch-icon.png'},manifest:'/site.webmanifest'};
export default async function RootLayout({children,params}:{children:React.ReactNode;params:Promise<{locale?:string}>}){
 const p=await params,locale=p.locale&&isLocale(p.locale)?p.locale:'en',d=dictionary(locale);
 return <html lang={locale} dir={locale==='ar'?'rtl':'ltr'}><head><meta name="theme-color" content="#202723"/>{locale==='ar'&&<><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600&display=swap"/></>}</head><body><a className="skip-link" href="#main">{d.a11y.skipToContent}</a>{children}<ClientControls/></body></html>;
}
