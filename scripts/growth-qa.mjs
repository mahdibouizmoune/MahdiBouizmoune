import fs from 'node:fs/promises';
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
const base=process.argv[2]||'http://127.0.0.1:5175';
const data=JSON.parse(await fs.readFile('locales/en.json','utf8'));
const report={layouts:[],accessibility:[],controls:[],errors:[]};
await fs.mkdir('work/growth-qa',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 for(const locale of ['en','fr','ar']){
  const prefix=locale==='en'?'':'/'+locale;
  const context=await browser.newContext({colorScheme:'light'}),page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  for(const route of ['','/work','/clients',...Object.keys(data.work).map(s=>'/work/'+s)]){
   await page.goto(base+prefix+(route||''));await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);
   for(const width of [360,768,1280,1920]){
    await page.setViewportSize({width,height:1000});
    const size=await page.evaluate(()=>({lang:document.documentElement.lang,dir:document.documentElement.dir,width:innerWidth,scroll:document.documentElement.scrollWidth}));
    assert.equal(size.lang,locale);assert.equal(size.dir,locale==='ar'?'rtl':'ltr');report.layouts.push({locale,route,...size});
   }
   if(['','/work','/work/akam'].includes(route)){
    await page.setViewportSize({width:360,height:900});
    const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();report.accessibility.push({locale,route,scheme:'light',violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
   }
   if(!route){for(const width of [360,1280]){await page.setViewportSize({width,height:900});await page.screenshot({path:`work/growth-qa/${locale}-${width}.png`,fullPage:true});}}
  }
  await page.setViewportSize({width:360,height:900});await page.goto(base+prefix);await page.keyboard.press('Tab');assert(await page.locator('.skip-link').evaluate(e=>e===document.activeElement));await page.keyboard.press('Enter');assert(await page.locator('#main').evaluate(e=>e===document.activeElement));
  await page.locator('.menu-toggle').click();assert(await page.locator('dialog').evaluate(e=>e.open));await page.keyboard.press('Escape');assert(await page.locator('.menu-toggle').evaluate(e=>e===document.activeElement));
  await page.locator('.filters button').nth(2).click();await page.waitForFunction(()=>document.querySelectorAll('.work-grid>div:not([hidden])').length===3);assert((await page.url()).endsWith('#work-crm'));await page.reload();await page.waitForFunction(()=>document.querySelectorAll('.work-grid>div:not([hidden])').length===3);
  const faq=page.locator('.faq-item button').first();await faq.click();assert.equal(await faq.getAttribute('aria-expanded'),'true');await faq.press('Space');assert.equal(await faq.getAttribute('aria-expanded'),'false');
  await page.locator('.carousel-controls button').last().click();assert.equal(await page.locator('.carousel-controls .mono').innerText(),'2 / 3');
  await page.route('**/api/contact',r=>r.fulfill({status:200,contentType:'application/json',body:r.request().method()==='GET'?'{"token":"local-ui-test"}':'{"ok":true}'}));
  await page.locator('button[type=submit]').click();assert.equal(await page.locator('[aria-invalid=true]').count(),3);
  await page.locator('#contact-name').fill('Local test');await page.locator('#contact-email').fill('test@example.com');await page.locator('#contact-message').fill('A local interface test, no email is sent.');await page.locator('button[type=submit]').click();await page.waitForFunction(()=>document.querySelector('.form-status')?.textContent?.length>0);
  const success=await page.locator('.form-status').innerText();assert.equal(await page.locator('#contact-name').inputValue(),'');
  await page.route('**/api/contact',r=>r.fulfill({status:503,contentType:'application/json',body:'{"error":"unavailable"}'}));
  await page.locator('#contact-name').fill('Local test');await page.locator('#contact-email').fill('test@example.com');await page.locator('#contact-message').fill('Preserve this message when delivery fails.');await page.locator('button[type=submit]').click();await page.waitForFunction(()=>document.querySelector('.form-status')?.textContent?.length>0);assert.notEqual(await page.locator('.form-status').innerText(),success);assert.equal(await page.locator('#contact-message').inputValue(),'Preserve this message when delivery fails.');
  await page.locator('[data-back-top]').click();assert(await page.locator('#top').evaluate(e=>e===document.activeElement));
  report.controls.push({locale,menu:true,skipLink:true,filtersAndReload:true,faqKeyboard:true,carousel:true,form:'Mocked success and failure; no email sent',backToTop:true});
  await page.emulateMedia({colorScheme:'dark'});await page.goto(base+prefix);await page.evaluate(()=>document.fonts.ready);const dark=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();report.accessibility.push({locale,route:'',scheme:'dark',violations:dark.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});await page.screenshot({path:`work/growth-qa/${locale}-dark.png`,fullPage:true});
  await context.close();
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:360,height:900},reducedMotion:'reduce'}),staticPage=await nojs.newPage();await staticPage.goto(base+prefix);assert.equal(await staticPage.locator('html').getAttribute('lang'),locale);assert.equal(await staticPage.locator('h1').count(),1);assert.equal(await staticPage.locator('.work-card').count(),6);assert.equal(await staticPage.locator('.faq-item [role=region]:visible').count(),6);await nojs.close();
 }
 const p=await browser.newPage();const response=await p.goto(base+'/missing-growth-page');assert.equal(response.status(),404);assert.equal(await p.locator('h1').count(),1);await p.close();
}finally{await browser.close();await fs.writeFile('work/growth-qa/results.json',JSON.stringify(report,null,2));}
const issues=report.layouts.filter(p=>p.scroll>p.width),a11y=report.accessibility.filter(p=>p.violations.length);
console.log(JSON.stringify({layouts:report.layouts.length,issues,accessibility:a11y,controls:report.controls,errors:report.errors},null,2));
if(issues.length||a11y.length||report.errors.length)process.exitCode=1;
