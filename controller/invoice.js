const generateInvoice = require("../helper/generateInvoice");
const Invoice = require("../models/Invoice");
const path = require("path");
const fs = require("fs");

exports.createInvoice = async (req, res) => {
  const { products } = req.body;
  const userId = req.user.id;
  const gst = 0.18;
  console.log(products,'products');
  console.log(userId,'userId');
  if (!products || products.length === 0) {
    return res.status(400).json({ message: "No products selected" });
  }

  if (!userId || userId.length === 0) {
    return res.status(403).json({ message: "Forbidden error" });
  }
  
  try {

    const processProducts = await Promise.all(products.map(async (product) => {
        product.gst = (product.rate * gst * product.qty);
        product.total = (product.rate * product.qty) + product.gst;
        return product;
    }));
    
    const newInvoice = new Invoice({ userId, products: processProducts, date: new Date() });
    await newInvoice.save();

    const pdfBuffer = await generateInvoice(processProducts);
     
      // Define the path where you want to save the PDF
      const invoicesDir = path.join(__dirname, '../invoicePdf');
      const pdfPath = path.join(invoicesDir, `${newInvoice._id}_invoice_${userId}.pdf`);    
  
      // Check if the invoices directory exists, and create it if it doesn't
      if (!fs.existsSync(invoicesDir)) {
  
          fs.mkdirSync(invoicesDir, { recursive: true });
  
      }
     // Save the PDF buffer to a file
     fs.writeFileSync(pdfPath, pdfBuffer);
 
     // Set response headers
     res.set({
         'Content-Type': 'application/pdf',
         'Content-Disposition': `attachment; filename=invoice_${userId}.pdf`,
     });
 
     // Send the PDF file as a response
     res.sendFile(pdfPath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send(err);
        }
     });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.viewInvoices = async (req, res) => {
  const userId = req.user.id;
  try {
    const invoices = await Invoice.find({ userId });

    if (!invoices || invoices.length === 0) {
      return res.status(404).json({ message: "No quotations found." });
    }

     // Map invoices to include download links
     const pdfList = invoices.map(invoice => {
      const pdfPath = path.join(__dirname, 'invoices', `${invoice._id}_invoice_${invoice.userId}.pdf`);
      return {
          id: invoice._id,
          date: invoice.createdAt,
          downloadLink: pdfPath,
      };
    });
    res.json(pdfList);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
