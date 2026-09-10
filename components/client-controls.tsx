'use client';
import {useEffect} from 'react';
import {Analytics} from '@vercel/analytics/react';
import {track as vercelTrack} from '@vercel/analytics';
export function track(event: string, props: Record<string,string|number|boolean>={}) { vercelTrack(event,props); }
export function ClientControls(){
 useEffect(()=>{
  const locale=location.pathname.split('/')[1];
  if(locale==='fr'||locale==='ar'){document.documentElement.lang=locale;document.documentElement.dir=locale==='ar'?'rtl':'ltr';}
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
  return()=>{document.removeEventListener('click',listener);document.removeEventListener('keydown',key);};
 },[]);
 return <Analytics/>;
}
