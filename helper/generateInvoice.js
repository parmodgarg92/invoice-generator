const puppeteer = require("puppeteer");
const generateInvoice = async (products) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  const subTotal = products.reduce((total, product) => total + product.rate * product.qty, 0);
  const gstTotal = subTotal * 0.18;
  const grandTotal = subTotal + gstTotal;

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
        th, td { padding: 8px; text-align: center; }
        th { background-color: #f4f4f4; }
        tr:last-child{ border-bottom: 1px solid #ddd;  }
      </style>
    </head>
    <body>
      <table>
        <thead>
          <tr style="border-bottom: 1px solid #ddd;">
            <th>Product</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Total (18%)</th>
          </tr>
        </thead>
        <tbody>
          ${products
            .map(
              (product) => `
                <tr>
                  <td>${product.name}</td>
                  <td style="color:#0000FF;font-weight:bold">${product.qty}</td>
                  <td>${product.rate}</td>
                  <td>INR ${(product.rate * product.qty).toFixed()}</td>
                </tr>`
            )
            .join('')}
        </tbody>
        <tfoot style="margin-top: 20px;">
          <tr >
            <td colspan="3" style="text-align: right; font-weight: bold; padding-right: 20px">Total:</td>
            <td>INR ${subTotal}</td>
          </tr>
          <tr style="color: #808080 !important">
            <td colspan="3" style="text-align: right; font-weight: bold; padding-right:10px;">GST (18%):</td>
            <td>INR ${gstTotal}</td>
          </tr>
          <tr>
            <td colspan="3" style="text-align: right; font-weight: bold;">Grand Total:</td>
            <td style="color:#0000FF; font-weight:bold">INR ${grandTotal}</td>
          </tr>
      </table>
    </body>
    </html>
  `, { waitUntil: 'networkidle0' });

  const pdf = await page.pdf({ format: 'A4' });
  
  await browser.close();
  return pdf;
};

module.exports = generateInvoice;