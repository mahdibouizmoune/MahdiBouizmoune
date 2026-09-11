import {notFound} from 'next/navigation';
import {CaseStudy} from '../../../../components/case-study';
import {dictionary} from '../../../../lib/i18n';
import {getCase,type CaseSlug} from '../../../../content/cases';
import {pageMetadata} from '../../../../lib/seo';
const d=dictionary('en');
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return Object.keys(d.work).map(slug=>({slug}));}
export async function generateMetadata({params}:Props){const {slug}=await params;const p=Object.hasOwn(d.work,slug)?getCase(slug as CaseSlug,'en'):null;return p?pageMetadata(p.client+' | El Mahdi Bouizmoune',p.summary,'/work/'+slug,'en'):{title:d.meta.notFound,robots:{index:false}};}
export default async function Page({params}:Props){const{slug}=await params;if(!Object.hasOwn(d.work,slug))notFound();return <CaseStudy slug={slug} locale="en"/>;}
