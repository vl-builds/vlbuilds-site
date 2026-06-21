import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join, basename } from 'path';

const dir = 'public/services';
const files = readdirSync(dir).filter(f => f.endsWith('.png'));

console.log(`Converting ${files.length} PNGs to WebP...`);
for (const file of files) {
  const src  = join(dir, file);
  const dest = join(dir, basename(file, '.png') + '.webp');
  await sharp(src).webp({ quality: 82 }).toFile(dest);
  const stat   = (await import('fs')).promises.stat(dest);
  const destKB = Math.round((await stat).size / 1024);
  console.log(`  OK ${file} => ${basename(dest)} (${destKB}KB)`);
}
console.log('Done.');
