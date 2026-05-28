import type { ModuleImpl } from '../../types/module';
import { injectStyle, removeById } from '../../core/dom-utils';

const STYLE_ID = 'ps-distraction';

const ADS = [
  'ins.adsbygoogle', '[id*="google_ads"]', '[class*="banner-ad"]',
  '[class*="advertisement"]', '.ad-container', '.sponsored-content',
  '[data-ad]', '[aria-label*="advertisement" i]',
].join(',\n  ');

const SIDEBARS = [
  'aside', '[class*="sidebar"]', '[id*="sidebar"]',
  '[role="complementary"]', '[class*="side-panel"]',
].join(',\n  ');

const BANNERS = [
  '[id*="cookie"]', '[class*="cookie-banner"]', '[class*="cookie-consent"]',
  '[id*="gdpr"]', '[class*="gdpr"]', '[id*="consent"]',
  '[class*="consent-banner"]', '[class*="newsletter-popup"]',
  '[class*="email-signup"]', '[class*="subscribe-modal"]',
  '[class*="notification-bar"]', '[id*="notification-bar"]',
].join(',\n  ');

const SOCIAL = [
  '[class*="social-share"]', '[class*="share-buttons"]',
  '[class*="social-links"]', '[class*="sharing-buttons"]',
].join(',\n  ');

export const distractionBlockerModule: ModuleImpl = {
  activate(settings) {
    const parts: string[] = [SOCIAL]; // social always hidden
    if (settings.hideAds !== false) parts.push(ADS);
    if (settings.hideSidebars !== false) parts.push(SIDEBARS);
    if (settings.hideBanners !== false) parts.push(BANNERS);
    injectStyle(STYLE_ID, `${parts.join(',\n  ')} { display: none !important; }`);
  },
  deactivate() { removeById(STYLE_ID); },
};
