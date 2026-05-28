import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'brightness-saturation',
  name: 'Brightness & Saturation',
  description: 'Adjust page brightness and color saturation with independent sliders.',
  icon: '☀️',
  category: 'vision',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      brightness: { type: 'number', title: 'Brightness', minimum: 50, maximum: 150, step: 5, default: 100, unit: '%' },
      saturation: { type: 'number', title: 'Saturation', minimum: 0, maximum: 200, step: 10, default: 100, unit: '%' },
    },
    required: ['enabled'],
  },
};
