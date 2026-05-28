import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'sync-settings',
  name: 'Settings Sync',
  description: 'All settings sync automatically via chrome.storage.sync. Shows sync status badge.',
  icon: '☁️',
  category: 'utility',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Show Sync Badge', default: false },
    },
    required: ['enabled'],
  },
};
