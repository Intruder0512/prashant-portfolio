// Builds optimized image assets from the source photos in the project root.
//   portrait-cutout.png  = background-removed portrait (transparent PNG)
//   ew01.jpg, ew02.jpg   = Embedded World photos (In the News)
//   ai-summit-*.png      = AI Summit 2026 photos (In the News)
// Run: npm run images
import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';

const OUT = 'public/assets';
mkdirSync(OUT, { recursive: true });

const cutout = await sharp('portrait-cutout.png').ensureAlpha().png().toBuffer();

for (const w of [1100, 720, 420]) {
  await sharp(cutout).resize({ width: w }).webp({ quality: 86, alphaQuality: 90 }).toFile(`${OUT}/portrait-${w}.webp`);
}

for (const file of ['ew01.jpg', 'ew02.jpg', 'ai-summit-minister.png', 'ai-summit-stage.png']) {
  if (!existsSync(file)) continue;
  const name = file.replace(/\.[a-z]+$/, '');
  await sharp(file).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${OUT}/${name}.webp`);
}

// Studio headshot (square + portrait) — used for search results (structured data) and the share card
if (existsSync('headshot-studio.png')) {
  await sharp('headshot-studio.png').resize({ width: 800 }).jpeg({ quality: 86, mozjpeg: true }).toFile(`${OUT}/headshot.jpg`);
  await sharp('headshot-studio.png').extract({ left: 160, top: 60, width: 800, height: 800 }).resize(600).jpeg({ quality: 86, mozjpeg: true }).toFile(`${OUT}/headshot-square.jpg`);
}

// Social share image (1200x630) on a dark backdrop
const shareSrc = existsSync('headshot-office.png')
  ? await sharp('headshot-office.png').resize({ height: 630 }).extract({ left: 0, top: 0, width: 504, height: 630 }).png().toBuffer()
  : null;
const portrait = await sharp(cutout).resize({ height: 600 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#07070a' } })
  .composite([
    {
      input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs><radialGradient id="g" cx="78%" cy="45%" r="45%"><stop offset="0" stop-color="#e5132b" stop-opacity="0.45"/><stop offset="1" stop-color="#e5132b" stop-opacity="0"/></radialGradient></defs>
        <rect width="1200" height="630" fill="url(#g)"/>
      </svg>`),
    },
    ...(shareSrc
      ? [
          { input: shareSrc, left: 696, top: 0 },
          {
            input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="f" x1="0" x2="1"><stop offset="0" stop-color="#07070a"/><stop offset="1" stop-color="#07070a" stop-opacity="0"/></linearGradient></defs>
              <rect x="696" width="160" height="630" fill="url(#f)"/>
            </svg>`),
          },
        ]
      : [{ input: portrait, left: 730, top: 30 }]),
    {
      input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <text x="72" y="300" font-family="Impact, 'Arial Narrow', sans-serif" font-size="128" fill="#f4f1ec" letter-spacing="4">PRASHANT</text>
        <text x="78" y="352" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="22" fill="#ff3d5a" letter-spacing="6">AGENTIC AI DELIVERY LEAD &amp; ARCHITECT</text>
        <text x="78" y="420" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="18" fill="#a7a6ad" letter-spacing="5">CHAPTER LEAD — AI DEVELOPMENT &amp; DELIVERY</text>
      </svg>`),
    },
  ])
  .jpeg({ quality: 85 })
  .toFile(`${OUT}/og-image.jpg`);
console.log('images built');
