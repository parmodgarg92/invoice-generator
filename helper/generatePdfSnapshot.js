const puppeteer = require('puppeteer');

const generatePdfSnapshot = async (pdfPath, outputImagePath) => {
    // Launch a new browser instance
    const browser = await puppeteer.launch();
    
    // Create a new page
    const page = await browser.newPage();
    
    // Navigate to the PDF file
    await page.goto(`file://${pdfPath}`, { waitUntil: 'networkidle0' });
    
    // Take a screenshot of the PDF
    await page.screenshot({ path: outputImagePath, fullPage: true });
    
    // Close the browser
    await browser.close();
};

module.exports = generatePdfSnapshot;