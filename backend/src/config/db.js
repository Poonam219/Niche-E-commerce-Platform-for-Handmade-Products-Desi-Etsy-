import mongoose from "mongoose";

export async function connectDB() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI missing in .env");
  await mongoose.connect(process.env.MONGODB_URI, {
    // options default fine for Mongoose 8
  });
  console.log("MongoDB connected");
}
