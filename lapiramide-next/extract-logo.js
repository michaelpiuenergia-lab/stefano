const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function extractImages() {
  const pdfPath = './public/pdf/presentazione.pdf';
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  let imgCount = 0;
  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const page = pdfDoc.getPage(i);
    const images = page.node.Resources()?.lookupMaybe('XObject');
    if (!images) continue;

    for (const [name, ref] of images.entries()) {
      const obj = images.lookup(name);
      if (obj?.constructor?.name === 'PDFImage') {
        const ext = obj.getBitsPerComponent() === 1 ? 'png' : 'jpg';
        const data = ext === 'png' ? await obj.asPNG() : await obj.asJPEG();
        fs.writeFileSync(`./extracted-${imgCount}.${ext}`, data);
        console.log(`Extracted image ${imgCount} from page ${i + 1}: ${name} (${ext}, ${data.length} bytes)`);
        imgCount++;
      }
    }
  }

  console.log(`Total images extracted: ${imgCount}`);
}

extractImages().catch(console.error);
