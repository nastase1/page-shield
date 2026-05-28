import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'keyboard-focus-highlight',
  name: 'Keyboard Focus Highlight',
  description: 'Adds a large, high-visibility focus ring to all focusable elements during keyboard navigation.',
  icon: '⌨️',
  category: 'motor',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      color: {
        type: 'string',
        title: 'Ring Color',
        enum: ['orange', 'blue', 'red', 'green'],
        enumNames: ['Orange', 'Blue', 'Red', 'Green'],
        default: 'orange',
      },
      size: { type: 'number', title: 'Ring Thickness', minimum: 2, maximum: 8, step: 1, default: 3, unit: 'px' },
    },
    required: ['enabled'],
  },
};
