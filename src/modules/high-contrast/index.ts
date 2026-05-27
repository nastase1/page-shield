import type { ModuleImpl } from '../../types/module';

const STYLE_ID = 'page-shield-hc';

// CSS filter strings per theme.
// yellow-on-black / green-on-black: invert first, then shift hue via sepia+saturate.
const FILTERS: Record<string, string> = {
  'dark':            'contrast(1.8) brightness(0.85)',
  'light':           'contrast(1.6) brightness(1.15) saturate(1.2)',
  'inverted':        'invert(1) hue-rotate(180deg)',
  'yellow-on-black': 'invert(1) sepia(1) saturate(8) hue-rotate(38deg)',
  'green-on-black':  'invert(1) sepia(1) saturate(8) hue-rotate(80deg)',
};

function inject(theme: string): void {
  remove();
  const f = FILTERS[theme];
  if (!f) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  // Apply to html so images and all elements are affected.
  // Exclude our own injected overlay elements so they don't double-filter.
  style.textContent = `
    html { filter: ${f} !important; }
    [id^="page-shield-"] { filter: none !important; }
  `;
  document.head.appendChild(style);
}

function remove(): void {
  document.getElementById(STYLE_ID)?.remove();
}

export const highContrastModule: ModuleImpl = {
  activate(settings) {
    inject((settings.theme as string) ?? 'dark');
  },
  deactivate() {
    remove();
  },
};
