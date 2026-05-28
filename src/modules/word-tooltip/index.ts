import type { ModuleImpl } from '../../types/module';
import { removeById } from '../../core/dom-utils';

const TIP_ID = 'ps-word-tooltip';
let moveHandler: ((e: MouseEvent) => void) | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;
let lastWord = '';
let hoverDelay = 700;

function getWordAt(x: number, y: number): string {
  const range = document.caretRangeFromPoint?.(x, y);
  if (!range || range.startContainer.nodeType !== Node.TEXT_NODE) return '';
  const text = range.startContainer.textContent ?? '';
  const off = range.startOffset;
  let s = off, e = off;
  while (s > 0 && /[a-zA-Z']/.test(text[s - 1])) s--;
  while (e < text.length && /[a-zA-Z']/.test(text[e])) e++;
  return text.slice(s, e).toLowerCase().replace(/^'+|'+$/g, '');
}

async function fetchDef(word: string): Promise<string> {
  try {
    const r = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    if (!r.ok) return '';
    const data = await r.json();
    const m = data[0]?.meanings[0];
    if (!m) return '';
    return `(${m.partOfSpeech}) ${m.definitions[0]?.definition ?? ''}`;
  } catch { return ''; }
}

function showTip(word: string, def: string, x: number, y: number) {
  removeById(TIP_ID);
  if (!def) return;
  const tip = document.createElement('div');
  tip.id = TIP_ID;
  tip.style.cssText = `
    position:fixed;left:${Math.min(x + 12, window.innerWidth - 300)}px;
    top:${Math.max(10, y - 90)}px;max-width:280px;
    background:#1e293b;color:#f8fafc;border-radius:8px;
    padding:10px 14px;font-family:system-ui,sans-serif;font-size:13px;
    line-height:1.5;box-shadow:0 8px 30px rgba(0,0,0,.5);
    z-index:2147483647;pointer-events:none;
  `;
  tip.innerHTML = `<div style="font-weight:600;color:#7dd3fc;margin-bottom:3px">${word}</div><div style="color:#cbd5e1">${def}</div>`;
  document.body.appendChild(tip);
  setTimeout(() => removeById(TIP_ID), 4000);
}

export const wordTooltipModule: ModuleImpl = {
  activate(settings) {
    hoverDelay = (settings.delay as number) ?? 700;
    moveHandler = (e: MouseEvent) => {
      if (timer) clearTimeout(timer);
      const word = getWordAt(e.clientX, e.clientY);
      if (!word || word === lastWord || word.length < 2) {
        if (!word) removeById(TIP_ID);
        return;
      }
      const cx = e.clientX, cy = e.clientY;
      timer = setTimeout(async () => {
        lastWord = word;
        const def = await fetchDef(word);
        showTip(word, def, cx, cy);
      }, hoverDelay);
    };
    document.addEventListener('mousemove', moveHandler, { passive: true });
  },
  deactivate() {
    if (moveHandler) { document.removeEventListener('mousemove', moveHandler); moveHandler = null; }
    if (timer) { clearTimeout(timer); timer = null; }
    removeById(TIP_ID);
    lastWord = '';
  },
};
