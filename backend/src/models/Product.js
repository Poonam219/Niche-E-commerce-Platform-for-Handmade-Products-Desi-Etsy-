// models/Product.js
import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  title:{ type:String, required:true },
  description:String,
  price:{ type:Number, required:true },
  category:{ type:String, index:true },
  images:[String],
  artisan:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isApproved:{ type:Boolean, default:false } // admin gate (week 4)
},{ timestamps:true });
export default mongoose.model("Product", productSchema);
