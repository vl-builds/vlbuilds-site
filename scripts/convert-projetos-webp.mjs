import sharp from 'sharp';
import { promises as fs } from 'fs';
import { readdirSync } from 'fs';
import { join, basename } from 'path';

// Screenshots do portfólio: PNGs ~1.3–1.7MB → WebP redimensionado a 1280px de largura.
const dir = 'public/projetos';
const files = readdirSync(dir).filter(f => f.endsWith('.png'));

for (const file of files) {
  const src  = join(dir, file);
  const dest = join(dir, basename(file, '.png') + '.webp');
  await sharp(src).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
  const { size } = await fs.stat(dest);
  console.log(`OK ${file} => ${basename(dest)} (${Math.round(size / 1024)}KB)`);
}
console.log('Done.');
