import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {parse} from 'parse5';
const base='.vercel/output/static';
const en=JSON.parse(fs.readFileSync('locales/en.json','utf8'));
const routes=['','/fr','/ar'].flatMap(prefix=>['/','/clients',...Object.keys(en.work).map(s=>'/work/'+s)].map(p=>prefix+p));
const nodes=(node)=>[node,...(node.childNodes||[]).flatMap(nodes)];
const attr=(node,key)=>node.attrs?.find(a=>a.name===key)?.value;
const target=p=>[path.join(base,p,'index.html'),path.join(base,p+'.html'),path.join(base,p)].find(p=>fs.existsSync(p)&&fs.statSync(p).isFile());
const documents=new Map();
for(const route of routes){const file=target(route);assert(file,'Route not prerendered: '+route);documents.set(route.replace(/\/$/,'')||'/',nodes(parse(fs.readFileSync(file,'utf8'))));}
let links=0;const inventory=['# Built control inventory','| Page | Element | Target | Result |','| --- | --- | --- | --- |'];
for(const[route,all]of documents){
 const html=all.find(n=>n.tagName==='html'),locale=route.startsWith('/ar')?'ar':route.startsWith('/fr')?'fr':'en';
 assert.equal(attr(html,'lang'),locale,route+' lang');assert.equal(attr(html,'dir'),locale==='ar'?'rtl':'ltr',route+' dir');
 assert.equal(all.filter(n=>n.tagName==='h1').length,1,route+' h1');
 for(const lang of ['en','fr','ar','x-default'])assert(all.some(n=>n.tagName==='link'&&attr(n,'hreflang')===lang),route+' hreflang '+lang);
 for(const a of all.filter(n=>n.tagName==='a')){
  const href=attr(a,'href');assert(href&&href!=='#',route+' empty anchor');links++;
  if(/^https?:/.test(href)){assert.equal(attr(a,'target'),'_blank',route+' external target');assert.equal(attr(a,'rel'),'noopener noreferrer',route+' external rel');assert(nodes(a).some(n=>attr(n,'class')?.includes('sr-only')),route+' external hint');}
  else if(!/^(mailto:|tel:)/.test(href)){const u=new URL(href,'https://portfolio.test'+route);const p=u.pathname.replace(/\/$/,'')||'/';assert(target(p),route+' broken target '+href);if(u.hash){const doc=documents.get(p)||nodes(parse(fs.readFileSync(target(p),'utf8')));assert(doc.some(n=>attr(n,'id')===decodeURIComponent(u.hash.slice(1))),route+' broken anchor '+href);}}
  inventory.push('| '+route+' | a | '+href.replaceAll('|','\\|')+' | Target and semantics checked |');
 }
 for(const node of all.filter(n=>n.tagName==='button'||n.tagName==='summary'))inventory.push('| '+route+' | '+node.tagName+' | '+(attr(node,'type')||'native disclosure')+' | Browser test required |');
 for(const img of all.filter(n=>n.tagName==='img')){assert(attr(img,'alt')!==undefined,route+' missing alt');assert(attr(img,'width')&&attr(img,'height'),route+' missing image dimensions');assert(target(attr(img,'src')),route+' missing image');}
}
fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/controls-after.md',inventory.join('\n')+'\n');
console.log('Checked '+documents.size+' prerendered pages and '+links+' links, all anchors and image dimensions.');
