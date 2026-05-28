import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'link-highlight',
  name: 'Link Highlight',
  description: 'Makes all links visually distinct with underline, bold, and a colored border.',
  icon: '🔗',
  category: 'vision',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      color: {
        type: 'string',
        title: 'Highlight Color',
        enum: ['blue', 'orange', 'green', 'red', 'purple'],
        enumNames: ['Blue', 'Orange', 'Green', 'Red', 'Purple'],
        default: 'orange',
      },
      bold: { type: 'boolean', title: 'Make links bold', default: true },
    },
    required: ['enabled'],
  },
};
