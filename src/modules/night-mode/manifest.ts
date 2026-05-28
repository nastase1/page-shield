import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'night-mode',
  name: 'Night Mode',
  description: 'Advanced dark mode: inverts the page with warm color temperature, re-inverts media.',
  icon: '🌙',
  category: 'vision',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      warmth: { type: 'number', title: 'Warmth (reduces blue light)', minimum: 0, maximum: 50, step: 5, default: 20, unit: '%' },
    },
    required: ['enabled'],
  },
};
