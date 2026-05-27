import type { ModuleImpl } from '../../types/module';

const RING_ID = 'page-shield-cursor-ring';

const COLORS: Record<string, string> = {
  yellow: '#FFD700',
  red:    '#FF4040',
  blue:   '#4090FF',
  green:  '#40C040',
  white:  '#FFFFFF',
};

let moveHandler: ((e: MouseEvent) => void) | null = null;

function inject(size: number, color: string, thickness: number): void {
  remove();

  const ring = document.createElement('div');
  ring.id = RING_ID;

  const half = Math.round(size / 2);
  const hex = COLORS[color] ?? COLORS.yellow;

  ring.style.cssText = `
    position: fixed;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    border: ${thickness}px solid ${hex};
    box-shadow: 0 0 6px rgba(0,0,0,0.4);
    pointer-events: none;
    z-index: 2147483647;
    top: 0;
    left: 0;
    will-change: transform;
    transition: border-color 0.1s;
  `;

  document.body.appendChild(ring);

  moveHandler = (e: MouseEvent) => {
    ring.style.transform = `translate(${e.clientX - half}px, ${e.clientY - half}px)`;
  };

  document.addEventListener('mousemove', moveHandler, { passive: true });
}

function remove(): void {
  document.getElementById(RING_ID)?.remove();
  if (moveHandler) {
    document.removeEventListener('mousemove', moveHandler);
    moveHandler = null;
  }
}

export const cursorModule: ModuleImpl = {
  activate(settings) {
    inject(
      (settings.size as number) ?? 40,
      (settings.color as string) ?? 'yellow',
      (settings.thickness as number) ?? 3,
    );
  },
  deactivate() {
    remove();
  },
};
