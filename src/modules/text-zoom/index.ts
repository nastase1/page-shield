import type { ModuleImpl } from '../../types/module';
import { injectStyle, removeById } from '../../core/dom-utils';

const STYLE_ID = 'ps-text-zoom';

export const textZoomModule: ModuleImpl = {
  activate(settings) {
    const scale = (settings.scale as number) ?? 120;
    injectStyle(STYLE_ID, `html { font-size: ${scale}% !important; }`);
  },
  deactivate() { removeById(STYLE_ID); },
};
