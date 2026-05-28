import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'bionic-reading',
  name: 'Bionic Reading',
  description: 'Bolds the first ~45% of every word to guide the eye and speed up reading.',
  icon: '⚡',
  category: 'reading',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      intensity: { type: 'number', title: 'Bold Intensity', minimum: 20, maximum: 60, step: 5, default: 45, unit: '%' },
    },
    required: ['enabled'],
  },
};
