import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'text-size',
  name: 'Text Enhancer',
  description: 'Scales font size, increases line height, and narrows line width for easier reading.',
  icon: '🔤',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: {
        type: 'boolean',
        title: 'Enable',
        default: false,
      },
      scale: {
        type: 'number',
        title: 'Font Scale',
        minimum: 100,
        maximum: 200,
        step: 10,
        default: 120,
        unit: '%',
      },
      lineHeight: {
        type: 'number',
        title: 'Line Height',
        minimum: 100,
        maximum: 250,
        step: 25,
        default: 160,
        unit: '%',
      },
      maxWidth: {
        type: 'number',
        title: 'Max Line Width',
        minimum: 400,
        maximum: 1200,
        step: 100,
        default: 700,
        unit: 'px',
      },
    },
    required: ['enabled'],
  },
};
