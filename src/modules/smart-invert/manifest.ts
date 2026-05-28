import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'smart-invert',
  name: 'Smart Invert',
  description: 'Inverts all colors except images and videos, preserving media appearance.',
  icon: '🔄',
  category: 'vision',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
    },
    required: ['enabled'],
  },
};
