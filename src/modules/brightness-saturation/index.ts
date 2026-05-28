import type { ModuleImpl } from '../../types/module';
import { injectStyle, removeById } from '../../core/dom-utils';

const STYLE_ID = 'ps-brightness-sat';

export const brightnessSaturationModule: ModuleImpl = {
  activate(settings) {
    const b = (settings.brightness as number) ?? 100;
    const s = (settings.saturation as number) ?? 100;
    injectStyle(STYLE_ID, `html { filter: brightness(${b}%) saturate(${s}%) !important; }`);
  },
  deactivate() { removeById(STYLE_ID); },
};
