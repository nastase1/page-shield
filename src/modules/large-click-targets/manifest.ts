import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'large-click-targets',
  name: 'Large Click Targets',
  description: 'Increases the minimum size of links and buttons to 44×44px (WCAG 2.5.5).',
  icon: '👆',
  category: 'motor',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      minSize: { type: 'number', title: 'Minimum Target Size', minimum: 32, maximum: 64, step: 4, default: 44, unit: 'px' },
    },
    required: ['enabled'],
  },
};
