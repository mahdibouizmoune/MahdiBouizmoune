'use client';
import {useEffect,useRef,useState,type ReactNode} from 'react';
import {track} from './client-controls';
import type {Filter} from '../content/cases';
export function MobileMenu({label,close,children}:{label:string;close:string;children:ReactNode}){
 const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const el=dialog.current;if(!el)return;const release=()=>document.body.style.removeProperty('overflow');el.addEventListener('close',release);return()=>{el.removeEventListener('close',release);release();};},[]);
 return <><button className="menu-toggle" type="button" aria-label={label} aria-haspopup="dialog" onClick={()=>{dialog.current?.showModal();document.body.style.overflow='hidden';}}>☰</button><dialog className="mobile-sheet" ref={dialog} aria-label={label}><button className="menu-close" type="button" onClick={()=>dialog.current?.close()}>{close} <span aria-hidden="true">×</span></button><div onClick={e=>{if((e.target as HTMLElement).closest('a'))dialog.current?.close();}}>{children}</div></dialog><noscript><div className="nojs-menu">{children}</div></noscript></>;
}
export function WorkFilters({filters,cards}:{filters:{id:Filter;label:string}[];cards:{slug:string;filters:Filter[];node:ReactNode}[]}){
 const [active,setActive]=useState<Filter>('all');
 useEffect(()=>{const sync=()=>{const id=location.hash.replace('#work-','');setActive(filters.some(f=>f.id===id)?id as Filter:'all');};sync();window.addEventListener('hashchange',sync);window.addEventListener('popstate',sync);return()=>{window.removeEventListener('hashchange',sync);window.removeEventListener('popstate',sync);};},[filters]);
 return <><div className="filters" role="group" aria-label={filters[0].label}>{filters.map(f=><button type="button" key={f.id} aria-pressed={active===f.id} onClick={()=>{setActive(f.id);history.pushState(null,'','#work-'+f.id);track('filter_use',{filter:f.id});}}>{f.label}</button>)}</div><div className="work-grid">{cards.map(c=><div key={c.slug} hidden={active!=='all'&&!c.filters.includes(active)}>{c.node}</div>)}</div><span className="sr-only" role="status">{cards.filter(c=>active==='all'||c.filters.includes(active)).length} / {cards.length}</span></>;
}
export function ReviewCarousel({children,previous,next}:{children:ReactNode[];previous:string;next:string}){
 const row=useRef<HTMLDivElement>(null),[index,setIndex]=useState(0);
 const go=(n:number)=>{const target=Math.max(0,Math.min(children.length-1,n));setIndex(target);row.current?.children[target]?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest',inline:'start'});};
 return <div className="carousel"><div className="review-track" ref={row} tabIndex={0} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const rtl=getComputedStyle(e.currentTarget).direction==='rtl';go(index+((e.key==='ArrowRight')!==rtl?1:-1));}}} onScroll={()=>{if(!row.current)return;const box=row.current.getBoundingClientRect(),rtl=getComputedStyle(row.current).direction==='rtl';const nearest=[...row.current.children].map((el,i)=>({i,d:Math.abs(rtl?el.getBoundingClientRect().right-box.right:el.getBoundingClientRect().left-box.left)})).sort((a,b)=>a.d-b.d)[0];if(nearest)setIndex(nearest.i);}}>{children}</div><div className="carousel-controls"><button type="button" aria-label={previous} disabled={index===0} onClick={()=>go(index-1)}><span className="icon-directional" aria-hidden="true">←</span></button><span className="mono" aria-live="polite">{index+1} / {children.length}</span><button type="button" aria-label={next} disabled={index===children.length-1} onClick={()=>go(index+1)}><span className="icon-directional" aria-hidden="true">→</span></button></div></div>;
}
export function FAQAccordion({items}:{items:{question:string;answer:ReactNode}[]}){
 const [open,setOpen]=useState<number[]|null>(null);
 useEffect(()=>setOpen([]),[]);
 return <div className="faq-list">{items.map((item,i)=>{const expanded=open===null||open.includes(i);return <div className="faq-item" key={item.question}><h3><button type="button" aria-expanded={expanded} aria-controls={'faq-panel-'+i} id={'faq-button-'+i} onClick={()=>setOpen(expanded?(open||[]).filter(n=>n!==i):[...(open||[]),i])}>{item.question}<span aria-hidden="true">{expanded?'−':'+'}</span></button></h3><div id={'faq-panel-'+i} role="region" aria-labelledby={'faq-button-'+i} hidden={!expanded}>{item.answer}</div></div>;})}</div>;
}
