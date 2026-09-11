'use client';
import {useEffect,useRef,useState} from 'react';
import type {Dictionary,Locale} from '../lib/i18n';
import {track} from './client-controls';
export function ContactForm({copy,locale}:{copy:Dictionary['form'];locale:Locale}){
 const hint={en:'Tell me about the role or project, your goals and your timeline.',fr:'Décrivez le poste ou le projet, vos objectifs et votre calendrier.',ar:'حدثني عن الوظيفة أو المشروع وأهدافك والجدول الزمني.'}[locale];
 const [pending,setPending]=useState(false),[status,setStatus]=useState(''),[errors,setErrors]=useState<Record<string,string>>({});
 const token=useRef('');
 const tokenStarted=useRef(false);
 function prepare(){if(tokenStarted.current)return;tokenStarted.current=true;fetch('/api/contact',{cache:'no-store'}).then(r=>r.ok?r.json():null).then(data=>{token.current=(data as {token?:string}|null)?.token||'';}).catch(()=>{tokenStarted.current=false;});}
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();const form=e.currentTarget,data=Object.fromEntries(new FormData(form));const next:Record<string,string>={};
  for(const name of ['name','email','message'])if(!String(data[name]||'').trim())next[name]=copy.required;
  if(data.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email)))next.email=copy.invalidEmail;
  if(data.message&&String(data.message).trim().length<10)next.message=copy.tooShort;
  setErrors(next);setStatus('');if(Object.keys(next).length){(form.elements.namedItem(Object.keys(next)[0]) as HTMLElement)?.focus();return;}
  setPending(true);
  try{const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,locale,token:token.current})});const result=await response.json() as {fields?:Record<string,string>;error?:string};
   if(!response.ok){if(result.fields){const converted:Record<string,string>={};for(const k of Object.keys(result.fields))converted[k]=copy[result.fields[k] as keyof typeof copy]||copy.required;setErrors(converted);(form.elements.namedItem(Object.keys(converted)[0]) as HTMLElement)?.focus();}setStatus(result.error==='slowDown'?copy.slowDown:copy.failure);}
   else{setStatus(copy.success);form.reset();track('form_submit',{locale});try{const fresh=await fetch('/api/contact',{cache:'no-store'});token.current=fresh.ok?(await fresh.json() as {token:string}).token:'';}catch{token.current='';}}
  }catch{setStatus(copy.failure);}finally{setPending(false);}
 }
 return <form className="contact-form" onSubmit={submit} onFocus={prepare} noValidate>
 <p className="form-hint" id="contact-hint">{hint}</p>
 <div className="form-grid">{(['name','email','company','message'] as const).map(name=><div className={name==='message'?'form-field full':'form-field'} key={name}><label htmlFor={'contact-'+name}>{copy[name]}</label>{name==='message'?<textarea id={'contact-'+name} name={name} rows={5} required minLength={10} maxLength={5000} aria-invalid={!!errors[name]} aria-describedby={errors[name]?'error-'+name:undefined}/>:<input id={'contact-'+name} name={name} type={name==='email'?'email':'text'} autoComplete={name==='name'?'name':name==='email'?'email':'organization'} required={name!=='company'} maxLength={name==='email'?254:120} aria-invalid={!!errors[name]} aria-describedby={errors[name]?'error-'+name:undefined}/>}{errors[name]&&<p className="field-error" id={'error-'+name}>{errors[name]}</p>}</div>)}</div>
 <div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">{copy.website}</label><input name="website" id="contact-website" tabIndex={-1} autoComplete="off"/></div>
 <p className="form-privacy">{copy.privacy}</p><button type="submit" className="button contact-button" disabled={pending}>{pending?copy.pending:copy.submit}</button><p className="form-status" role="status" aria-live="polite" aria-atomic="true">{status}</p><noscript><p>{copy.noJs}</p></noscript>
 </form>;
}
export function EmailLink({parts,label}:{parts:string[];label:string}){
 const[email,setEmail]=useState('');useEffect(()=>setEmail(parts.join('@')),[parts]);
 return <>{email&&<a href={'mailto:'+email} data-analytics="email_click" aria-label={label}><bdi>{email}</bdi></a>}<noscript><a href={'mailto:'+parts.join('@')}>{label}</a></noscript></>;
}
