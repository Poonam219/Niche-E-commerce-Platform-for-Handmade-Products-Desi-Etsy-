import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["artisan","customer","admin"], default: "customer" },
  isApproved: { type: Boolean, default: false } // artisans approved later
}, { timestamps: true });

export default mongoose.model("User", userSchema);
