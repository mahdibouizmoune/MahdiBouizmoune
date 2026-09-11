import fs from 'node:fs';
import path from 'node:path';
const root='.vercel/output/static';
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const files=walk(root).filter(f=>f.endsWith('.html'));
if(files.length<33)throw new Error('Expected at least 33 prerendered HTML pages.');
for(const file of files){const html=fs.readFileSync(file,'utf8');const bad=html.match(/\{\{|TODO|lorem|\u2014/i);if(bad)throw new Error('Forbidden content '+JSON.stringify(bad[0])+' in '+file);}
console.log('Content gate passed: '+files.length+' HTML files contain no template tokens, filler or em dashes.');
