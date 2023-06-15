// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const mongooseSchema = mongoose.Schema;

const productSchema = new mongooseSchema({
  productName: String,
  quantity: Number,
  sellerName: String,
  price: Number,
  photo: String,
});

// Compile model from schema
const productModel = mongoose.model("productModel", productSchema);

module.exports = productModel;