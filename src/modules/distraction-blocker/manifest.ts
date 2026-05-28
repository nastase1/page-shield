import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'distraction-blocker',
  name: 'Distraction Blocker',
  description: 'Hides ads, sidebars, cookie banners, popups, and social share buttons.',
  icon: '🚧',
  category: 'focus',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      hideAds: { type: 'boolean', title: 'Hide Ads', default: true },
      hideSidebars: { type: 'boolean', title: 'Hide Sidebars', default: true },
      hideBanners: { type: 'boolean', title: 'Hide Cookie / Notification Banners', default: true },
    },
    required: ['enabled'],
  },
};
