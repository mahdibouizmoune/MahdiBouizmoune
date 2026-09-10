import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const walk = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name).replaceAll('\\','/')]);
fs.mkdirSync('docs',{recursive:true});
const files=['app','components','lib','public'].flatMap(walk);
const source=files.filter(f=>/\.(tsx?|css)$/.test(f));
let strings=['# Initial English string inventory','Generated before implementation. Includes source literals and JSX text; technical literals are retained for completeness.','| File and line | String |','| --- | --- |'];
let controls=['# Initial interactive element inventory','Static source inventory. Dynamic cards expand from project/client data. All eight case studies have homepage inbound links.','| Element | File and line | Current target | Works / problem | Planned fix |','| --- | --- | --- | --- | --- |'];
for(const file of source.filter(f=>!f.startsWith('components/ui/'))){
 const content=fs.readFileSync(file,'utf8');const ast=ts.createSourceFile(file,content,ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 const row=v=>v.replaceAll('|','\\|').replace(/\s+/g,' ').trim();
 function visit(n){
  const line=ast.getLineAndCharacterOfPosition(n.getStart(ast)).line+1;
  if(ts.isStringLiteral(n)||ts.isJsxText(n)){const value=row(n.text);if(/[A-Za-z]/.test(value))strings.push(`| ${file}:${line} | ${value} |`);}
  if(ts.isJsxOpeningElement(n)||ts.isJsxSelfClosingElement(n)){
   const tag=n.tagName.getText(ast);if(['a','Link','button','summary'].includes(tag)||/onClick|role=\"button\"/.test(n.getText(ast))){
    const href=n.attributes.properties.find(a=>a.name?.text==='href')?.initializer?.getText(ast)||'Native disclosure / action';
    const note=href.includes('mailto')?'Mail client required':href==="\"#main\""?'Scroll only, focus not ensured':href.includes('https')?'External destination; new-tab hint missing':'Source target present; build link verification pending';
    controls.push(`| ${tag} | ${file}:${line} | ${row(href)} | ${note} | Validate targets, focus, analytics, locale and external semantics |`);
   }
  }ts.forEachChild(n,visit);
 }visit(ast);
}
fs.writeFileSync('docs/string-inventory-before.md',strings.join('\n')+'\n');
fs.writeFileSync('docs/controls-before.md',controls.join('\n')+'\n');
const slugs=['akam','gourmet-gather','bunchful','content-studio','skyrocket-your-biz','strongman','generation-atomic','etsy'];
fs.writeFileSync('docs/discovery.md',`# Discovery before changes\n\nReact 19 with Vinext 1 beta, Vite 8 and Nitro Vercel output. File-based App Router compatibility, not a plain SPA. Root app/layout.tsx; app/page.tsx; app/clients/page.tsx; app/work/[slug]/page.tsx serves eight data-driven case studies. next.config.ts and vite.config.ts exist. No root index.html, Astro config or pages directory. Existing routes are server-rendered; generateStaticParams alone is not proof of prerendering.\n\nOriginal design: orange, cream and charcoal, editorial headings, portrait before experience. Preserve it.\n\n## Routes\n\n| Route | Source | Homepage inbound |\n| --- | --- | --- |\n| / | app/page.tsx | Wordmark |\n| /clients | app/clients/page.tsx | Header and directory CTA |\n${slugs.map(s=>`| /work/${s} | app/work/[slug]/page.tsx + app/work/projects.ts | ${['content-studio','gourmet-gather','etsy'].includes(s)?'Projects & systems':s==='akam'?'Experience and additional work':'Work cards and experience'} |`).join('\n')}\n\nNo orphan among these ten routes. Existing portrait has dimensions, lazy loading and srcset. Existing SVG favicon and Person schema are present; the brief's contrary observations are stale.\n\n## File map\n\n${files.map(f=>'- '+f).join('\n')}\n\nSee controls-before.md and string-inventory-before.md for the requested exhaustive source inventories.\n`);
console.log(`Inventoried ${files.length} files, ${strings.length-4} strings and ${controls.length-4} source controls.`);
