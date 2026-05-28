import type { ModuleImpl } from '../../types/module';
import { injectStyle, removeById } from '../../core/dom-utils';

const STYLE_ID = 'ps-reduced-motion';

export const reducedMotionModule: ModuleImpl = {
  activate() {
    injectStyle(STYLE_ID, `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }
    `);
  },
  deactivate() { removeById(STYLE_ID); },
};
