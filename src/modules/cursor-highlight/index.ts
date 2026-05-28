import type { ModuleImpl } from '../../types/module';
import { removeById } from '../../core/dom-utils';

const RING_ID = 'ps-cursor-ring';
const COLORS: Record<string, string> = {
  yellow: '#FFD700', red: '#FF4040', blue: '#4090FF', green: '#40C040', white: '#FFFFFF',
};
let moveHandler: ((e: MouseEvent) => void) | null = null;

export const cursorHighlightModule: ModuleImpl = {
  activate(settings) {
    removeById(RING_ID);
    const size = (settings.size as number) ?? 40;
    const hex = COLORS[(settings.color as string) ?? 'yellow'] ?? COLORS.yellow;
    const t = (settings.thickness as number) ?? 3;
    const half = Math.round(size / 2);

    const ring = document.createElement('div');
    ring.id = RING_ID;
    ring.style.cssText = `
      position:fixed;width:${size}px;height:${size}px;
      border-radius:50%;border:${t}px solid ${hex};
      box-shadow:0 0 6px rgba(0,0,0,.4);pointer-events:none;
      z-index:2147483647;top:0;left:0;will-change:transform;
    `;
    document.body.appendChild(ring);

    moveHandler = (e: MouseEvent) => {
      ring.style.transform = `translate(${e.clientX - half}px,${e.clientY - half}px)`;
    };
    document.addEventListener('mousemove', moveHandler, { passive: true });
  },
  deactivate() {
    removeById(RING_ID);
    if (moveHandler) { document.removeEventListener('mousemove', moveHandler); moveHandler = null; }
  },
};
