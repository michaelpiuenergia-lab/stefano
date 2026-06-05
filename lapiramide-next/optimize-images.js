const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, 'public', 'img');
const files = fs.readdirSync(imgDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));

async function optimize() {
  for (const file of files) {
    const inputPath = path.join(imgDir, file);
    const outputPath = path.join(imgDir, file.replace(/\.jpe?g$/i, '.webp'));
    
    let pipeline = sharp(inputPath);
    const metadata = await pipeline.metadata();
    
    // Ridimensiona se troppo grande
    const maxWidth = file.includes('lavoro') ? 1400 : file.includes('distribuzione') ? 900 : 700;
    if (metadata.width > maxWidth) {
      pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
    }
    
    await pipeline.webp({ quality: 82, effort: 4 }).toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    console.log(`✓ ${file} → ${path.basename(outputPath)} (${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB)`);
  }
}

optimize().catch(console.error);
