const sharp = require('sharp');
const fs = require('fs');

async function crop() {
  // Prima pagina del PDF screenshot - proviamo diverse crop per trovare il logo
  const input = './extracted-logo.png';
  
  // Crop top-center (dove di solito c'è il logo in una presentazione)
  await sharp(input)
    .extract({ left: 200, top: 30, width: 800, height: 200 })
    .png()
    .toFile('./logo-crop-1.png');
    
  // Crop top-left
  await sharp(input)
    .extract({ left: 50, top: 30, width: 500, height: 180 })
    .png()
    .toFile('./logo-crop-2.png');
    
  console.log('Crops created. Check logo-crop-1.png and logo-crop-2.png');
}

crop().catch(console.error);
