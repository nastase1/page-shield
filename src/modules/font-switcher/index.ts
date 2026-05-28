import type { ModuleImpl } from '../../types/module';
import { injectStyle, removeById } from '../../core/dom-utils';

const STYLE_ID = 'ps-font-switcher';
const LINK_ID = 'ps-font-link';

// System font stacks
const SYSTEM_FONTS: Record<string, string> = {
  arial:      "Arial, Helvetica, sans-serif",
  verdana:    "Verdana, Geneva, sans-serif",
  'comic-sans': "'Comic Sans MS', 'Comic Sans', cursive",
  monospace:  "'Courier New', Courier, monospace",
};

// CDN-loaded fonts (requires internet)
const CDN_FONTS: Record<string, { face: string; family: string }> = {
  opendyslexic: {
    face: "@font-face { font-family: 'OpenDyslexic'; src: url('https://cdn.jsdelivr.net/gh/antijingoist/opendyslexic@master/compiled/OpenDyslexic-Regular.otf'); }",
    family: "'OpenDyslexic', sans-serif",
  },
  lexie: {
    face: "@font-face { font-family: 'LexieReadable'; src: url('https://cdn.jsdelivr.net/gh/googlefonts/lexend@latest/fonts/lexend/ttf/Lexend-Regular.ttf'); }",
    family: "'LexieReadable', sans-serif",
  },
};

export const fontSwitcherModule: ModuleImpl = {
  activate(settings) {
    const font = (settings.font as string) ?? 'arial';
    removeById(LINK_ID);
    removeById(STYLE_ID);

    let family: string;
    const cdnFont = CDN_FONTS[font];
    if (cdnFont) {
      const style = document.createElement('style');
      style.id = LINK_ID;
      style.textContent = cdnFont.face;
      document.head.appendChild(style);
      family = cdnFont.family;
    } else {
      family = SYSTEM_FONTS[font] ?? SYSTEM_FONTS.arial;
    }

    injectStyle(STYLE_ID, `body, body * { font-family: ${family} !important; }`);
  },

  deactivate() {
    removeById(STYLE_ID);
    removeById(LINK_ID);
  },
};
