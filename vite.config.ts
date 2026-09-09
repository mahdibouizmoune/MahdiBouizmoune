import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';
export default defineConfig(async () => {
  const plugins = [vinext()];
  if (process.env.NITRO_PRESET === 'vercel') {
    const { nitro } = await import('nitro/vite');
    plugins.push(nitro());
  }
  return {
    css: { postcss: { plugins: [tailwindcss()] } },
    plugins,
    server: { host: '127.0.0.1', port: 5173, strictPort: true },
  };
});
