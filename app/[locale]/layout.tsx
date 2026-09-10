import {isLocale,dictionary} from '../../lib/i18n';
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
 const {locale:raw}=await params;const locale=isLocale(raw)?raw:'en';
 return <div lang={locale} dir={locale==='ar'?'rtl':'ltr'} data-locale-root>{children}</div>;
}
