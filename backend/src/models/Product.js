import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    images: [{ type: String }],
    artisan: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
