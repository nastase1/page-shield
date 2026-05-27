import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import type { ManifestV3Export } from '@crxjs/vite-plugin';
import chromeManifest from './manifests/chrome.json';
import firefoxManifest from './manifests/firefox.json';

export default defineConfig(({ mode }) => {
  const isFirefox = mode === 'firefox';
  const manifest = (isFirefox ? firefoxManifest : chromeManifest) as ManifestV3Export;

  return {
    plugins: [react(), crx({ manifest })],
    build: {
      outDir: isFirefox ? 'dist/firefox' : 'dist/chrome',
      emptyOutDir: true,
    },
  };
});
