const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
