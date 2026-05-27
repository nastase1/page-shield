import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'focus',
  name: 'Focus Ruler',
  description: 'Dims everything except a horizontal reading band that follows your cursor.',
  icon: '🔦',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: {
        type: 'boolean',
        title: 'Enable',
        default: false,
      },
      height: {
        type: 'number',
        title: 'Ruler Height',
        minimum: 40,
        maximum: 300,
        step: 20,
        default: 80,
        unit: 'px',
      },
      opacity: {
        type: 'number',
        title: 'Mask Darkness',
        minimum: 20,
        maximum: 90,
        step: 10,
        default: 60,
        unit: '%',
      },
    },
    required: ['enabled'],
  },
};
