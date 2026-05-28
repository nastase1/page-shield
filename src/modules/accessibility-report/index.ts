import type { ModuleImpl } from '../../types/module';
import { removeById, WIDGET_BASE } from '../../core/dom-utils';

const PANEL_ID = 'ps-a11y-report';

type Severity = 'error' | 'warning' | 'pass';
interface Issue { severity: Severity; message: string }

const ICONS: Record<Severity, string> = { error: '🔴', warning: '🟡', pass: '🟢' };
const COLORS: Record<Severity, string> = { error: '#fca5a5', warning: '#fde68a', pass: '#86efac' };

function relativeLuminance(r: number, g: number, b: number): number {
  const s = [r, g, b].map(c => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
}

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/.{2}/g);
  return m ? [parseInt(m[0], 16), parseInt(m[1], 16), parseInt(m[2], 16)] : null;
}

function cssColorToRgb(color: string): [number, number, number] | null {
  const m = color.match(/\d+/g);
  if (!m || m.length < 3) return hexToRgb(color);
  return [+m[0], +m[1], +m[2]];
}

function contrastRatio(fg: string, bg: string): number {
  const r1 = cssColorToRgb(fg), r2 = cssColorToRgb(bg);
  if (!r1 || !r2) return 21;
  const l1 = relativeLuminance(...r1), l2 = relativeLuminance(...r2);
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

function audit(): Issue[] {
  const issues: Issue[] = [];

  // 1. Images missing alt
  const noAlt = document.querySelectorAll('img:not([alt])').length;
  if (noAlt > 0) issues.push({ severity: 'error', message: `${noAlt} image(s) missing alt attribute` });
  else issues.push({ severity: 'pass', message: 'All images have alt attributes' });

  // 2. Inputs without labels
  const unlabeled = [...document.querySelectorAll<HTMLElement>('input:not([type="hidden"]),select,textarea')]
    .filter(el => {
      if (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby')) return false;
      const id = el.id;
      return !id || !document.querySelector(`label[for="${id}"]`);
    }).length;
  if (unlabeled > 0) issues.push({ severity: 'error', message: `${unlabeled} form field(s) without labels` });
  else issues.push({ severity: 'pass', message: 'All form fields are labeled' });

  // 3. Heading structure
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => +h.tagName[1]);
  const h1 = headings.filter(n => n === 1).length;
  if (h1 === 0) issues.push({ severity: 'error', message: 'No <h1> heading found' });
  else if (h1 > 1) issues.push({ severity: 'warning', message: `${h1} <h1> headings (should be 1)` });
  else issues.push({ severity: 'pass', message: 'Single <h1> present' });

  for (let i = 1; i < headings.length; i++) {
    if (headings[i] - headings[i - 1] > 1) {
      issues.push({ severity: 'warning', message: `Heading level skipped (h${headings[i-1]} → h${headings[i]})` });
      break;
    }
  }

  // 4. Links with no text
  const emptyLinks = [...document.querySelectorAll('a')].filter(a =>
    !a.textContent?.trim() && !a.getAttribute('aria-label') && !a.querySelector('img[alt]')
  ).length;
  if (emptyLinks > 0) issues.push({ severity: 'error', message: `${emptyLinks} link(s) with no accessible text` });

  // 5. Lang attribute
  if (!document.documentElement.lang) {
    issues.push({ severity: 'warning', message: '<html> missing lang attribute' });
  } else {
    issues.push({ severity: 'pass', message: `lang="${document.documentElement.lang}"` });
  }

  // 6. Spot-check contrast on a few text nodes
  let lowContrast = 0;
  [...document.querySelectorAll<HTMLElement>('p, li, h1, h2, h3')].slice(0, 20).forEach(el => {
    const cs = getComputedStyle(el);
    const ratio = contrastRatio(cs.color, cs.backgroundColor);
    if (ratio < 4.5) lowContrast++;
  });
  if (lowContrast > 0) {
    issues.push({ severity: 'warning', message: `${lowContrast} sampled text element(s) may have low contrast (<4.5:1)` });
  } else {
    issues.push({ severity: 'pass', message: 'Sampled text elements pass contrast check' });
  }

  return issues;
}

export const accessibilityReportModule: ModuleImpl = {
  activate() {
    removeById(PANEL_ID);
    const issues = audit();
    const errors = issues.filter(i => i.severity === 'error').length;
    const warnings = issues.filter(i => i.severity === 'warning').length;

    const panel = document.createElement('div');
    panel.id = PANEL_ID;
    panel.style.cssText = `${WIDGET_BASE}top:20px;left:20px;max-width:320px;max-height:80vh;overflow-y:auto;padding:14px;`;
    panel.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <strong style="color:#7dd3fc;font-size:13px">📊 Accessibility Report</strong>
        <button data-close style="border:none;background:#334155;color:#94a3b8;border-radius:5px;padding:2px 8px;cursor:pointer;font-size:11px">✕</button>
      </div>
      <div style="font-size:11px;color:#94a3b8;margin-bottom:10px">${errors} error(s) · ${warnings} warning(s)</div>
      ${issues.map(i => `
        <div style="display:flex;gap:8px;margin-bottom:6px;align-items:flex-start">
          <span>${ICONS[i.severity]}</span>
          <span style="font-size:12px;color:${COLORS[i.severity]};line-height:1.4">${i.message}</span>
        </div>
      `).join('')}
    `;
    panel.querySelector('[data-close]')!.addEventListener('click', () => removeById(PANEL_ID));
    document.body.appendChild(panel);
  },
  deactivate() { removeById(PANEL_ID); },
};
