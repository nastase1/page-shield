import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'auto-scroll',
  name: 'Auto Scroll',
  description: 'Automatically scrolls the page at adjustable speed. Play/pause control widget.',
  icon: '⬇️',
  category: 'motor',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      speed: { type: 'number', title: 'Scroll Speed', minimum: 1, maximum: 10, step: 1, default: 2, unit: ' px/frame' },
    },
    required: ['enabled'],
  },
};
