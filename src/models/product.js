import mongoose from "mongoose";
//product model
const ProductsSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: String,
    sizes: String,
    deliveryInfo: String,
    onSale: String,
    priceDrop: Number,
    imageUrl: String,
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Products || mongoose.model("Products", ProductsSchema);

export default Product;
