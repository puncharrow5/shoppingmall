const { default: mongoose, Schema } = require("mongoose");

const productSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    maxLength: 30,
  },
  description: String,
  price: {
    type: Number,
    default: 10000,
  },
  images: {
    type: Array,
    default: [],
  },
  sold: {
    type: Number,
    default: 0,
  },
  producttypes: {
    type: Number,
    default: 1,
  },
  views: {
    type: Number,
    default: 0,
  },
});

productSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      title: 2,
      description: 1,
    },
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
