/**
 * Generates placeholder PNG icons for development.
 * Replace public/icons/*.png with real artwork before publishing.
 */
const fs = require('fs');
const path = require('path');

// Minimal 1×1 blue (#2563EB) PNG — valid for all browsers and Chrome's extension loader
const BLUE_PNG_B64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYHj5HwAE' +
  'ggGAWjR9awAAAABJRU5ErkJggg==';

const dir = path.join(__dirname, '..', 'public', 'icons');
fs.mkdirSync(dir, { recursive: true });

for (const name of ['icon16.png', 'icon48.png', 'icon128.png']) {
  const dest = path.join(dir, name);
  if (!fs.existsSync(dest)) {
    fs.writeFileSync(dest, Buffer.from(BLUE_PNG_B64, 'base64'));
    console.log(`[PageShield] Created placeholder ${name}`);
  }
}
