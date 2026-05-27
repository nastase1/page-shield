import type { ModuleImpl } from '../../types/module';

const STYLE_ID = 'page-shield-text-size';

function inject(scale: number, lineHeight: number, maxWidth: number): void {
  remove();
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    html {
      font-size: ${scale}% !important;
    }
    body {
      max-width: ${maxWidth}px !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }
    p, li, td, th, blockquote, figcaption {
      line-height: ${lineHeight}% !important;
    }
  `;
  document.head.appendChild(style);
}

function remove(): void {
  document.getElementById(STYLE_ID)?.remove();
}

export const textSizeModule: ModuleImpl = {
  activate(settings) {
    inject(
      (settings.scale as number) ?? 120,
      (settings.lineHeight as number) ?? 160,
      (settings.maxWidth as number) ?? 700,
    );
  },
  deactivate() {
    remove();
  },
};
