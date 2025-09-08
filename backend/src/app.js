import express from "express";
import cors from "cors";
import { router as apiRouter } from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());

// sanity check
app.get("/", (_req, res) => res.json({ ok: true, service: "desi-etsy-backend" }));

// mount /api
app.use("/api", apiRouter);

export default app;
