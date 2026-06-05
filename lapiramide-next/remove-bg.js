const Jimp = require('jimp');

async function removeBlackBackground() {
  const image = await Jimp.read('./logo-from-pdf.png');
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // Se il pixel è molto scuro (vicino al nero), rendilo trasparente
    if (r < 30 && g < 30 && b < 30) {
      this.bitmap.data[idx + 3] = 0; // alpha = 0
    }
  });
  
  await image.writeAsync('./logo-transparent-jimp.png');
  console.log('Done: logo-transparent-jimp.png');
}

removeBlackBackground().catch(console.error);
