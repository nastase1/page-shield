import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'text-zoom',
  name: 'Text Zoom',
  description: 'Scales font size independently from browser zoom using CSS override.',
  icon: '🔍',
  category: 'vision',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      scale: { type: 'number', title: 'Font Scale', minimum: 80, maximum: 200, step: 10, default: 120, unit: '%' },
    },
    required: ['enabled'],
  },
};
