'use client';
import {useEffect,useState} from 'react';
import {Analytics} from '@vercel/analytics/react';
import {track as vercelTrack} from '@vercel/analytics';
export function track(event: string, props: Record<string,string|number|boolean>={}) { vercelTrack(event,props); }
export function ClientControls(){
 const [analytics,setAnalytics]=useState(false);
 useEffect(()=>{
  // oxlint-disable-next-line react/react-compiler -- location.hostname only exists post-mount; deferring to an effect keeps first client render matching the SSR output (no <Analytics/>) and avoids a hydration mismatch.
  setAnalytics(!['localhost','127.0.0.1','::1'].includes(location.hostname));
  const header=document.querySelector('.site-header');
  const scroll=()=>header?.classList.toggle('scrolled',window.scrollY>12);scroll();
  window.addEventListener('scroll',scroll,{passive:true});
  const slug=document.querySelector<HTMLElement>('[data-case-slug]')?.dataset.caseSlug;
  if(slug)track('case_view',{slug});
  const listener=(e:MouseEvent)=>{
   const el=(e.target as Element).closest<HTMLElement>('[data-analytics]');
   if(el){const props:Record<string,string>={};for(const[k,v]of Object.entries(el.dataset))if(k.startsWith('analytics')&&k!=='analytics'&&v)props[k.slice(9).toLowerCase()]=v;track(el.dataset.analytics!,props);}
   const language=(e.target as Element).closest<HTMLElement>('[data-locale]');
   if(language){try{localStorage.setItem('preferred-locale',language.dataset.locale!);}catch{/* Preference storage is optional. */}}
   const top=(e.target as Element).closest('[data-back-top]');
   if(top){e.preventDefault();document.getElementById('top')?.focus({preventScroll:true});window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
  };
  const key=(e:KeyboardEvent)=>{if(e.key===' '&&(e.target as Element).matches('[data-locale]')){e.preventDefault();(e.target as HTMLElement).click();}};
  document.addEventListener('click',listener);document.addEventListener('keydown',key);
  return()=>{document.removeEventListener('click',listener);document.removeEventListener('keydown',key);window.removeEventListener('scroll',scroll);};
 },[]);
 return analytics?<Analytics/>:null;
}
