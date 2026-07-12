const sharp = require('sharp');
const path = require('path');

async function removeBlackBackground() {
  const inputPath = 'C:\\Users\\CHESSMAN\\.gemini\\antigravity-ide\\brain\\bd151029-f221-477c-abff-1dfe8bda7751\\media__1782544202383.png';
  const outputPath = path.join(__dirname, '..', 'public', 'logo-transparent.png');
  
  console.log('Processing logo from:', inputPath);
  console.log('Saving transparent logo to:', outputPath);

  const image = sharp(inputPath);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i+1];
    const b = pixels[i+2];
    
    // If pixel is close to black (threshold of 35), make it transparent
    if (r < 35 && g < 35 && b < 35) {
      pixels[i+3] = 0;
    }
  }

  await sharp(pixels, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .png()
  .toFile(outputPath);
  
  console.log('Logo processed successfully!');
}

removeBlackBackground().catch(err => {
  console.error('Error processing logo:', err);
});
