import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'dyslexia',
  name: 'Dyslexia Assist',
  description: 'Adjusts fonts, spacing, and adds a reading overlay to ease dyslexia symptoms.',
  icon: '📖',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: {
        type: 'boolean',
        title: 'Enable',
        default: false,
      },
      font: {
        type: 'string',
        title: 'Font',
        enum: ['default', 'arial', 'verdana', 'comic-sans', 'monospace'],
        enumNames: [
          'Default (unchanged)',
          'Arial',
          'Verdana',
          'Comic Sans (dyslexia-friendly)',
          'Monospace',
        ],
        default: 'arial',
      },
      letterSpacing: {
        type: 'number',
        title: 'Letter Spacing',
        minimum: 0,
        maximum: 8,
        step: 1,
        default: 2,
        unit: 'px',
      },
      lineHeight: {
        type: 'number',
        title: 'Line Height',
        minimum: 100,
        maximum: 250,
        step: 25,
        default: 175,
        unit: '%',
      },
      overlay: {
        type: 'string',
        title: 'Reading Overlay',
        enum: ['none', 'yellow', 'blue', 'green', 'pink'],
        enumNames: ['None', 'Yellow', 'Blue', 'Green', 'Pink'],
        default: 'none',
      },
    },
    required: ['enabled'],
  },
};
