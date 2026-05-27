import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'cursor',
  name: 'Cursor Highlighter',
  description: 'Adds a visible highlight ring around the cursor to make it easier to track.',
  icon: '🖱️',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: {
        type: 'boolean',
        title: 'Enable',
        default: false,
      },
      size: {
        type: 'number',
        title: 'Ring Size',
        minimum: 20,
        maximum: 120,
        step: 10,
        default: 40,
        unit: 'px',
      },
      color: {
        type: 'string',
        title: 'Ring Color',
        enum: ['yellow', 'red', 'blue', 'green', 'white'],
        enumNames: ['Yellow', 'Red', 'Blue', 'Green', 'White'],
        default: 'yellow',
      },
      thickness: {
        type: 'number',
        title: 'Border Thickness',
        minimum: 2,
        maximum: 8,
        step: 1,
        default: 3,
        unit: 'px',
      },
    },
    required: ['enabled'],
  },
};
