import type { ModuleImpl } from '../../types/module';
import { removeById } from '../../core/dom-utils';

const TOP_ID = 'ps-mask-top';
const BOT_ID = 'ps-mask-bot';
let moveHandler: ((e: MouseEvent) => void) | null = null;

const BASE = `position:fixed;left:0;width:100%;pointer-events:none;z-index:2147483645;`;

export const readingMaskModule: ModuleImpl = {
  activate(settings) {
    removeById(TOP_ID); removeById(BOT_ID);
    const half = ((settings.height as number) ?? 80) / 2;
    const alpha = ((settings.opacity as number) ?? 65) / 100;
    const bg = `rgba(0,0,0,${alpha})`;

    const top = document.createElement('div');
    top.id = TOP_ID;
    top.style.cssText = `${BASE}background:${bg};top:0;height:50%;`;

    const bot = document.createElement('div');
    bot.id = BOT_ID;
    bot.style.cssText = `${BASE}background:${bg};top:50%;height:50%;`;

    document.body.appendChild(top);
    document.body.appendChild(bot);

    moveHandler = (e: MouseEvent) => {
      const y = e.clientY;
      top.style.height = `${Math.max(0, y - half)}px`;
      bot.style.top = `${y + half}px`;
      bot.style.height = `${Math.max(0, window.innerHeight - y - half)}px`;
    };
    document.addEventListener('mousemove', moveHandler, { passive: true });
  },
  deactivate() {
    removeById(TOP_ID); removeById(BOT_ID);
    if (moveHandler) { document.removeEventListener('mousemove', moveHandler); moveHandler = null; }
  },
};
