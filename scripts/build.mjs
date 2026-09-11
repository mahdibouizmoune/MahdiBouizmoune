import {spawnSync} from 'node:child_process';
const env={...process.env,NITRO_PRESET:'vercel',NODE_ENV:'production',BUILD_DATE:process.env.BUILD_DATE||new Date().toISOString()};
for(const args of [['scripts/check-locales.mjs'],['scripts/prepare-assets.mjs'],['node_modules/vite/bin/vite.js','build'],['scripts/check-links.mjs'],['scripts/check-content.mjs']]){
 const result=spawnSync(process.execPath,args,{env,stdio:'inherit'});if(result.status!==0)process.exit(result.status||1);
}
