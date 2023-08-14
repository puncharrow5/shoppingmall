const { default: mongoose, Schema } = require("mongoose");

const productSchema = mongoose.Schema({
  writer: {
    // UserSchema 에서 User의 Id에서 참조함
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    maxLength: 30,
  },
  description: {
    String,
  },
  price: {
    type: Number,
  },
  image: {
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

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
