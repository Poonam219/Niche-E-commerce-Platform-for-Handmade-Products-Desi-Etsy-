import { Router } from "express";
import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";

export const router = Router();
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
