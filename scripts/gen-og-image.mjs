import sharp from 'sharp';

const W = 1200, H = 630;

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#080808"/>
  <rect x="0" y="0" width="6" height="${H}" fill="#FF3D00"/>
  <text x="80" y="260" font-family="sans-serif" font-size="100" font-weight="900" fill="#f0f0f0" letter-spacing="-4">VL Builds</text>
  <text x="80" y="330" font-family="sans-serif" font-size="28" fill="#888888">Sites · Ferramentas Digitais · IA</text>
  <text x="80" y="390" font-family="sans-serif" font-size="20" fill="#555555">vlbuilds.com</text>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile('public/og-image.jpg');
console.log('og-image.jpg criado (1200x630)');
