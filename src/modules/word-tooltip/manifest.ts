import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'word-tooltip',
  name: 'Word Tooltip',
  description: 'Hover over any word to see its definition from the Free Dictionary API.',
  icon: '💬',
  category: 'cognitive',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      delay: { type: 'number', title: 'Hover Delay', minimum: 200, maximum: 1500, step: 100, default: 700, unit: 'ms' },
    },
    required: ['enabled'],
  },
};
