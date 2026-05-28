import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'text-to-speech',
  name: 'Text to Speech',
  description: 'Reads selected text aloud using the Web Speech API. Click "Read" or select text.',
  icon: '🔊',
  category: 'cognitive',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      rate: { type: 'number', title: 'Speed', minimum: 50, maximum: 200, step: 10, default: 100, unit: '%' },
      pitch: { type: 'number', title: 'Pitch', minimum: 50, maximum: 200, step: 10, default: 100, unit: '%' },
    },
    required: ['enabled'],
  },
};
