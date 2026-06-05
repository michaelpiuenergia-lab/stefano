const mupdf = require('mupdf');
const fs = require('fs');

async function render() {
  const data = fs.readFileSync('./public/pdf/presentazione.pdf');
  const doc = mupdf.Document.openDocument(data, 'application/pdf');
  
  const page = doc.loadPage(0);
  // Renderizza a 2x per alta qualità
  const pixmap = page.toPixmap(mupdf.Matrix.scale(2, 2), mupdf.ColorSpace.DeviceRGB);
  const png = pixmap.asPNG();
  
  fs.writeFileSync('./pdf-render.png', png);
  console.log('Rendered page 1 to pdf-render.png', png.length, 'bytes');
  
  // Ritaglia diverse aree per trovare il logo
  const sharp = require('sharp');
  
  // Top-left area (logo spesso qui)
  await sharp('./pdf-render.png')
    .extract({ left: 100, top: 60, width: 800, height: 300 })
    .png()
    .toFile('./logo-candidate-1.png');
    
  // Top-center area
  await sharp('./pdf-render.png')
    .extract({ left: 400, top: 60, width: 1000, height: 300 })
    .png()
    .toFile('./logo-candidate-2.png');
    
  // Full top area
  await sharp('./pdf-render.png')
    .extract({ left: 0, top: 0, width: 2400, height: 400 })
    .png()
    .toFile('./logo-candidate-top.png');
    
  console.log('Logo candidates created');
}

render().catch(console.error);
