import sharp from 'sharp';
import { promises as fs } from 'fs';
import { join, basename } from 'path';

// Hero backgrounds: PNGs ~5MB @ 2688px → WebP redimensionado a 1920px de largura.
const dir = 'public';
const files = ['hero-dark.png', 'hero-light.png'];

for (const file of files) {
  const src  = join(dir, file);
  const dest = join(dir, basename(file, '.png') + '.webp');
  await sharp(src).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
  const { size } = await fs.stat(dest);
  console.log(`OK ${file} => ${basename(dest)} (${Math.round(size / 1024)}KB)`);
}
console.log('Done.');
