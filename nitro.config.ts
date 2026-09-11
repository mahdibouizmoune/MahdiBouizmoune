import {defineConfig} from 'nitro';
import en from './locales/en.json';
const paths=['/','/work','/clients',...Object.keys(en.work).map(s=>'/work/'+s)];
export default defineConfig({compressPublicAssets:true,prerender:{routes:[...['','/fr','/ar'].flatMap(prefix=>paths.map(p=>prefix+(p==='/'&&prefix?'':p))),'/robots.txt','/sitemap.xml'],failOnError:true,concurrency:2}});
