import fs from 'node:fs/promises';
import sharp from 'sharp';
import {SITE} from '../lib/site.ts';
import {growth} from '../content/growth.ts';
import {proof} from '../content/proof.ts';
const exists=async p=>fs.access(p).then(()=>true,()=>false);
await fs.mkdir('public/assets/cv',{recursive:true});
const original='../references/Mahdi-Bouizmoune-CV.pdf';
if(!await exists('public'+SITE.cv.en)&&await exists(original))await fs.copyFile(original,'public'+SITE.cv.en);
if(!await exists('public'+SITE.cv.en))throw new Error('English CV required; original reference was not found.');
const cv={};for(const locale of ['en','fr','ar']){cv[locale]=await exists('public'+SITE.cv[locale])?SITE.cv[locale]:SITE.cv.en;if(cv[locale]!==SITE.cv[locale])console.warn('CV '+locale+' missing; download falls back to EN.');}
await fs.writeFile('lib/cv-files.json',JSON.stringify(cv,null,2)+'\n');
for(const width of [400,1200]){const target='public/assets/mahdi-portrait-'+width+'.webp';if(!await exists(target))await sharp('public/assets/mahdi-portrait-800.webp').resize(width,width).webp({quality:82}).toFile(target);}
const svg=await fs.readFile('public/favicon.svg');
await fs.writeFile('public/icon.svg',svg);
for(const[size,name]of [[180,'apple-touch-icon.png'],[192,'icon-192.png'],[512,'icon-512.png']])await sharp(svg).resize(size,size).png().toFile('public/'+name);
const png=await sharp(svg).resize(32,32).png().toBuffer();const ico=Buffer.alloc(22);ico.writeUInt16LE(1,2);ico.writeUInt16LE(1,4);ico[6]=32;ico[7]=32;ico.writeUInt16LE(1,10);ico.writeUInt16LE(32,12);ico.writeUInt32LE(png.length,14);ico.writeUInt32LE(22,18);await fs.writeFile('public/favicon.ico',Buffer.concat([ico,png]));
await fs.writeFile('public/site.webmanifest',JSON.stringify({name:SITE.name,short_name:'Mahdi',start_url:'/',display:'standalone',background_color:'#EAE2CE',theme_color:'#242424',icons:[192,512].map(size=>({src:'/icon-'+size+'.png',sizes:size+'x'+size,type:'image/png'}))},null,2));
await fs.mkdir('public/assets/og',{recursive:true});
const escape=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const wrap=(text,size=40)=>{const lines=[''];for(const word of text.split(' ')){if((lines.at(-1)+' '+word).trim().length>size)lines.push(word);else lines[lines.length-1]=(lines.at(-1)+' '+word).trim();}return lines;};
for(const locale of ['en','fr','ar']){
 const d=JSON.parse(await fs.readFile('locales/'+locale+'.json','utf8')),g=growth(locale);
 const homeFooter=proof.years+' '+g.yearsLabel+' · '+proof.engagements+' '+g.engagementsLabel;
 for(const[slug,title]of [['home',d.hero.eyebrow],...Object.entries(d.work).map(([slug,p])=>[slug,p.name+' | '+p.role])]){
  const rtl=locale==='ar',x=600,isHome=slug==='home';
  const headline=isHome?[d.hero.headline,d.hero.accent]:wrap(title,40).slice(0,4);
  const startY=isHome?300:245,footer=isHome?wrap(homeFooter,100):['Digital Marketing Manager · '+locale.toUpperCase()];
  const footerSize=isHome?20:22,footerY=isHome?556:570,footerGap=28;
  const markup='<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="#28345C" stroke-width="1"/></pattern></defs><rect width="1200" height="630" fill="#101B36"/><rect width="1200" height="630" fill="url(#grid)"/><rect x="0" y="0" width="16" height="630" fill="#DB9A1F"/><text x="80" y="120" font-family="Arial" font-size="36" font-weight="bold" fill="#DB9A1F">El Mahdi Bouizmoune</text>'+headline.map((s,i)=>'<text x="'+x+'" y="'+(startY+i*66)+'" direction="'+(rtl?'rtl':'ltr')+'" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="43" fill="#FCEFC7">'+escape(s)+'</text>').join('')+footer.map((s,i)=>'<text x="80" y="'+(footerY+i*footerGap)+'" font-family="Arial" font-size="'+footerSize+'" fill="#9AA6C9">'+escape(s)+'</text>').join('')+'</svg>';
  const file='public/assets/og/'+slug+'-'+locale+'.png';await sharp(Buffer.from(markup)).png({palette:true,quality:90,compressionLevel:9}).toFile(file);if((await fs.stat(file)).size>200000)throw new Error('OG image exceeds 200 KB: '+file);
  if(slug==='home')await fs.copyFile(file,'public/assets/og/og-'+locale+'.png');
 }
}
console.log('CV fallback manifest, responsive assets, icons and 27 social cards prepared.');
