import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'text-spacing',
  name: 'Text Spacing',
  description: 'Independent sliders for letter spacing, word spacing, and line height.',
  icon: '↔️',
  category: 'reading',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      letterSpacing: { type: 'number', title: 'Letter Spacing', minimum: 0, maximum: 10, step: 1, default: 2, unit: 'px' },
      wordSpacing: { type: 'number', title: 'Word Spacing', minimum: 0, maximum: 20, step: 2, default: 4, unit: 'px' },
      lineHeight: { type: 'number', title: 'Line Height', minimum: 100, maximum: 300, step: 25, default: 175, unit: '%' },
    },
    required: ['enabled'],
  },
};
