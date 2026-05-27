import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'high-contrast',
  name: 'High Contrast',
  description: 'Applies high-contrast color themes for users with low vision.',
  icon: '🌓',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: {
        type: 'boolean',
        title: 'Enable',
        default: false,
      },
      theme: {
        type: 'string',
        title: 'Theme',
        enum: ['dark', 'light', 'inverted', 'yellow-on-black', 'green-on-black'],
        enumNames: [
          'High Contrast Dark',
          'High Contrast Light',
          'Inverted',
          'Yellow on Black',
          'Green on Black',
        ],
        default: 'dark',
      },
    },
    required: ['enabled'],
  },
};
