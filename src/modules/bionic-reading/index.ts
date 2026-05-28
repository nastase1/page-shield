import type { ModuleImpl } from '../../types/module';
import { collectTextNodes, watchNodes } from '../../core/dom-utils';

const ORIG_ATTR = 'data-ps-bionic';
const SKIP_TAGS = ['script', 'style', 'code', 'pre', 'kbd', 'input', 'textarea', 'svg', 'math'];
let mutObs: MutationObserver | null = null;
let boldRatio = 0.45;

function processTextNode(node: Text) {
  const text = node.nodeValue ?? '';
  if (!text.trim()) return;
  const frag = document.createDocumentFragment();
  text.split(/(\s+)/).forEach(part => {
    if (!part) return;
    if (/^\s/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
    if (part.length < 3) { frag.appendChild(document.createTextNode(part)); return; }
    const cut = Math.max(1, Math.ceil(part.length * boldRatio));
    const b = document.createElement('b');
    b.textContent = part.slice(0, cut);
    frag.appendChild(b);
    frag.appendChild(document.createTextNode(part.slice(cut)));
  });
  node.parentNode?.replaceChild(frag, node);
}

function processEl(el: Element) {
  if (el.hasAttribute(ORIG_ATTR)) return;
  const tag = el.tagName.toLowerCase();
  if (SKIP_TAGS.includes(tag)) return;
  // Check not already inside a processed ancestor
  let parent = el.parentElement;
  while (parent) { if (parent.hasAttribute(ORIG_ATTR)) return; parent = parent.parentElement; }
  el.setAttribute(ORIG_ATTR, el.innerHTML);
  collectTextNodes(el).forEach(processTextNode);
}

function processAll(root: Document | Element = document) {
  root.querySelectorAll<Element>('p, li, h1, h2, h3, h4, h5, h6, td, th, figcaption').forEach(processEl);
}

function restore() {
  // Restore from deepest first to avoid outer overwriting inner
  const els = [...document.querySelectorAll<Element>(`[${ORIG_ATTR}]`)];
  els.reverse().forEach(el => {
    el.innerHTML = el.getAttribute(ORIG_ATTR)!;
    el.removeAttribute(ORIG_ATTR);
  });
}

export const bionicReadingModule: ModuleImpl = {
  activate(settings) {
    boldRatio = ((settings.intensity as number) ?? 45) / 100;
    processAll();
    mutObs = watchNodes(el => processAll(el));
  },
  deactivate() {
    mutObs?.disconnect(); mutObs = null;
    restore();
  },
};
