import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'font-switcher',
  name: 'Font Switcher',
  description: 'Replace page fonts with dyslexia-friendly alternatives including OpenDyslexic.',
  icon: '🔤',
  category: 'reading',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      font: {
        type: 'string',
        title: 'Font',
        enum: ['opendyslexic', 'lexie', 'arial', 'verdana', 'comic-sans', 'monospace'],
        enumNames: ['OpenDyslexic (CDN)', 'Lexie Readable (CDN)', 'Arial', 'Verdana', 'Comic Sans', 'Monospace'],
        default: 'arial',
      },
    },
    required: ['enabled'],
  },
};
