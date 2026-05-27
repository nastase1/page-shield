import type { ModuleImpl } from '../../types/module';

const SVG_ID = 'page-shield-cb-svg';
const FILTER_ID = 'page-shield-cb-filter';

// Color vision deficiency simulation matrices (Machado et al., 2009)
// Full dichromacy (protanopia / deuteranopia / tritanopia) at severity 1.0,
// anomalous trichromacy at severity ~0.6, and monochromacy variants.
const MATRICES: Record<string, string> = {
  protanopia:
    '0.152286 1.052583 -0.204868 0 0 ' +
    '0.114503 0.786281 0.099216 0 0 ' +
    '-0.003882 -0.048116 1.051998 0 0 ' +
    '0 0 0 1 0',

  protanomaly:
    '0.458064 0.679578 -0.137642 0 0 ' +
    '0.092785 0.846313 0.060902 0 0 ' +
    '-0.007494 -0.016807 1.024301 0 0 ' +
    '0 0 0 1 0',

  deuteranopia:
    '0.367322 0.860646 -0.227968 0 0 ' +
    '0.280085 0.672501 0.047413 0 0 ' +
    '-0.011820 0.042940 0.968881 0 0 ' +
    '0 0 0 1 0',

  deuteranomaly:
    '0.547494 0.607765 -0.155259 0 0 ' +
    '0.153768 0.772802 0.073430 0 0 ' +
    '-0.007965 0.018700 0.989265 0 0 ' +
    '0 0 0 1 0',

  tritanopia:
    '1.255528 -0.076749 -0.178779 0 0 ' +
    '-0.078411 0.930809 0.147602 0 0 ' +
    '0.004733 0.691367 0.303900 0 0 ' +
    '0 0 0 1 0',

  tritanomaly:
    '1.017277 0.027029 -0.044306 0 0 ' +
    '-0.006113 0.958479 0.047634 0 0 ' +
    '0.006379 0.374602 0.619019 0 0 ' +
    '0 0 0 1 0',

  // Luminance-weighted grayscale
  achromatopsia:
    '0.299 0.587 0.114 0 0 ' +
    '0.299 0.587 0.114 0 0 ' +
    '0.299 0.587 0.114 0 0 ' +
    '0 0 0 1 0',

  // Partial desaturation towards luminance
  achromatomaly:
    '0.618 0.320 0.062 0 0 ' +
    '0.163 0.775 0.062 0 0 ' +
    '0.163 0.320 0.516 0 0 ' +
    '0 0 0 1 0',
};

function inject(filterType: string): void {
  remove();

  const matrix = MATRICES[filterType];
  if (!matrix) return;

  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.id = SVG_ID;
  svg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden');
  svg.setAttribute('aria-hidden', 'true');

  const defs = document.createElementNS(NS, 'defs');
  const filter = document.createElementNS(NS, 'filter');
  filter.id = FILTER_ID;
  filter.setAttribute('color-interpolation-filters', 'linearRGB');

  const fe = document.createElementNS(NS, 'feColorMatrix');
  fe.setAttribute('type', 'matrix');
  fe.setAttribute('values', matrix);

  filter.appendChild(fe);
  defs.appendChild(filter);
  svg.appendChild(defs);
  document.body.insertBefore(svg, document.body.firstChild);

  document.documentElement.style.filter = `url(#${FILTER_ID})`;
}

function remove(): void {
  document.getElementById(SVG_ID)?.remove();
  document.documentElement.style.removeProperty('filter');
}

export const colorblindModule: ModuleImpl = {
  activate(settings) {
    inject((settings.filter as string) ?? 'deuteranopia');
  },
  deactivate() {
    remove();
  },
};
