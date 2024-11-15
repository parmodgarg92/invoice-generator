const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User ' // Reference to the User model
  },
  products: [{
      name: {
          type: String,
          required: true
      },
      qty: {
          type: Number,
          required: true,
          min: 1 // Minimum quantity should be 1
      },
      rate: {
          type: Number,
          required: true,
          min: 0 // Rate should not be negative
      },
      gst: {
          type: Number,
          required: true,
          default: 0 // Default GST value
      },
      total: {
          type: Number,
          required: true
      }
  }],
  createdAt: {
      type: Date,
      default: Date.now // Date when the invoice was created
  }
});

module.exports = mongoose.model("Invoice", invoiceSchema);
