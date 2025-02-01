const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: Number
  },
  {
    versionKey: false, // Disable the version key
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
  }
);

module.exports = mongoose.model("product", productSchema);