import fs from 'node:fs';
import assert from 'node:assert/strict';
const read=l=>JSON.parse(fs.readFileSync('locales/'+l+'.json','utf8'));
const flatten=(v,p='')=>typeof v==='object'&&v!==null?Object.entries(v).flatMap(([k,x])=>flatten(x,p?p+'.'+k:k)):[p];
const en=read('en'),keys=flatten(en).sort();
for(const l of ['fr','ar']){assert.deepEqual(flatten(read(l)).sort(),keys,'Locale key mismatch: '+l);}
for(const l of ['en','fr','ar'])assert(!/\u2014|\bfounders?\b/i.test(JSON.stringify(read(l))),'Forbidden copy in '+l);
console.log('Locale parity passed for '+keys.length+' keys, EN/FR/AR.');
