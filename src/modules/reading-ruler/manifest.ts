import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'reading-ruler',
  name: 'Reading Ruler',
  description: 'A thin horizontal line that follows the cursor to help track the current line.',
  icon: '📏',
  category: 'reading',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      color: {
        type: 'string',
        title: 'Color',
        enum: ['red', 'blue', 'green', 'orange', 'black'],
        enumNames: ['Red', 'Blue', 'Green', 'Orange', 'Black'],
        default: 'red',
      },
      opacity: { type: 'number', title: 'Opacity', minimum: 20, maximum: 100, step: 10, default: 70, unit: '%' },
    },
    required: ['enabled'],
  },
};
