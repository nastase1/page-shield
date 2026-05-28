import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'animation-blocker',
  name: 'Animation Blocker',
  description: 'Slows CSS animations exceeding ~3 Hz and pauses animated GIFs via canvas.',
  icon: '🛑',
  category: 'motion',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      minDuration: { type: 'number', title: 'Min Animation Duration', minimum: 100, maximum: 2000, step: 100, default: 400, unit: 'ms' },
      pauseGifs: { type: 'boolean', title: 'Pause Animated GIFs', default: true },
    },
    required: ['enabled'],
  },
};
