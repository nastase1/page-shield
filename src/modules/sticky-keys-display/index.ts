import type { ModuleImpl } from '../../types/module';
import { removeById, WIDGET_BASE } from '../../core/dom-utils';

const ID = 'ps-sticky-keys';
let downHandler: ((e: KeyboardEvent) => void) | null = null;
let upHandler: ((e: KeyboardEvent) => void) | null = null;

const KEYS = ['Ctrl', 'Alt', 'Shift', 'Meta'] as const;

function render(w: HTMLElement, active: Set<string>) {
  KEYS.forEach(key => {
    const el = w.querySelector<HTMLElement>(`[data-key="${key}"]`);
    if (!el) return;
    const on = active.has(key);
    el.style.background = on ? '#3b82f6' : '#334155';
    el.style.color = on ? '#fff' : '#94a3b8';
  });
}

export const stickyKeysDisplayModule: ModuleImpl = {
  activate() {
    removeById(ID);
    const active = new Set<string>();

    const w = document.createElement('div');
    w.id = ID;
    w.style.cssText = `${WIDGET_BASE}top:20px;right:20px;display:flex;gap:6px;padding:8px 12px;`;
    w.innerHTML = KEYS.map(k =>
      `<span data-key="${k}" style="border-radius:5px;padding:3px 8px;font-size:12px;font-weight:600;background:#334155;color:#94a3b8;transition:background 0.1s">${k}</span>`
    ).join('');
    document.body.appendChild(w);

    const map: Record<string, string> = {
      Control: 'Ctrl', Alt: 'Alt', Shift: 'Shift', Meta: 'Meta',
    };

    downHandler = (e: KeyboardEvent) => {
      const k = map[e.key];
      if (k) { active.add(k); render(w, active); }
    };
    upHandler = (e: KeyboardEvent) => {
      const k = map[e.key];
      if (k) { active.delete(k); render(w, active); }
    };

    document.addEventListener('keydown', downHandler, true);
    document.addEventListener('keyup', upHandler, true);
  },
  deactivate() {
    if (downHandler) { document.removeEventListener('keydown', downHandler, true); downHandler = null; }
    if (upHandler) { document.removeEventListener('keyup', upHandler, true); upHandler = null; }
    removeById(ID);
  },
};
