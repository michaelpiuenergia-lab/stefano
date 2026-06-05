const Jimp = require('jimp');

async function removeBlackBackground() {
  const image = await Jimp.read('./logo-from-pdf.png');
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // Luminosità percepita
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    
    // Se molto scuro, rendi trasparente
    if (lum < 45) {
      this.bitmap.data[idx + 3] = 0;
    }
  });
  
  await image.writeAsync('./logo-transparent-jimp.png');
  console.log('Done');
}

removeBlackBackground().catch(console.error);
