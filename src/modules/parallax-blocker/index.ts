import type { ModuleImpl } from '../../types/module';
import { injectStyle, removeById } from '../../core/dom-utils';

const STYLE_ID = 'ps-parallax';

export const parallaxBlockerModule: ModuleImpl = {
  activate() {
    injectStyle(STYLE_ID, `
      * {
        background-attachment: scroll !important;
        transform: none !important;
        perspective: none !important;
        will-change: auto !important;
      }
      [data-scroll], [data-parallax] {
        transform: none !important;
      }
    `);
  },
  deactivate() { removeById(STYLE_ID); },
};
