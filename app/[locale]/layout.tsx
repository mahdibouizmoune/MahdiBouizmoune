import {isLocale} from '../../lib/i18n';
import {Document,documentMetadata} from '../../components/document';
export const metadata=documentMetadata;
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
 const {locale:raw}=await params;const locale=isLocale(raw)?raw:'en';
 return <Document locale={locale}>{children}</Document>;
}
