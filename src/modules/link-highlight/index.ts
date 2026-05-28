import type { ModuleImpl } from '../../types/module';
import { injectStyle, removeById } from '../../core/dom-utils';

const STYLE_ID = 'ps-link-highlight';
const COLORS: Record<string, string> = {
  blue: '#2563eb', orange: '#ea580c', green: '#16a34a', red: '#dc2626', purple: '#7c3aed',
};

export const linkHighlightModule: ModuleImpl = {
  activate(settings) {
    const color = COLORS[(settings.color as string) ?? 'orange'] ?? COLORS.orange;
    const bold = (settings.bold as boolean) ?? true;
    injectStyle(STYLE_ID, `
      a, a:visited {
        text-decoration: underline !important;
        text-underline-offset: 3px !important;
        outline: 2px solid ${color} !important;
        outline-offset: 1px !important;
        border-radius: 2px !important;
        ${bold ? 'font-weight: bold !important;' : ''}
      }
    `);
  },
  deactivate() { removeById(STYLE_ID); },
};
