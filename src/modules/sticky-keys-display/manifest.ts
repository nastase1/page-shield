import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'sticky-keys-display',
  name: 'Sticky Keys Display',
  description: 'Shows a floating overlay of currently pressed modifier keys (Ctrl, Alt, Shift, Meta).',
  icon: '⌨️',
  category: 'motor',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
    },
    required: ['enabled'],
  },
};
