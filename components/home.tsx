import {Header,Footer,Contact} from './portfolio-shell';
import {Hero,LogoStrip,ProofPanel,SelectedWork,BeforeAfter,Services,Process,Reviews,About,WaysToWork,FAQ} from './home-sections';
import {localizePath,type Locale} from '../lib/i18n';
import {SITE} from '../lib/site';
import {siteUrl} from '../lib/seo';
export function Home({locale='en'}:{locale?:Locale}){
 const person={'@context':'https://schema.org','@type':'Person',name:SITE.name,jobTitle:SITE.role,url:siteUrl+localizePath('/',locale),image:siteUrl+'/assets/mahdi-portrait-800.webp',address:{'@type':'PostalAddress',addressLocality:'Safi',addressCountry:'MA'},worksFor:{'@type':'Organization',name:'Bunchful Enterprise'},knowsLanguage:['en','fr','ar'],sameAs:Object.values(SITE.social)};
 return <><Header locale={locale}/><main id="main" tabIndex={-1}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(person).replace(/</g,'\\u003c')}}/><Hero locale={locale}/><LogoStrip locale={locale}/><ProofPanel locale={locale}/><SelectedWork locale={locale}/><BeforeAfter locale={locale}/><Services locale={locale}/><Process locale={locale}/><Reviews locale={locale}/><About locale={locale}/><WaysToWork locale={locale}/><FAQ locale={locale}/><Contact locale={locale}/></main><Footer locale={locale}/></>;
}
