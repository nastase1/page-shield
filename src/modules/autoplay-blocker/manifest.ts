import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'autoplay-blocker',
  name: 'Autoplay Blocker',
  description: 'Prevents all videos from autoplaying, including dynamically injected ones.',
  icon: '⏸️',
  category: 'motion',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
    },
    required: ['enabled'],
  },
};
