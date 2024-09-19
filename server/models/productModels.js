const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  company: { type: String, required: true },
  userId: { type: String, required: true },
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;
