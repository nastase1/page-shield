import type { ModuleImpl } from '../../types/module';
import { injectStyle, removeById } from '../../core/dom-utils';

const STYLE_ID = 'ps-text-spacing';

export const textSpacingModule: ModuleImpl = {
  activate(settings) {
    const ls = (settings.letterSpacing as number) ?? 2;
    const ws = (settings.wordSpacing as number) ?? 4;
    const lh = (settings.lineHeight as number) ?? 175;
    injectStyle(STYLE_ID, `
      body, body * {
        letter-spacing: ${ls}px !important;
        word-spacing: ${ws}px !important;
        line-height: ${lh}% !important;
      }
    `);
  },
  deactivate() { removeById(STYLE_ID); },
};
