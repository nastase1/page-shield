import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'flash-detector',
  name: 'Flash Detector',
  description: 'Samples video frames via canvas and pauses videos with dangerous flashing (>3 Hz).',
  icon: '⚠️',
  category: 'motion',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      threshold: { type: 'number', title: 'Brightness Change Threshold', minimum: 5, maximum: 40, step: 5, default: 15, unit: '%' },
    },
    required: ['enabled'],
  },
};
