import type { ModuleImpl } from '../../types/module';
import { removeById, WIDGET_BASE } from '../../core/dom-utils';

const ID = 'ps-sync-badge';

export const syncSettingsModule: ModuleImpl = {
  activate() {
    removeById(ID);
    const badge = document.createElement('div');
    badge.id = ID;
    badge.style.cssText = `${WIDGET_BASE}top:10px;left:50%;transform:translateX(-50%);padding:5px 14px;font-size:11px;opacity:0.85;`;
    badge.textContent = '☁️ PageShield sync active';
    document.body.appendChild(badge);
    // Fade out after 3s
    setTimeout(() => { badge.style.transition = 'opacity 1s'; badge.style.opacity = '0'; }, 3000);
    setTimeout(() => removeById(ID), 4200);
  },
  deactivate() { removeById(ID); },
};
