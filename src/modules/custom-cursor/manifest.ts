import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'custom-cursor',
  name: 'Custom Cursor',
  description: 'Replaces the cursor with a larger, high-contrast version for easier tracking.',
  icon: '🖱️',
  category: 'vision',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      size: {
        type: 'string',
        title: 'Size',
        enum: ['large', 'xl', 'huge'],
        enumNames: ['Large (32px)', 'Extra Large (48px)', 'Huge (64px)'],
        default: 'large',
      },
      color: {
        type: 'string',
        title: 'Color',
        enum: ['black', 'white', 'red'],
        enumNames: ['Black (white outline)', 'White (black outline)', 'Red (white outline)'],
        default: 'black',
      },
    },
    required: ['enabled'],
  },
};
