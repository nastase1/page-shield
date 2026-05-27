import { describe, it, expect, beforeEach } from 'vitest';
import { epilepsyModule } from '../index';

const STYLE_ID = 'page-shield-epilepsy';

beforeEach(() => {
  document.getElementById(STYLE_ID)?.remove();
  // Remove any frozen GIFs
  document.querySelectorAll('[data-ps-gif-src]').forEach(el => el.remove());
  epilepsyModule.deactivate();
});

describe('epilepsyModule', () => {
  it('injects a <style> tag on activate', () => {
    epilepsyModule.activate({ animationThreshold: 400, pauseGifs: false });
    expect(document.getElementById(STYLE_ID)).not.toBeNull();
  });

  it('style contains the correct threshold duration', () => {
    epilepsyModule.activate({ animationThreshold: 600, pauseGifs: false });
    const style = document.getElementById(STYLE_ID);
    expect(style?.textContent).toContain('600ms');
  });

  it('removes the <style> tag on deactivate', () => {
    epilepsyModule.activate({ animationThreshold: 400, pauseGifs: false });
    epilepsyModule.deactivate();
    expect(document.getElementById(STYLE_ID)).toBeNull();
  });

  it('uses 400ms as default threshold', () => {
    epilepsyModule.activate({ pauseGifs: false });
    const style = document.getElementById(STYLE_ID);
    expect(style?.textContent).toContain('400ms');
  });

  it('disconnects MutationObserver on deactivate (no errors thrown)', () => {
    epilepsyModule.activate({ animationThreshold: 400, pauseGifs: false });
    expect(() => epilepsyModule.deactivate()).not.toThrow();
  });
});
