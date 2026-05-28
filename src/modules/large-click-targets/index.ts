import type { ModuleImpl } from '../../types/module';
import { injectStyle, removeById } from '../../core/dom-utils';

const STYLE_ID = 'ps-large-targets';

export const largeClickTargetsModule: ModuleImpl = {
  activate(settings) {
    const s = (settings.minSize as number) ?? 44;
    const pad = Math.round((s - 24) / 2);
    injectStyle(STYLE_ID, `
      a, button, [role="button"],
      input[type="checkbox"], input[type="radio"],
      input[type="submit"], input[type="reset"],
      select, label[for] {
        min-height: ${s}px !important;
        min-width: ${s}px !important;
        padding: ${pad}px !important;
        box-sizing: border-box !important;
      }
    `);
  },
  deactivate() { removeById(STYLE_ID); },
};
