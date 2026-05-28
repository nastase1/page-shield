import type { ModuleImpl } from '../../types/module';
import { injectStyle, removeById, watchNodes } from '../../core/dom-utils';

const STYLE_ID = 'ps-anim-blocker';
const GIF_ATTR = 'data-ps-gif-src';
const GIF_W_ATTR = 'data-ps-gif-w';
const GIF_H_ATTR = 'data-ps-gif-h';
const BLANK_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
let mutObs: MutationObserver | null = null;

function buildCss(ms: number): string {
  return `*, *::before, *::after {
    animation-duration: ${ms}ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: ${ms}ms !important;
    scroll-behavior: auto !important;
  }`;
}

function isGif(img: HTMLImageElement) {
  return /\.gif($|\?)/i.test(img.src) || img.src.startsWith('data:image/gif');
}

function freezeGif(img: HTMLImageElement) {
  if (img.hasAttribute(GIF_ATTR) || !img.complete || !img.naturalWidth) return;
  const origSrc = img.src;
  const w = img.naturalWidth, h = img.naturalHeight;
  try {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    c.getContext('2d')?.drawImage(img, 0, 0);
    img.setAttribute(GIF_ATTR, origSrc);
    img.src = c.toDataURL('image/png');
  } catch {
    // Cross-origin canvas is tainted — freeze by swapping to a blank 1×1 GIF
    // and locking the layout dimensions so the space is preserved.
    img.setAttribute(GIF_ATTR, origSrc);
    img.setAttribute(GIF_W_ATTR, String(w));
    img.setAttribute(GIF_H_ATTR, String(h));
    img.style.width = w + 'px';
    img.style.height = h + 'px';
    img.src = BLANK_GIF;
  }
}

function restoreGifs() {
  document.querySelectorAll<HTMLImageElement>(`img[${GIF_ATTR}]`).forEach(img => {
    img.src = img.getAttribute(GIF_ATTR)!;
    img.removeAttribute(GIF_ATTR);
    if (img.hasAttribute(GIF_W_ATTR)) {
      img.style.width = '';
      img.style.height = '';
      img.removeAttribute(GIF_W_ATTR);
      img.removeAttribute(GIF_H_ATTR);
    }
  });
}

function processGifsIn(root: Document | Element, pause: boolean) {
  if (!pause) return;
  root.querySelectorAll<HTMLImageElement>('img').forEach(img => {
    if (!isGif(img)) return;
    img.complete ? freezeGif(img) : img.addEventListener('load', () => freezeGif(img), { once: true });
  });
}

export const animationBlockerModule: ModuleImpl = {
  activate(settings) {
    const ms = (settings.minDuration as number) ?? 400;
    const pauseGifs = (settings.pauseGifs as boolean) ?? true;
    injectStyle(STYLE_ID, buildCss(ms));
    processGifsIn(document, pauseGifs);
    mutObs = watchNodes(el => processGifsIn(el, pauseGifs));
  },
  deactivate() {
    removeById(STYLE_ID);
    mutObs?.disconnect();
    mutObs = null;
    restoreGifs();
  },
};
