import type { ModuleImpl } from '../../types/module';
import { injectStyle, removeById, watchNodes } from '../../core/dom-utils';

const STYLE_ID = 'ps-night-mode';
let mutObs: MutationObserver | null = null;

export const nightModeModule: ModuleImpl = {
  activate(settings) {
    const warmth = (settings.warmth as number) ?? 20;
    // sepia() adds warmth (amber tint = reduces blue). 0 → no warmth, 50 → strong warm tint.
    const sepia = warmth / 100;
    injectStyle(STYLE_ID, `
      html {
        filter: invert(1) hue-rotate(180deg) sepia(${sepia}) !important;
        background-color: #111 !important;
      }
      img, video, picture, canvas, iframe,
      [id^="page-shield-"], [id^="ps-"] {
        filter: invert(1) hue-rotate(180deg) !important;
      }
    `);
    mutObs = watchNodes(() => {}); // placeholder — CSS handles new nodes automatically
  },
  deactivate() {
    removeById(STYLE_ID);
    mutObs?.disconnect();
    mutObs = null;
  },
};
