import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'epilepsy',
  name: 'Epilepsy Guard',
  description: 'Slows rapid animations and pauses animated GIFs to reduce seizure triggers.',
  icon: '🛡️',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: {
        type: 'boolean',
        title: 'Enable',
        default: false,
      },
      animationThreshold: {
        type: 'number',
        title: 'Minimum Animation Duration (ms)',
        description: 'Animations faster than this are slowed to this duration.',
        minimum: 100,
        maximum: 2000,
        step: 100,
        default: 400,
      },
      pauseGifs: {
        type: 'boolean',
        title: 'Pause Animated GIFs',
        description: 'Freeze animated GIFs on their first frame.',
        default: true,
      },
    },
    required: ['enabled'],
  },
};
