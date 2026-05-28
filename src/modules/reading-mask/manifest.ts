import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'reading-mask',
  name: 'Reading Mask',
  description: 'Darkens the page except a configurable horizontal band around your cursor.',
  icon: '🔦',
  category: 'reading',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      height: { type: 'number', title: 'Band Height', minimum: 40, maximum: 300, step: 20, default: 80, unit: 'px' },
      opacity: { type: 'number', title: 'Mask Darkness', minimum: 20, maximum: 90, step: 10, default: 65, unit: '%' },
    },
    required: ['enabled'],
  },
};
