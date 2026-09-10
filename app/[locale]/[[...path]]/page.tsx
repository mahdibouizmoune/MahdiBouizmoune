import {notFound} from 'next/navigation';
import {Home} from '../../../components/home';
import {ClientsDirectory} from '../../../components/clients-directory';
import {CaseStudy} from '../../../components/case-study';
import {dictionary,isLocale} from '../../../lib/i18n';
import {pageMetadata} from '../../../lib/seo';
type Props={params:Promise<{locale:string;path?:string[]}>};
export function generateStaticParams(){return ['fr','ar'].flatMap(locale=>[[],['clients'],...Object.keys(dictionary('en').work).map(s=>['work',s])].map(path=>({locale,path})));}
export async function generateMetadata({params}:Props){const{locale,path=[]}=await params;if(!isLocale(locale)||locale==='en')return {robots:{index:false}};const d=dictionary(locale),p=d.work[path[1] as keyof typeof d.work];return path.length===0?pageMetadata(d.meta.homeTitle,d.meta.homeDescription,'/',locale):path[0]==='clients'&&path.length===1?pageMetadata(d.meta.clientsTitle,d.meta.clientsDescription,'/clients',locale):p&&path[0]==='work'&&path.length===2?pageMetadata(p.name+' | '+p.role,p.intro,'/work/'+path[1],locale):{title:d.meta.notFound,robots:{index:false}};}
export default async function Page({params}:Props){const{locale,path=[]}=await params;if(!isLocale(locale)||locale==='en')notFound();if(path.length===0)return <Home locale={locale}/>;if(path[0]==='clients'&&path.length===1)return <ClientsDirectory locale={locale}/>;if(path[0]==='work'&&path.length===2&&Object.hasOwn(dictionary(locale).work,path[1]))return <CaseStudy slug={path[1]} locale={locale}/>;notFound();}
