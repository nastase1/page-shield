import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'parallax-blocker',
  name: 'Parallax Blocker',
  description: 'Disables parallax scrolling effects and fixed background attachments.',
  icon: '📌',
  category: 'motion',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
    },
    required: ['enabled'],
  },
};
