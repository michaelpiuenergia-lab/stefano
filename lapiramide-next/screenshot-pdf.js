const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function screenshotPdf() {
  const pdfPath = path.resolve('./public/pdf/presentazione.pdf');
  const fileUrl = 'file://' + pdfPath.replace(/\\/g, '/');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1200, height: 800 } });
  const page = await context.newPage();

  // Chrome apre i PDF con il suo viewer integrato
  await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000); // Aspetta che il PDF si carichi

  // Screenshot della pagina
  await page.screenshot({ path: './pdf-screenshot.png', fullPage: false });
  console.log('Screenshot saved to pdf-screenshot.png');

  await browser.close();
}

screenshotPdf().catch(console.error);
