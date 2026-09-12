'use client';
import {useEffect,useRef,useState,type ReactNode} from 'react';
import {track} from './client-controls';
import type {Filter} from '../content/cases';
export function MobileMenu({label,close,children}:{label:string;close:string;children:ReactNode}){
 const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const el=dialog.current;if(!el)return;const release=()=>document.body.style.removeProperty('overflow');const closeOnLinkClick=(e:MouseEvent)=>{if((e.target as HTMLElement).closest('a'))el.close();};el.addEventListener('close',release);el.addEventListener('click',closeOnLinkClick);return()=>{el.removeEventListener('close',release);el.removeEventListener('click',closeOnLinkClick);release();};},[]);
 return <><button className="menu-toggle" type="button" aria-label={label} aria-haspopup="dialog" onClick={()=>{dialog.current?.showModal();document.body.style.overflow='hidden';}}>☰</button><dialog className="mobile-sheet" ref={dialog} aria-label={label}><button className="menu-close" type="button" onClick={()=>dialog.current?.close()}>{close} <span aria-hidden="true">×</span></button>{children}</dialog><noscript><div className="nojs-menu">{children}</div></noscript></>;
}
export function WorkFilters({filters,cards}:{filters:{id:Filter;label:string}[];cards:{slug:string;filters:Filter[];node:ReactNode}[]}){
 const [active,setActive]=useState<Filter>('all');
 useEffect(()=>{const sync=()=>{const id=location.hash.replace('#work-','');setActive(filters.some(f=>f.id===id)?id as Filter:'all');};sync();window.addEventListener('hashchange',sync);window.addEventListener('popstate',sync);return()=>{window.removeEventListener('hashchange',sync);window.removeEventListener('popstate',sync);};},[filters]);
 return <><fieldset className="filters"><legend className="sr-only">{filters[0].label}</legend>{filters.map(f=><button type="button" key={f.id} aria-pressed={active===f.id} onClick={()=>{setActive(f.id);history.pushState(null,'','#work-'+f.id);track('filter_use',{filter:f.id});}}>{f.label}</button>)}</fieldset><div className="work-grid">{cards.map(c=><div key={c.slug} hidden={active!=='all'&&!c.filters.includes(active)}>{c.node}</div>)}</div><output className="sr-only">{cards.filter(c=>active==='all'||c.filters.includes(active)).length} / {cards.length}</output></>;
}
export function ReviewCarousel({children,previous,next}:{children:ReactNode[];previous:string;next:string}){
 const row=useRef<HTMLDivElement>(null),[index,setIndex]=useState(0);
 const go=(n:number)=>{const target=Math.max(0,Math.min(children.length-1,n));setIndex(target);row.current?.children[target]?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest',inline:'start'});};
 return <div className="carousel">
 {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-static-element-interactions -- WAI-ARIA carousel scroll region: focusable so arrow keys can move the track; the prev/next buttons below remain the fully keyboard-operable equivalent, this is a progressive enhancement on top of them. */}
 <div className="review-track" aria-roledescription="carousel" aria-label={previous+' / '+next} ref={row} tabIndex={0} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const rtl=getComputedStyle(e.currentTarget).direction==='rtl';go(index+((e.key==='ArrowRight')!==rtl?1:-1));}}} onScroll={()=>{if(!row.current)return;const box=row.current.getBoundingClientRect(),rtl=getComputedStyle(row.current).direction==='rtl';const nearest=[...row.current.children].map((el,i)=>({i,d:Math.abs(rtl?el.getBoundingClientRect().right-box.right:el.getBoundingClientRect().left-box.left)})).sort((a,b)=>a.d-b.d)[0];if(nearest)setIndex(nearest.i);}}>{children}</div><div className="carousel-controls"><button type="button" aria-label={previous} disabled={index===0} onClick={()=>go(index-1)}><span className="icon-directional" aria-hidden="true">←</span></button><span className="mono" aria-live="polite">{index+1} / {children.length}</span><button type="button" aria-label={next} disabled={index===children.length-1} onClick={()=>go(index+1)}><span className="icon-directional" aria-hidden="true">→</span></button></div></div>;
}
export function FAQAccordion({items}:{items:{question:string;answer:ReactNode}[]}){
 const [open,setOpen]=useState<number[]|null>(null);
 // oxlint-disable-next-line react/react-compiler -- Progressive enhancement: without JS every answer must render expanded (open===null), so the default state can't already be [] on first paint. This effect collapses them once hydration confirms JS is running.
 useEffect(()=>setOpen([]),[]);
 return <div className="faq-list">{items.map((item,i)=>{const expanded=open===null||open.includes(i);return <div className="faq-item" key={item.question}><h3><button type="button" aria-expanded={expanded} aria-controls={'faq-panel-'+i} id={'faq-button-'+i} onClick={()=>setOpen(expanded?(open||[]).filter(n=>n!==i):[...(open||[]),i])}>{item.question}<span aria-hidden="true" className="faq-chevron">▾</span></button></h3><section id={'faq-panel-'+i} aria-labelledby={'faq-button-'+i} hidden={!expanded}>{item.answer}</section></div>;})}</div>;
}
