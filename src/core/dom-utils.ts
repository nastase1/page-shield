/** Inject a <style> tag identified by ID, replacing any previous one. */
export function injectStyle(id: string, css: string): void {
  removeById(id);
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

/** Remove any element with the given ID. */
export function removeById(id: string): void {
  document.getElementById(id)?.remove();
}

/** Create and append a fixed-position div. */
export function createFixed(
  id: string,
  cssText: string,
  parent: Element = document.body,
): HTMLDivElement {
  removeById(id);
  const div = document.createElement('div');
  div.id = id;
  div.style.cssText = cssText;
  div.setAttribute('aria-hidden', 'true');
  parent.appendChild(div);
  return div;
}

/** Shared inline style for PageShield floating widgets. */
export const WIDGET_BASE = `
  position: fixed;
  z-index: 2147483647;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 13px;
  line-height: 1.4;
  background: #1e293b;
  color: #f1f5f9;
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.45);
  user-select: none;
`;

/** Watch for newly added DOM nodes under root. */
export function watchNodes(
  callback: (el: Element) => void,
  root: Element | Document = document.body,
): MutationObserver {
  const obs = new MutationObserver(mutations => {
    for (const { addedNodes } of mutations) {
      addedNodes.forEach(n => {
        if (n.nodeType === Node.ELEMENT_NODE) callback(n as Element);
      });
    }
  });
  obs.observe(root, { childList: true, subtree: true });
  return obs;
}

/** Find all text nodes inside root, filtered by optional tag exclusion list. */
export function collectTextNodes(
  root: Element,
  excludeTags = ['script', 'style', 'code', 'pre', 'kbd', 'svg', 'math'],
): Text[] {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = (node as Text).parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (excludeTags.includes(parent.tagName.toLowerCase())) return NodeFilter.FILTER_REJECT;
      return (node as Text).nodeValue?.trim()
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  });
  let n = walker.nextNode();
  while (n) {
    nodes.push(n as Text);
    n = walker.nextNode();
  }
  return nodes;
}
