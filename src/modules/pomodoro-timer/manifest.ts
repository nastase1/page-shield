import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'pomodoro-timer',
  name: 'Pomodoro Timer',
  description: 'A floating 25/5 minute Pomodoro timer injected into every page.',
  icon: '🍅',
  category: 'focus',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      workMinutes: { type: 'number', title: 'Work Duration', minimum: 5, maximum: 60, step: 5, default: 25, unit: ' min' },
      breakMinutes: { type: 'number', title: 'Break Duration', minimum: 1, maximum: 30, step: 1, default: 5, unit: ' min' },
    },
    required: ['enabled'],
  },
};
