import type { ModuleImpl } from '../../types/module';

const STYLE_ID = 'page-shield-epilepsy';
const GIF_ATTR = 'data-ps-gif-src';

let mutationObserver: MutationObserver | null = null;
let intersectionObserver: IntersectionObserver | null = null;

function buildStyles(threshold: number): string {
  // Force all animations and transitions to run no faster than threshold ms.
  // animation-iteration-count: 1 prevents infinite flashing loops.
  return `
    *, *::before, *::after {
      animation-duration: ${threshold}ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: ${threshold}ms !important;
      scroll-behavior: auto !important;
    }
  `;
}

function injectStyles(threshold: number): void {
  removeStyles();
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = buildStyles(threshold);
  document.head.appendChild(style);
}

function removeStyles(): void {
  document.getElementById(STYLE_ID)?.remove();
}

function freezeGif(img: HTMLImageElement): void {
  if (img.hasAttribute(GIF_ATTR) || !img.complete || img.naturalWidth === 0) return;

  try {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d')?.drawImage(img, 0, 0);
    const frozen = canvas.toDataURL('image/png');
    img.setAttribute(GIF_ATTR, img.src);
    img.src = frozen;
  } catch {
    // Cross-origin images cannot be drawn to canvas — skip silently.
  }
}

function unfreezeGif(img: HTMLImageElement): void {
  const original = img.getAttribute(GIF_ATTR);
  if (!original) return;
  img.src = original;
  img.removeAttribute(GIF_ATTR);
}

function isAnimatedGif(img: HTMLImageElement): boolean {
  return /\.gif($|\?)/i.test(img.src) || img.src.startsWith('data:image/gif');
}

function processGifs(root: Document | Element = document): void {
  root.querySelectorAll<HTMLImageElement>('img').forEach(img => {
    if (!isAnimatedGif(img)) return;
    if (img.complete) {
      freezeGif(img);
    } else {
      img.addEventListener('load', () => freezeGif(img), { once: true });
    }
  });
}

function restoreGifs(): void {
  document.querySelectorAll<HTMLImageElement>(`img[${GIF_ATTR}]`).forEach(unfreezeGif);
}

export const epilepsyModule: ModuleImpl = {
  activate(settings) {
    const threshold = (settings.animationThreshold as number) ?? 400;

    injectStyles(threshold);

    if (settings.pauseGifs) processGifs();

    mutationObserver = new MutationObserver(mutations => {
      for (const { addedNodes } of mutations) {
        addedNodes.forEach(node => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node as Element;
          if (settings.pauseGifs) processGifs(el);
        });
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // IntersectionObserver reserved for future video/canvas flash detection.
    intersectionObserver = new IntersectionObserver(() => {});
  },

  deactivate() {
    mutationObserver?.disconnect();
    mutationObserver = null;
    intersectionObserver?.disconnect();
    intersectionObserver = null;
    removeStyles();
    restoreGifs();
  },
};
