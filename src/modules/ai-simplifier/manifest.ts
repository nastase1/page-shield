import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'ai-simplifier',
  name: 'AI Text Simplifier',
  description: 'Select text and click "Simplify" to rewrite it in simpler language via AI API.',
  icon: '🤖',
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
