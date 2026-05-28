import type { ModuleImpl } from '../../types/module';
import { injectStyle, removeById } from '../../core/dom-utils';

const STYLE_ID = 'ps-custom-cursor';

const SIZES: Record<string, number> = { large: 32, xl: 48, huge: 64 };
const FILLS: Record<string, [string, string]> = {
  black: ['#000000', '#ffffff'],
  white: ['#ffffff', '#000000'],
  red:   ['#cc0000', '#ffffff'],
};

// Arrow cursor SVG path in a 16×24 viewBox. Hotspot at top-left (0, 0).
function makeSvg(fill: string, stroke: string, width: number): string {
  const h = Math.round(width * 1.5);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${h}' viewBox='0 0 16 24'><path d='M0,0 L0,22 L6,17 L9,24 L12,22 L9,15 L16,15 Z' fill='${fill}' stroke='${stroke}' stroke-width='1' stroke-linejoin='round'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 0 0, auto`;
}

export const customCursorModule: ModuleImpl = {
  activate(settings) {
    const size = SIZES[(settings.size as string) ?? 'large'] ?? 32;
    const [fill, stroke] = FILLS[(settings.color as string) ?? 'black'] ?? FILLS.black;
    const cursorVal = makeSvg(fill, stroke, size);
    injectStyle(STYLE_ID, `*, *::before, *::after { cursor: ${cursorVal} !important; }`);
  },
  deactivate() { removeById(STYLE_ID); },
};
