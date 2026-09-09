import Image from 'next/image';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ArrowLeft,ArrowUpRight,Asterisk} from 'lucide-react';
import {projects} from '../projects';
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return projects.map(({slug})=>({slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const p=projects.find(item=>item.slug===slug);return {title:p?.name??'Project not found',description:p?.intro}}
export default async function ProjectPage({params}:Props){const {slug}=await params;const p=projects.find(item=>item.slug===slug);if(!p)notFound();const next=projects[(projects.indexOf(p)+1)%projects.length];return <>
  <header className="header wrap"><a className="wordmark" href="/">mahdi b<span>.</span></a><a className="text-link back-link" href="/#work"><ArrowLeft size={16}/> All work</a><a className="nav-contact" href="mailto:mahdi.bouizmoune@gmail.com">Let’s talk <ArrowUpRight size={17}/></a></header>
  <main id="main"><section className="case-header wrap"><p className="eyebrow">{p.name.toUpperCase()}</p><h1>{p.title}</h1><div className="case-intro"><p>{p.intro}</p><span>{p.category}</span></div></section>
  {p.image?<figure className={`case-figure ${p.theme}`}><Image unoptimized src={`/assets/${p.image}`} alt={`${p.name} campaign content sample`} width={864} height={864}/><figcaption>Selected content created for {p.name}.</figcaption></figure>:<div className={`case-banner ${p.theme}`}><div className="wrap"><Asterisk size={55}/><p>{p.name}</p><span>{p.category}</span></div></div>}
  <section className="case-body wrap section"><aside><p className="eyebrow">THE PROJECT</p><h2>{p.name}</h2><div className="tool-tags">{p.tools.map(tool=><span key={tool}>{tool}</span>)}</div></aside><div className="case-story"><section><p className="eyebrow">01 / THE CONTEXT</p><h2>Start with the right question.</h2><p>{p.context}</p></section><section><p className="eyebrow">02 / MY APPROACH</p><h2>Connect the moving parts.</h2><ul>{p.approach.map(step=><li key={step}>{step}</li>)}</ul></section><section><p className="eyebrow">03 / WHAT I DELIVERED</p><h2>Turn the strategy into practice.</h2><p>{p.delivered}</p></section></div></section>
  <div className="case-next wrap"><span className="eyebrow">NEXT PROJECT</span><a href={`/work/${next.slug}`}><span>{next.name}</span><ArrowUpRight/></a></div><section className="mini-contact wrap"><h2>Have a similar challenge?</h2><a className="text-link" href="mailto:mahdi.bouizmoune@gmail.com">Let’s talk about it <ArrowUpRight size={18}/></a></section></main>
  <footer className="wrap footer"><a className="wordmark" href="/">mahdi b<span>.</span></a><span>© {new Date().getFullYear()} El Mahdi Bouizmoune</span><a href="/#work">Back to selected work ↑</a></footer>
</>}

