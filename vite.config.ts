import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import visibility from './src/data/visibility.json';

// index.html carries <!--bhp-->…<!--/bhp--> and <!--nobhp-->…<!--/nobhp--> blocks; keep the set
// matching src/data/visibility.json so the search summary agrees with the site.
const SHOW_BHP = visibility.showBHP;
const bhpHtml = {
  name: 'bhp-visibility',
  transformIndexHtml(html: string) {
    const drop = SHOW_BHP ? 'nobhp' : 'bhp';
    const keep = SHOW_BHP ? 'bhp' : 'nobhp';
    return html
      .replace(new RegExp(`[ \\t]*<!--${drop}-->[\\s\\S]*?<!--/${drop}-->\\n?`, 'g'), '')
      .replace(new RegExp(`<!--/?${keep}-->`, 'g'), '');
  },
  // The uploaded resume PDF lists the BHP role, so it is left out of the build while that role is hidden.
  async closeBundle() {
    if (SHOW_BHP) return;
    const fs: { rmSync: (p: string, o: { force: boolean }) => void } = await import(/* @vite-ignore */ 'node:fs' as string);
    fs.rmSync('dist/assets/Prashant_Yadav_Resume.pdf', { force: true });
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), bhpHtml],
  define: { __SHOW_BHP__: JSON.stringify(SHOW_BHP) },
  // Local dev: forward the AI Recruiter API to `npm run dev` in worker/ (wrangler, port 8787)
  server: { proxy: { '/api': 'http://127.0.0.1:8787' } },
  preview: { proxy: { '/api': 'http://127.0.0.1:8787' } },
  build: {
    target: 'es2020',
  },
});
