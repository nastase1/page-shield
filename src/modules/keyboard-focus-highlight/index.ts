import type { ModuleImpl } from '../../types/module';
import { injectStyle, removeById } from '../../core/dom-utils';

const STYLE_ID = 'ps-kbd-focus';
const COLORS: Record<string, string> = {
  orange: '#f97316', blue: '#3b82f6', red: '#ef4444', green: '#22c55e',
};

export const keyboardFocusHighlightModule: ModuleImpl = {
  activate(settings) {
    const color = COLORS[(settings.color as string) ?? 'orange'] ?? COLORS.orange;
    const size = (settings.size as number) ?? 3;
    injectStyle(STYLE_ID, `
      :focus-visible {
        outline: ${size}px solid ${color} !important;
        outline-offset: 3px !important;
        box-shadow: 0 0 0 ${size + 3}px ${color}33 !important;
        border-radius: 3px !important;
      }
    `);
  },
  deactivate() { removeById(STYLE_ID); },
};
