import type { ModuleManifest, ModuleImpl } from '../types/module';

import { manifest as colorblindManifest } from './colorblind/manifest';
import { colorblindModule } from './colorblind';
import { manifest as epilepsyManifest } from './epilepsy/manifest';
import { epilepsyModule } from './epilepsy';
import { manifest as dyslexiaManifest } from './dyslexia/manifest';
import { dyslexiaModule } from './dyslexia';
import { manifest as focusManifest } from './focus/manifest';
import { focusModule } from './focus';
import { manifest as highContrastManifest } from './high-contrast/manifest';
import { highContrastModule } from './high-contrast';
import { manifest as textSizeManifest } from './text-size/manifest';
import { textSizeModule } from './text-size';
import { manifest as cursorManifest } from './cursor/manifest';
import { cursorModule } from './cursor';

// ─── Add a new module here ────────────────────────────────────────────────────
// 1. Create src/modules/<name>/manifest.ts and src/modules/<name>/index.ts
// 2. Import them above and add one entry to this array — that's it.
// ─────────────────────────────────────────────────────────────────────────────

export const moduleRegistry: ReadonlyArray<{ manifest: ModuleManifest; impl: ModuleImpl }> = [
  { manifest: colorblindManifest,  impl: colorblindModule  },
  { manifest: epilepsyManifest,    impl: epilepsyModule    },
  { manifest: dyslexiaManifest,    impl: dyslexiaModule    },
  { manifest: focusManifest,       impl: focusModule       },
  { manifest: highContrastManifest, impl: highContrastModule },
  { manifest: textSizeManifest,    impl: textSizeModule    },
  { manifest: cursorManifest,      impl: cursorModule      },
];
