const Product = require("../models/Product");

exports.addProducts = async (req, res) => {
  const { products } = req.body;
  try {
    const productsWithGST = products.map(product => ({
      ...product,
      gst: product.rate * 0.18,
    }));
    const newProducts = await Product.insertMany(productsWithGST);
    res.status(201).json(newProducts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
