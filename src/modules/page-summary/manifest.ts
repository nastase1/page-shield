import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'page-summary',
  name: 'AI Page Summary',
  description: 'Injects a collapsible banner with an AI-generated summary of the page content.',
  icon: '📝',
  category: 'cognitive',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      apiKey: { type: 'string', title: 'API Key', inputType: 'password', default: '' },
      apiEndpoint: { type: 'string', title: 'API Endpoint (OpenAI-compatible)', default: 'https://api.openai.com/v1/chat/completions' },
      model: { type: 'string', title: 'Model', default: 'gpt-4o-mini' },
    },
    required: ['enabled'],
  },
};
