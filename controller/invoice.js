const generateInvoice = require("../helper/generateInvoice");
const Invoice = require("../models/Invoice");
require('web-streams-polyfill/ponyfill/es6');

// const fetch = require('node-fetch');

// if (typeof ReadableStream === 'undefined') {
//   global.ReadableStream = require('stream').Readable;
// }

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

    products.map(async (productId) => {
       productId.gst = (productId.rate * gst * productId.qty);
       productId.total = (productId.rate * productId.qty) + productId.gst;
       return productId;
    });
    
    const newInvoice = new Invoice({ userId, products, date: new Date() });

    console.log(newInvoice,'newInvoice');
    await newInvoice.save();

    // res.send({ message: "Invoice created successfully" });
    const pdfBuffer = await generateInvoice(products);
    console.log('after pdf buffer')
    res.set("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.viewInvoices = async (req, res) => {
  const userId = req.user.id;
  try {
    const invoices = await Invoice.find({ userId }).populate("products");
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
