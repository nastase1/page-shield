import type { ModuleImpl } from '../../types/module';

const STYLE_ID = 'page-shield-dyslexia';
const OVERLAY_ID = 'page-shield-dyslexia-overlay';

const FONTS: Record<string, string> = {
  arial: "Arial, Helvetica, sans-serif",
  verdana: "Verdana, Geneva, sans-serif",
  'comic-sans': "'Comic Sans MS', 'Comic Sans', cursive",
  monospace: "'Courier New', Courier, monospace",
};

const OVERLAY_COLORS: Record<string, string> = {
  yellow: 'rgba(255, 230, 0, 0.12)',
  blue: 'rgba(100, 180, 255, 0.15)',
  green: 'rgba(100, 220, 100, 0.12)',
  pink: 'rgba(255, 160, 200, 0.15)',
};

function injectStyles(
  font: string,
  letterSpacing: number,
  lineHeight: number,
): void {
  removeStyles();
  const fontFamily = FONTS[font];
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    body, body * {
      ${fontFamily ? `font-family: ${fontFamily} !important;` : ''}
      letter-spacing: ${letterSpacing}px !important;
      line-height: ${lineHeight}% !important;
      word-spacing: ${Math.round(letterSpacing * 2)}px !important;
    }
  `;
  document.head.appendChild(style);
}

function removeStyles(): void {
  document.getElementById(STYLE_ID)?.remove();
}

function injectOverlay(color: string): void {
  removeOverlay();
  if (color === 'none') return;
  const bg = OVERLAY_COLORS[color];
  if (!bg) return;

  const div = document.createElement('div');
  div.id = OVERLAY_ID;
  div.style.cssText = `
    position: fixed;
    inset: 0;
    background: ${bg};
    pointer-events: none;
    z-index: 2147483646;
  `;
  document.body.appendChild(div);
}

function removeOverlay(): void {
  document.getElementById(OVERLAY_ID)?.remove();
}

export const dyslexiaModule: ModuleImpl = {
  activate(settings) {
    const font = (settings.font as string) ?? 'arial';
    const letterSpacing = (settings.letterSpacing as number) ?? 2;
    const lineHeight = (settings.lineHeight as number) ?? 175;
    const overlay = (settings.overlay as string) ?? 'none';

    injectStyles(font, letterSpacing, lineHeight);
    injectOverlay(overlay);
  },

  deactivate() {
    removeStyles();
    removeOverlay();
  },
};
