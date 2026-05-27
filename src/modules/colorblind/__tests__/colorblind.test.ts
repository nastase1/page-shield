import { describe, it, expect, beforeEach } from 'vitest';
import { colorblindModule } from '../index';

const SVG_ID = 'page-shield-cb-svg';

beforeEach(() => {
  document.documentElement.style.removeProperty('filter');
  document.getElementById(SVG_ID)?.remove();
  // Ensure body exists (jsdom provides it)
});

describe('colorblindModule', () => {
  it('injects an SVG filter element on activate', () => {
    colorblindModule.activate({ filter: 'protanopia' });
    expect(document.getElementById(SVG_ID)).not.toBeNull();
  });

  it('sets a CSS filter on <html>', () => {
    colorblindModule.activate({ filter: 'deuteranopia' });
    expect(document.documentElement.style.filter).toContain('url(#');
  });

  it('removes the SVG and CSS filter on deactivate', () => {
    colorblindModule.activate({ filter: 'tritanopia' });
    colorblindModule.deactivate();
    expect(document.getElementById(SVG_ID)).toBeNull();
    expect(document.documentElement.style.filter).toBe('');
  });

  it('replaces existing SVG when re-activated', () => {
    colorblindModule.activate({ filter: 'protanopia' });
    colorblindModule.activate({ filter: 'tritanopia' });
    expect(document.querySelectorAll(`#${SVG_ID}`).length).toBe(1);
  });

  it('uses deuteranopia as fallback when no filter provided', () => {
    colorblindModule.activate({});
    const feColorMatrix = document.querySelector('feColorMatrix');
    // deuteranopia matrix starts with 0.367322
    expect(feColorMatrix?.getAttribute('values')).toContain('0.367322');
  });
});
