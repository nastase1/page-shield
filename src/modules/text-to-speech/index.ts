import type { ModuleImpl } from '../../types/module';
import { removeById, WIDGET_BASE } from '../../core/dom-utils';

const ID = 'ps-tts';
let upHandler: ((e: MouseEvent) => void) | null = null;
let rate = 1;
let pitch = 1;

function speak(text: string) {
  if (!text.trim()) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = rate;
  utt.pitch = pitch;
  window.speechSynthesis.speak(utt);
}

export const textToSpeechModule: ModuleImpl = {
  activate(settings) {
    removeById(ID);
    rate = ((settings.rate as number) ?? 100) / 100;
    pitch = ((settings.pitch as number) ?? 100) / 100;

    const w = document.createElement('div');
    w.id = ID;
    w.style.cssText = `${WIDGET_BASE}bottom:70px;right:20px;padding:8px 12px;display:flex;gap:8px;align-items:center;`;
    w.innerHTML = `
      <span style="font-size:11px;color:#94a3b8">TTS</span>
      <button data-read style="border:none;border-radius:6px;background:#3b82f6;color:#fff;padding:3px 10px;cursor:pointer;font-size:12px">🔊 Read</button>
      <button data-stop style="border:none;border-radius:6px;background:#475569;color:#fff;padding:3px 10px;cursor:pointer;font-size:12px">⏹</button>
    `;
    w.querySelector('[data-read]')!.addEventListener('click', () => {
      const sel = window.getSelection()?.toString().trim() ?? '';
      if (sel) { speak(sel); return; }
      // Fall back to reading main content
      const main = document.querySelector('article, main, [role="main"]');
      speak(main?.textContent?.slice(0, 5000) ?? document.body.innerText.slice(0, 5000));
    });
    w.querySelector('[data-stop]')!.addEventListener('click', () => window.speechSynthesis.cancel());
    document.body.appendChild(w);

    // Auto-read on text selection (mouseup)
    upHandler = () => {
      const sel = window.getSelection()?.toString().trim() ?? '';
      if (sel.length > 2) speak(sel);
    };
    document.addEventListener('mouseup', upHandler);
  },
  deactivate() {
    window.speechSynthesis.cancel();
    if (upHandler) { document.removeEventListener('mouseup', upHandler); upHandler = null; }
    removeById(ID);
  },
};
