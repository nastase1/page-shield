import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'colorblind',
  name: 'Color Blind Filter',
  description: 'Apply SVG color correction for various types of color vision deficiency.',
  icon: '🎨',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: {
        type: 'boolean',
        title: 'Enable',
        default: false,
      },
      filter: {
        type: 'string',
        title: 'Filter Type',
        description: 'Type of color vision deficiency to compensate for.',
        enum: [
          'protanopia',
          'protanomaly',
          'deuteranopia',
          'deuteranomaly',
          'tritanopia',
          'tritanomaly',
          'achromatopsia',
          'achromatomaly',
        ],
        enumNames: [
          'Protanopia — red blind (full)',
          'Protanomaly — red weak (partial)',
          'Deuteranopia — green blind (full)',
          'Deuteranomaly — green weak (partial)',
          'Tritanopia — blue blind (full)',
          'Tritanomaly — blue weak (partial)',
          'Achromatopsia — total color blindness',
          'Achromatomaly — reduced color perception',
        ],
        default: 'deuteranopia',
      },
    },
    required: ['enabled'],
  },
};
