import type { ModuleImpl } from '../../types/module';
import { watchNodes } from '../../core/dom-utils';

const ORIG_ATTR = 'data-ps-lh-orig';
let mutObs: MutationObserver | null = null;

const COLORS: Record<string, string> = {
  blue:   'rgba(100,149,237,0.10)',
  yellow: 'rgba(255,220,0,0.12)',
  green:  'rgba(100,200,100,0.10)',
  pink:   'rgba(255,160,200,0.12)',
};

function applyTo(el: HTMLElement, color: string) {
  if (el.dataset.psLhOrig !== undefined) return;
  const computed = getComputedStyle(el);
  const lhStr = computed.lineHeight;
  const lh = lhStr === 'normal' ? 24 : (parseFloat(lhStr) || 24);
  el.dataset.psLhOrig = el.style.backgroundImage + '|' + el.style.backgroundSize + '|' + el.style.backgroundPosition;
  el.style.setProperty('background-image', `repeating-linear-gradient(to bottom,transparent 0px,transparent ${lh}px,${color} ${lh}px,${color} ${lh * 2}px)`, 'important');
  el.style.setProperty('background-size', `100% ${lh * 2}px`, 'important');
  el.style.setProperty('background-position', '0 0', 'important');
}

function process(root: Document | Element, color: string) {
  root.querySelectorAll<HTMLElement>('p, li').forEach(el => applyTo(el, color));
}

function restore() {
  document.querySelectorAll<HTMLElement>(`[${ORIG_ATTR}]`).forEach(el => {
    const [bi, bs, bp] = (el.dataset.psLhOrig ?? '||').split('|');
    el.style.backgroundImage = bi;
    el.style.backgroundSize = bs;
    el.style.backgroundPosition = bp;
    delete el.dataset.psLhOrig;
  });
}

export const lineHighlightModule: ModuleImpl = {
  activate(settings) {
    const color = COLORS[(settings.color as string) ?? 'blue'] ?? COLORS.blue;
    process(document, color);
    mutObs = watchNodes(el => process(el, color));
  },
  deactivate() {
    mutObs?.disconnect(); mutObs = null;
    restore();
  },
};
