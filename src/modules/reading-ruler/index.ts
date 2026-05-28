import type { ModuleImpl } from '../../types/module';
import { removeById } from '../../core/dom-utils';

const LINE_ID = 'ps-reading-ruler';
let moveHandler: ((e: MouseEvent) => void) | null = null;

const COLORS: Record<string, string> = {
  red: '#ef4444', blue: '#3b82f6', green: '#22c55e', orange: '#f97316', black: '#000000',
};

export const readingRulerModule: ModuleImpl = {
  activate(settings) {
    removeById(LINE_ID);
    const color = COLORS[(settings.color as string) ?? 'red'] ?? COLORS.red;
    const opacity = ((settings.opacity as number) ?? 70) / 100;

    const line = document.createElement('div');
    line.id = LINE_ID;
    line.style.cssText = `
      position: fixed; left: 0; width: 100%; height: 2px;
      background: ${color}; opacity: ${opacity};
      pointer-events: none; z-index: 2147483647;
      top: 0; will-change: transform;
    `;
    document.body.appendChild(line);

    moveHandler = (e: MouseEvent) => {
      line.style.transform = `translateY(${e.clientY}px)`;
    };
    document.addEventListener('mousemove', moveHandler, { passive: true });
  },
  deactivate() {
    removeById(LINE_ID);
    if (moveHandler) { document.removeEventListener('mousemove', moveHandler); moveHandler = null; }
  },
};
