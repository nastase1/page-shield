import type { ModuleImpl } from '../../types/module';
import { removeById, WIDGET_BASE } from '../../core/dom-utils';

const ID = 'ps-auto-scroll';
let rafId: number | null = null;
let scrolling = false;
let pxPerFrame = 2;

function loop() {
  if (scrolling) window.scrollBy(0, pxPerFrame);
  rafId = requestAnimationFrame(loop);
}

export const autoScrollModule: ModuleImpl = {
  activate(settings) {
    removeById(ID);
    pxPerFrame = (settings.speed as number) ?? 2;
    scrolling = false;

    const w = document.createElement('div');
    w.id = ID;
    w.style.cssText = `${WIDGET_BASE}bottom:20px;left:20px;padding:8px 12px;display:flex;gap:8px;align-items:center;`;
    w.innerHTML = `
      <span style="font-size:11px;color:#94a3b8">Auto-scroll</span>
      <button data-toggle style="border:none;border-radius:6px;background:#22c55e;color:#fff;padding:3px 10px;cursor:pointer;font-size:13px">▶</button>
      <button data-fast style="border:none;border-radius:6px;background:#475569;color:#fff;padding:3px 8px;cursor:pointer;font-size:11px">+</button>
      <button data-slow style="border:none;border-radius:6px;background:#475569;color:#fff;padding:3px 8px;cursor:pointer;font-size:11px">−</button>
    `;
    const btn = w.querySelector<HTMLButtonElement>('[data-toggle]')!;
    w.querySelector('[data-toggle]')!.addEventListener('click', () => {
      scrolling = !scrolling;
      btn.textContent = scrolling ? '⏸' : '▶';
      btn.style.background = scrolling ? '#ef4444' : '#22c55e';
    });
    w.querySelector('[data-fast]')!.addEventListener('click', () => { pxPerFrame = Math.min(10, pxPerFrame + 1); });
    w.querySelector('[data-slow]')!.addEventListener('click', () => { pxPerFrame = Math.max(1, pxPerFrame - 1); });
    document.body.appendChild(w);

    rafId = requestAnimationFrame(loop);
  },
  deactivate() {
    scrolling = false;
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    removeById(ID);
  },
};
