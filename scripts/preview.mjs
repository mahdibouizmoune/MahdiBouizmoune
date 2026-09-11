import {spawn} from 'node:child_process';
const child=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','5176'],{stdio:'inherit',env:{...process.env,NITRO_PRESET:'vercel'}});
child.on('exit',code=>process.exit(code||0));
