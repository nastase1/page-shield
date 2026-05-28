import type { ModuleImpl } from '../../types/module';
import { removeById, WIDGET_BASE } from '../../core/dom-utils';

const BTN_ID = 'ps-ai-simplify-btn';
const RESULT_ID = 'ps-ai-simplify-result';

let cfg = { apiKey: '', apiEndpoint: '', model: '' };

async function simplify(text: string): Promise<string> {
  if (!cfg.apiKey) return 'No API key configured — add one in the AI Simplifier settings.';
  const res = await fetch(cfg.apiEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${cfg.apiKey}` },
    body: JSON.stringify({
      model: cfg.model,
      messages: [
        { role: 'system', content: 'Rewrite the following text in simpler language. Use short sentences and common words. Return only the rewritten text.' },
        { role: 'user', content: text },
      ],
      max_tokens: 600,
    }),
  });
  if (!res.ok) return `Error ${res.status}: ${res.statusText}`;
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? 'No response.';
}

function showResult(text: string) {
  removeById(RESULT_ID);
  const box = document.createElement('div');
  box.id = RESULT_ID;
  box.style.cssText = `${WIDGET_BASE}bottom:130px;right:20px;max-width:300px;padding:12px 14px;`;
  box.innerHTML = `
    <div style="font-size:10px;color:#94a3b8;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px">Simplified</div>
    <div style="color:#f1f5f9;font-size:13px;line-height:1.5">${text.replace(/</g,'&lt;')}</div>
    <button data-close style="margin-top:8px;border:none;border-radius:5px;background:#475569;color:#cbd5e1;padding:3px 10px;cursor:pointer;font-size:11px">Close</button>
  `;
  box.querySelector('[data-close]')!.addEventListener('click', () => removeById(RESULT_ID));
  document.body.appendChild(box);
}

export const aiSimplifierModule: ModuleImpl = {
  activate(settings) {
    cfg = {
      apiKey: (settings.apiKey as string) ?? '',
      apiEndpoint: (settings.apiEndpoint as string) || 'https://api.openai.com/v1/chat/completions',
      model: (settings.model as string) || 'gpt-4o-mini',
    };
    removeById(BTN_ID);
    const btn = document.createElement('div');
    btn.id = BTN_ID;
    btn.style.cssText = `${WIDGET_BASE}bottom:120px;right:20px;padding:8px 14px;cursor:pointer;`;
    btn.innerHTML = `<span>🤖 Simplify Selected Text</span>`;
    btn.addEventListener('click', async () => {
      const sel = window.getSelection()?.toString().trim() ?? '';
      if (!sel) { showResult('Select some text on the page first.'); return; }
      btn.innerHTML = '<span>🤖 Simplifying…</span>';
      const result = await simplify(sel);
      btn.innerHTML = '<span>🤖 Simplify Selected Text</span>';
      showResult(result);
    });
    document.body.appendChild(btn);
  },
  deactivate() {
    removeById(BTN_ID);
    removeById(RESULT_ID);
  },
};
