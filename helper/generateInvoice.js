const puppeteer = require("puppeteer-core");
const path = require('path');
const generateInvoice = async (products) => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,  
  });

  const page = await browser.newPage();

  await page.setContent(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Quotation</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
        th { background-color: #f4f4f4; }
      </style>
    </head>
    <body>
      <h1>Quotation</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>GST (18%)</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${products
            .map(
              (product) => `
                <tr>
                  <td>${product.name}</td>
                  <td>${product.qty}</td>
                  <td>${product.rate.toFixed(2)}</td>
                  <td>${product.gst.toFixed(2)}</td>
                  <td>${product.total.toFixed(2)}</td>
                </tr>`
            )
            .join('')}
        </tbody>
      </table>
    </body>
    </html>
  `);

  const pdf = await page.pdf({ format: 'A4' });

  const fs = require('fs');
  fs.writeFileSync(path.join(__dirname, 'invoice.pdf'), pdfBuffer);
  
  await browser.close();
  return pdf;
};

module.exports = generateInvoice;