import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'page-simplifier',
  name: 'Page Simplifier',
  description: 'Removes decorative backgrounds, non-essential images, and visual noise.',
  icon: '✂️',
  category: 'focus',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      removeBackgrounds: { type: 'boolean', title: 'Remove Background Images', default: true },
      removeDecorative: { type: 'boolean', title: 'Remove Decorative Images (empty alt)', default: true },
    },
    required: ['enabled'],
  },
};
