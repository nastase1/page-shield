import type { ModuleManifest } from '../../types/module';

export const manifest: ModuleManifest = {
  id: 'colorblind',
  name: 'Color Blind Filter',
  description: 'SVG color-correction filters for all major types of color vision deficiency.',
  icon: '🎨',
  category: 'vision',
  settingsSchema: {
    type: 'object',
    properties: {
      enabled: { type: 'boolean', title: 'Enable', default: false },
      filter: {
        type: 'string',
        title: 'Filter Type',
        enum: ['protanopia','protanomaly','deuteranopia','deuteranomaly','tritanopia','tritanomaly','achromatopsia','achromatomaly'],
        enumNames: ['Protanopia — red blind','Protanomaly — red weak','Deuteranopia — green blind','Deuteranomaly — green weak','Tritanopia — blue blind','Tritanomaly — blue weak','Achromatopsia — total color blindness','Achromatomaly — reduced color perception'],
        default: 'deuteranopia',
      },
    },
    required: ['enabled'],
  },
};
