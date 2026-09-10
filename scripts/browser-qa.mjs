import fs from 'node:fs/promises';
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
const base=process.argv[2]||'http://127.0.0.1:5175';
const browser=await chromium.launch({channel:'msedge',headless:true});
const report={pages:[],controls:[]};await fs.mkdir('work/qa',{recursive:true});
try{
 for(const locale of ['en','fr','ar']){
  const prefix=locale==='en'?'':'/'+locale,context=await browser.newContext({viewport:{width:1440,height:1000},colorScheme:'light'}),page=await context.newPage();
  for(const route of ['','/clients','/work/bunchful']){
   for(const width of [400,768,1440]){
    await page.setViewportSize({width,height:1000});await page.goto(base+prefix+(route||'/'));await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);
    const sizing=await page.evaluate(()=>({lang:document.documentElement.lang,dir:document.documentElement.dir,scroll:document.documentElement.scrollWidth,width:innerWidth,font:getComputedStyle(document.body).fontFamily,overflows:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1||e.getBoundingClientRect().left< -1).slice(0,8).map(e=>({tag:e.tagName,class:e.className}))}));
    assert.equal(sizing.lang,locale);assert.equal(sizing.dir,locale==='ar'?'rtl':'ltr');
    const result=width===400?await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze():{violations:[]};
    report.pages.push({locale,route,width,...sizing,violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary})).slice(0,10)}))});
    if(!route&&[400,1440].includes(width))await page.screenshot({path:'work/qa/'+locale+'-'+width+'.png',fullPage:true});
   }
   for(const target of ['en','fr','ar']){
    const href=await page.locator('[data-locale="'+target+'"]').getAttribute('href');assert.equal(href,(target==='en'?'':'/'+target)+(route|| (target==='en'?'/':'')));
   }
  }
  await page.goto(base+prefix+'/');await page.keyboard.press('Tab');assert(await page.locator('.skip-link').evaluate(e=>e===document.activeElement));await page.keyboard.press('Enter');assert(await page.locator('#main').evaluate(e=>e===document.activeElement));
  await page.locator('[data-back-top]').click();assert(await page.locator('#top').evaluate(e=>e===document.activeElement));
  await page.locator('[data-locale="'+(locale==='fr'?'ar':'fr')+'"]').focus();await page.keyboard.press('Space');await page.waitForURL('**/'+(locale==='fr'?'ar':'fr'));assert.equal(await page.evaluate(()=>localStorage.getItem('preferred-locale')),locale==='fr'?'ar':'fr');
  await page.goto(base+prefix+'/');await page.locator('button[type=submit]').click();assert.equal(await page.locator('[aria-invalid=true]').count(),3);
  await page.route('**/api/contact',r=>r.fulfill({status:200,contentType:'application/json',body:r.request().method()==='GET'?'{"token":"test"}':'{"ok":true}'}));
  await page.locator('#contact-name').fill('Portfolio test');await page.locator('#contact-email').fill('test@example.com');await page.locator('#contact-message').fill('This is a local interface test only.');
  await page.locator('button[type=submit]').click();await page.waitForFunction(()=>document.querySelector('[role=status]')?.textContent?.length>0);
  report.controls.push({locale,skipFocus:true,backTopFocus:true,languageSpace:true,formInvalidFields:3,successStatus:await page.locator('[role=status]').innerText(),submission:'Mock transport, no email sent'});
  await context.close();
 }
 const darkContext=await browser.newContext({viewport:{width:400,height:900},colorScheme:'dark'});const dark=await darkContext.newPage();await dark.goto(base+'/ar');await dark.evaluate(()=>document.fonts.ready);const darkAxe=await new AxeBuilder({page:dark}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();report.darkViolations=darkAxe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));await dark.screenshot({path:'work/qa/ar-dark.png',fullPage:true});await darkContext.close();
}finally{await fs.writeFile('work/qa/results.json',JSON.stringify(report,null,2));await browser.close();}
const failures=report.pages.filter(p=>p.scroll>p.width||p.violations.some(v=>['critical','serious'].includes(v.impact)));
console.log(JSON.stringify({pages:report.pages.length,controls:report.controls,failures,dark:report.darkViolations},null,2));if(failures.length||report.darkViolations.some(v=>['critical','serious'].includes(v.impact)))process.exitCode=1;
