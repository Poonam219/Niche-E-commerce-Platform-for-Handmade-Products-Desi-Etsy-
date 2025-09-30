import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/products.routes.js";

const app = express();

// global middleware
app.use(cors());                  // allow frontend during dev
app.use(express.json());          // parse JSON body
app.use(morgan("dev"));           // request logs

// health check
app.get("/health", (_req, res) => res.send("ok"));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);

export default app;
