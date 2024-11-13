const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  rate: Number,
  gst: { type: Number, default: 0.18 },
});

module.exports = mongoose.model("Product", productSchema);
