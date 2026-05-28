import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'reduced-motion',
  name: 'Reduced Motion',
  description: 'Force-stops all CSS animations and transitions on the page instantly.',
  icon: '🚫',
  category: 'motion',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
    },
    required: ['enabled'],
  },
};
