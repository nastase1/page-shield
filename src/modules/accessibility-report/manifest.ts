import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'accessibility-report',
  name: 'Accessibility Report',
  description: 'Scans the page for missing alt text, unlabeled inputs, heading issues, and contrast.',
  icon: '📊',
  category: 'utility',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Run Scan (auto-runs on enable)', default: false },
    },
    required: ['enabled'],
  },
};
