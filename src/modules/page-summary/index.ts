import type { ModuleImpl } from '../../types/module';
import { removeById } from '../../core/dom-utils';

const BANNER_ID = 'ps-page-summary';

async function summarize(text: string, apiKey: string, endpoint: string, model: string): Promise<string> {
  if (!apiKey) return 'Add an API key in the Page Summary settings to enable AI summaries.';
  const truncated = text.slice(0, 6000);
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'Summarize the following page content in 3–4 bullet points. Be concise and factual. Use plain language.' },
        { role: 'user', content: truncated },
      ],
      max_tokens: 300,
    }),
  });
  if (!res.ok) return `Error ${res.status}: ${res.statusText}`;
  return (await res.json()).choices?.[0]?.message?.content?.trim() ?? 'No summary returned.';
}

function getPageText(): string {
  const main = document.querySelector('article, main, [role="main"]');
  return (main ?? document.body).innerText;
}

export const pageSummaryModule: ModuleImpl = {
  activate(settings) {
    removeById(BANNER_ID);
    const apiKey = (settings.apiKey as string) ?? '';
    const endpoint = (settings.apiEndpoint as string) || 'https://api.openai.com/v1/chat/completions';
    const model = (settings.model as string) || 'gpt-4o-mini';

    const banner = document.createElement('div');
    banner.id = BANNER_ID;
    banner.style.cssText = `
      position:sticky;top:0;z-index:2147483646;
      background:#1e293b;color:#f1f5f9;
      font-family:system-ui,sans-serif;font-size:13px;line-height:1.6;
      padding:10px 16px;border-bottom:2px solid #3b82f6;
    `;
    banner.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
        <strong style="color:#7dd3fc">📝 PageShield Summary</strong>
        <span data-status style="color:#94a3b8;font-size:11px">Generating…</span>
        <button data-toggle style="margin-left:auto;border:none;background:#334155;color:#94a3b8;border-radius:5px;padding:2px 8px;cursor:pointer;font-size:11px">Hide</button>
      </div>
      <div data-body style="color:#cbd5e1">Loading page summary…</div>
    `;

    const bodyEl = banner.querySelector<HTMLElement>('[data-body]')!;
    const statusEl = banner.querySelector<HTMLElement>('[data-status]')!;
    const toggle = banner.querySelector<HTMLButtonElement>('[data-toggle]')!;
    let collapsed = false;
    toggle.addEventListener('click', () => {
      collapsed = !collapsed;
      bodyEl.style.display = collapsed ? 'none' : '';
      toggle.textContent = collapsed ? 'Show' : 'Hide';
    });

    document.body.insertBefore(banner, document.body.firstChild);

    summarize(getPageText(), apiKey, endpoint, model).then(text => {
      bodyEl.innerHTML = text.replace(/\n/g, '<br>').replace(/</g, (m, offset) => offset === 0 ? m : '&lt;');
      statusEl.textContent = '';
    }).catch(err => {
      bodyEl.textContent = `Failed: ${err.message}`;
      statusEl.textContent = '';
    });
  },
  deactivate() { removeById(BANNER_ID); },
};
