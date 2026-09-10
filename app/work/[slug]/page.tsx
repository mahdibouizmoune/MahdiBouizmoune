import {notFound} from 'next/navigation';
import {CaseStudy} from '../../../components/case-study';
import {dictionary} from '../../../lib/i18n';
import {pageMetadata} from '../../../lib/seo';
const d=dictionary('en');
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return Object.keys(d.work).map(slug=>({slug}));}
export async function generateMetadata({params}:Props){const {slug}=await params;const p=d.work[slug as keyof typeof d.work];return p?pageMetadata(p.name+' | '+p.role,p.intro,'/work/'+slug,'en'):{title:d.meta.notFound,robots:{index:false}};}
export default async function Page({params}:Props){const{slug}=await params;if(!Object.hasOwn(d.work,slug))notFound();return <CaseStudy slug={slug} locale="en"/>;}
