import type { ModuleImpl } from '../../types/module';

const TOP_ID = 'page-shield-focus-top';
const BOT_ID = 'page-shield-focus-bot';

let moveHandler: ((e: MouseEvent) => void) | null = null;

const BASE_STYLE = `
  position: fixed;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 2147483645;
  transition: height 0.04s linear;
`;

function createMask(id: string, bg: string): HTMLDivElement {
  const div = document.createElement('div');
  div.id = id;
  div.style.cssText = BASE_STYLE + `background: ${bg};`;
  return div;
}

function remove(): void {
  document.getElementById(TOP_ID)?.remove();
  document.getElementById(BOT_ID)?.remove();
  if (moveHandler) {
    document.removeEventListener('mousemove', moveHandler);
    moveHandler = null;
  }
}

export const focusModule: ModuleImpl = {
  activate(settings) {
    remove();

    const half = ((settings.height as number) ?? 80) / 2;
    const alpha = ((settings.opacity as number) ?? 60) / 100;
    const bg = `rgba(0, 0, 0, ${alpha})`;

    const top = createMask(TOP_ID, bg);
    const bot = createMask(BOT_ID, bg);

    // Start both masks covering the full screen until first mouse move
    top.style.top = '0';
    top.style.height = '50%';
    bot.style.top = '50%';
    bot.style.height = '50%';

    document.body.appendChild(top);
    document.body.appendChild(bot);

    moveHandler = (e: MouseEvent) => {
      const y = e.clientY;
      const topH = Math.max(0, y - half);
      const botTop = y + half;

      top.style.height = `${topH}px`;
      bot.style.top = `${botTop}px`;
      bot.style.height = `${Math.max(0, window.innerHeight - botTop)}px`;
    };

    document.addEventListener('mousemove', moveHandler, { passive: true });
  },

  deactivate() {
    remove();
  },
};
