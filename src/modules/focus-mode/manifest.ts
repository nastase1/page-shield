import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'focus-mode',
  name: 'Focus Mode',
  description: 'Hides everything except the main article content using semantic heuristics.',
  icon: '🎯',
  category: 'focus',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
    },
    required: ['enabled'],
  },
};
