import type { ModuleImpl } from '../../types/module';
import { injectStyle, removeById, watchNodes } from '../../core/dom-utils';

const STYLE_ID = 'ps-smart-invert';
let mutObs: MutationObserver | null = null;

// Invert the whole page, then re-invert media so it appears normal.
const CSS = `
  html { filter: invert(1) hue-rotate(180deg) !important; }
  img, video, picture, canvas, iframe,
  [style*="background-image"] {
    filter: invert(1) hue-rotate(180deg) !important;
  }
  [id^="page-shield-"], [id^="ps-"] { filter: none !important; }
`;

export const smartInvertModule: ModuleImpl = {
  activate() {
    injectStyle(STYLE_ID, CSS);

    // Also re-invert elements whose background-image comes from a CSS class (not inline style).
    const processEl = (el: Element) => {
      const style = window.getComputedStyle(el as HTMLElement);
      if (style.backgroundImage !== 'none') {
        (el as HTMLElement).style.setProperty('filter', 'invert(1) hue-rotate(180deg)', 'important');
      }
    };

    document.querySelectorAll<HTMLElement>('*').forEach(processEl);
    mutObs = watchNodes(processEl);
  },

  deactivate() {
    removeById(STYLE_ID);
    mutObs?.disconnect();
    mutObs = null;
    // Remove inline filter overrides added by this module
    document.querySelectorAll<HTMLElement>('[style]').forEach(el => {
      if (el.style.filter === 'invert(1) hue-rotate(180deg)') {
        el.style.removeProperty('filter');
      }
    });
  },
};
