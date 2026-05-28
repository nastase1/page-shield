import type { ModuleImpl } from '../../types/module';
import { injectStyle, removeById } from '../../core/dom-utils';

const STYLE_ID = 'ps-simplifier';

export const pageSimplifierModule: ModuleImpl = {
  activate(settings) {
    const parts: string[] = [];
    if (settings.removeBackgrounds !== false) {
      parts.push(`* { background-image: none !important; background-color: transparent !important; }`);
      parts.push(`body { background-color: #fff !important; }`);
    }
    if (settings.removeDecorative !== false) {
      // Hide images with empty alt (purely decorative) and role="presentation"
      parts.push(`img[alt=""], img[role="presentation"], [aria-hidden="true"] > img { display: none !important; }`);
    }
    // Always simplify
    parts.push(`
      header, footer, nav, .nav, .navigation { background: #f8fafc !important; }
      * { box-shadow: none !important; text-shadow: none !important; border-radius: 0 !important; }
    `);
    injectStyle(STYLE_ID, parts.join('\n'));
  },
  deactivate() { removeById(STYLE_ID); },
};
