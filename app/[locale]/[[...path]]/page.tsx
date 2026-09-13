import {notFound} from 'next/navigation';
import {Home} from '../../../components/home';
import {ClientsDirectory} from '../../../components/clients-directory';
import {CaseStudy} from '../../../components/case-study';
import {dictionary,isLocale} from '../../../lib/i18n';
import {pageMetadata} from '../../../lib/seo';
import {growth} from '../../../content/growth';
import {getCase,type CaseSlug} from '../../../content/cases';
import {WorkIndex} from '../../../components/work-grid';
type Props={params:Promise<{locale:string;path?:string[]}>};
export function generateStaticParams(){return ['fr','ar'].flatMap(locale=>[[],['clients'],['work'],...Object.keys(dictionary('en').work).map(s=>['work',s])].map(path=>({locale,path})));}
export async function generateMetadata({params}:Props){const{locale,path=[]}=await params;if(!isLocale(locale)||locale==='en')return {robots:{index:false}};const d=dictionary(locale),g=growth(locale),p=d.work[path[1] as keyof typeof d.work];return path.length===0?pageMetadata('El Mahdi Bouizmoune | '+d.hero.eyebrow,g.subline,'/',locale):path[0]==='clients'&&path.length===1?pageMetadata(d.nav.clients+' | El Mahdi Bouizmoune',g.clientsDescription,'/clients',locale):path[0]==='work'&&path.length===1?pageMetadata(g.allWork+' | El Mahdi Bouizmoune',g.workDescription,'/work',locale):p&&path[0]==='work'&&path.length===2?pageMetadata(getCase(path[1] as CaseSlug,locale).client+' | El Mahdi Bouizmoune',p.intro,'/work/'+path[1],locale):{title:d.meta.notFound+' | El Mahdi Bouizmoune',robots:{index:false}};}
export default async function Page({params}:Props){const{locale,path=[]}=await params;if(!isLocale(locale)||locale==='en')notFound();if(path.length===0)return <Home locale={locale}/>;if(path[0]==='clients'&&path.length===1)return <ClientsDirectory locale={locale}/>;if(path[0]==='work'&&path.length===1)return <WorkIndex locale={locale}/>;if(path[0]==='work'&&path.length===2&&Object.hasOwn(dictionary(locale).work,path[1]))return <CaseStudy slug={path[1]} locale={locale}/>;notFound();}
