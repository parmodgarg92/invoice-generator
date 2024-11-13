const Invoice = require("../models/Invoice");
const Product = require("../models/Product");
const puppeteer = require("puppeteer");

exports.createInvoice = async (req, res) => {
  const { products } = req.body;
  const userId = req.user.id;

  try {
    const newInvoice = new Invoice({ userId, products, date: new Date() });
    await newInvoice.save();

    const pdfBuffer = await generatePDF(products);
    res.set("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const generatePDF = async (products) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(`<h1>Invoice</h1><p>Product List: ${JSON.stringify(products)}</p>`);
  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();
  return pdfBuffer;
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
