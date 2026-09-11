// One-time migration; the latest user brief supplies ownership and career totals.
import fs from 'node:fs';
const replacements={en:{category:'Own venture / Content & automation',intro:'My recipe platform connects useful content with search, Pinterest discovery and email automation.',etsy:'Own venture / Etsy & e-commerce'},fr:{category:'Projet personnel / Contenu et automatisation',intro:'Ma plateforme de recettes relie contenu utile, recherche, découverte sur Pinterest et automatisation email.',etsy:'Projet personnel / Etsy et e-commerce'},ar:{category:'مشروعي الخاص / المحتوى والأتمتة',intro:'تربط منصتي للوصفات المحتوى المفيد بالبحث والاكتشاف عبر Pinterest وأتمتة البريد.',etsy:'مشروعي الخاص / Etsy والتجارة الإلكترونية'}};
for(const locale of ['en','fr','ar']){
 const file='locales/'+locale+'.json',d=JSON.parse(fs.readFileSync(file,'utf8'));
 delete d.testimonials;
 for(const key of Object.keys(d.directory))if(/Pending$/.test(key))delete d.directory[key];
 delete d.caseStudy.proofPending;
 for(const p of Object.values(d.work)){p.metrics=[];if(!p.proof.src)p.proof.caption='';}
 Object.assign(d.work['gourmet-gather'],{category:replacements[locale].category,intro:replacements[locale].intro});
 d.work.etsy.category=replacements[locale].etsy;
 d.clients=d.clients.filter(c=>!['gourmet-gather','etsy','skyrocket-your-biz','content-studio'].includes(c.caseSlug));
 d.form.privacy={en:'I use your details to reply to your enquiry. Resend processes the message for delivery. Your message is not sent to analytics.',fr:'J’utilise vos coordonnées pour répondre. Resend traite le message pour sa livraison. Votre message n’est pas transmis aux outils d’analyse.',ar:'أستخدم بياناتك للرد على استفسارك. تعالج Resend الرسالة لإيصالها. لا يُرسل محتوى رسالتك إلى أدوات التحليلات.'}[locale];
 const clean=v=>typeof v==='string'?v.replace(/\{\{[^}]*\}\}/g,'').replace(/\u2014/g,'.').replaceAll('https://www.linkedin.com/in/mahdibouizmoune','https://www.linkedin.com/in/mahdi-bouizmoune/'):Array.isArray(v)?v.map(clean):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,clean(x)])):v;
 fs.writeFileSync(file,JSON.stringify(clean(d),null,2)+'\n');
}
