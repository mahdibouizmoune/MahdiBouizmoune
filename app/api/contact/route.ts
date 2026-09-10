import {createHmac,timingSafeEqual,randomUUID} from 'node:crypto';
import {SITE} from '../../../lib/site';
const json=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
function secret(){return process.env.CONTACT_FORM_SECRET||process.env.RESEND_API_KEY||'';}
function sign(value:string){return createHmac('sha256',secret()).update(value).digest('hex');}
export async function GET(){if(!secret())return json({error:'unavailable'},503);const value=Date.now()+'.'+randomUUID();return json({token:value+'.'+sign(value)});}
async function limitedBody(request:Request){const reader=request.body?.getReader();if(!reader)throw new Error('empty');let size=0,text='';const decoder=new TextDecoder();while(true){const{done,value}=await reader.read();if(done)break;size+=value.length;if(size>16000){await reader.cancel();throw new Error('large');}text+=decoder.decode(value,{stream:true});}return JSON.parse(text+decoder.decode());}
export async function POST(request:Request){
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin&&origin!==SITE.domain&&origin!==SITE.legacyDomain)return json({error:'origin'},403);
 if(!request.headers.get('content-type')?.includes('application/json'))return json({error:'contentType'},415);
 let data:Record<string,unknown>;try{data=await limitedBody(request);if(!data||typeof data!=='object'||Array.isArray(data))throw new Error('invalid');}catch{return json({error:'invalidBody'},400);}
 const fields:Record<string,string>={};
 for(const k of ['name','email','message'])if(typeof data[k]!=='string'||!String(data[k]).trim())fields[k]='required';
 if(typeof data.email==='string'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))fields.email='invalidEmail';
 for(const[k,max]of [['name',120],['email',254],['company',120],['message',5000]] as const)if(data[k]!==undefined&&(typeof data[k]!=='string'||String(data[k]).length>max))fields[k]='tooLong';
 if(typeof data.message==='string'&&data.message.trim().length<10)fields.message='tooShort';
 if(Object.keys(fields).length)return json({fields},422);
 if(data.website)return json({error:'invalidSubmission'},400);
 if(!secret()||!process.env.RESEND_API_KEY||!process.env.CONTACT_FROM_EMAIL)return json({error:'unavailable'},503);
 const [timestamp,nonce,signature]=(typeof data.token==='string'?data.token:'').split('.');const signed=sign(timestamp+'.'+nonce);
 if(!signature||signature.length!==signed.length||!timingSafeEqual(Buffer.from(signature),Buffer.from(signed)))return json({error:'invalidSubmission'},400);
 const age=Date.now()-Number(timestamp);if(!Number.isFinite(age)||age<2000)return json({error:'slowDown'},429);if(age>7200000)return json({error:'expired'},400);
 try{
  const result=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':'portfolio-'+nonce},body:JSON.stringify({from:process.env.CONTACT_FROM_EMAIL,to:[SITE.email],reply_to:String(data.email).trim(),subject:'Portfolio enquiry',text:'Name: '+String(data.name).trim()+'\nEmail: '+String(data.email).trim()+'\nCompany: '+(typeof data.company==='string'?data.company:'').trim()+'\n\n'+String(data.message).trim()}),signal:AbortSignal.timeout(12000)});
  if(!result.ok)return json({error:'deliveryFailed'},502);
  return json({ok:true});
 }catch{return json({error:'deliveryFailed'},502);}
}
