import type { ModuleImpl } from '../../types/module';

const HIDDEN_ATTR = 'data-ps-focus-hidden';
const CONTENT_SELECTORS = [
  'article', 'main', '[role="main"]',
  '#main-content', '#content', '#main',
  '.main-content', '.article-body', '.post-content',
  '.entry-content', '.content-area', '.story-body',
];

function findMainContent(): Element | null {
  for (const sel of CONTENT_SELECTORS) {
    const el = document.querySelector(sel);
    if (el && (el.textContent?.length ?? 0) > 150) return el;
  }
  // Fallback: direct child of body with the most text
  let best: Element | null = null;
  let bestLen = 0;
  [...document.body.children].forEach(child => {
    const len = child.textContent?.length ?? 0;
    if (len > bestLen) { bestLen = len; best = child; }
  });
  return bestLen > 200 ? best : null;
}

function walkToBodyChild(el: Element): Element {
  while (el.parentElement && el.parentElement !== document.body) {
    el = el.parentElement;
  }
  return el;
}

export const focusModeModule: ModuleImpl = {
  activate() {
    const main = findMainContent();
    if (!main) return;
    const bodyChild = walkToBodyChild(main);
    [...document.body.children].forEach(child => {
      if (child === bodyChild || (child as HTMLElement).id?.startsWith('ps-') || (child as HTMLElement).id?.startsWith('page-shield')) return;
      child.setAttribute(HIDDEN_ATTR, (child as HTMLElement).style.display);
      (child as HTMLElement).style.setProperty('display', 'none', 'important');
    });
  },
  deactivate() {
    document.querySelectorAll<HTMLElement>(`[${HIDDEN_ATTR}]`).forEach(el => {
      const orig = el.getAttribute(HIDDEN_ATTR) ?? '';
      el.style.display = orig;
      el.removeAttribute(HIDDEN_ATTR);
    });
  },
};
