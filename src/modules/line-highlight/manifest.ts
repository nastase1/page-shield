import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'line-highlight',
  name: 'Line Highlight',
  description: 'Adds alternating background stripes to paragraphs to aid line tracking.',
  icon: '🖊️',
  category: 'reading',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      color: {
        type: 'string',
        title: 'Stripe Color',
        enum: ['blue', 'yellow', 'green', 'pink'],
        enumNames: ['Blue', 'Yellow', 'Green', 'Pink'],
        default: 'blue',
      },
    },
    required: ['enabled'],
  },
};
