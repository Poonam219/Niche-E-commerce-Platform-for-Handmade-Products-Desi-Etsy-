import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import bcrypt from "bcrypt";

const categories = ["Textiles","Jewelry","Pottery","Woodcraft","Metalwork","Home Decor"];
const titles = [
  "Handwoven Cotton Scarf","Brass Tribal Necklace","Terracotta Planter",
  "Carved Neem Wood Spoon Set","Hammered Copper Bowl","Block-Printed Table Runner",
  "Bamboo Storage Basket","Macramé Wall Hanging","Clay Tea Cups (Set of 6)",
  "Woolen Embroidered Cushion Cover"
];

const pick = (a) => a[Math.floor(Math.random()*a.length)];

(async () => {
  await connectDB();

  // ensure one artisan
  let artisan = await User.findOne({ email: "artisan@example.com" });
  if (!artisan) {
    artisan = await User.create({
      name: "Demo Artisan",
      email: "artisan@example.com",
      password: await bcrypt.hash("password123", 10),
      role: "artisan",
      isApproved: true
    });
  }

  await Product.deleteMany({ artisan: artisan._id });

  const docs = [];
  for (let i=0; i<30; i++) {
    const title = pick(titles);
    docs.push({
      title,
      description: `${title} made by local artisans using traditional techniques.`,
      price: Math.floor(Math.random()*2000)+199,
      category: pick(categories),
      images: ["https://via.placeholder.com/600x400?text=Handmade+Item"],
      artisan: artisan._id,
      isApproved: true
    });
  }
  await Product.insertMany(docs);
  console.log("Seeded products:", docs.length);

  await mongoose.disconnect();
  console.log("Done.");
})().catch(e => { console.error(e); process.exit(1); });
