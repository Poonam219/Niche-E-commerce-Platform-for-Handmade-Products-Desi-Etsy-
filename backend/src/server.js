import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 4000;

try {
  await connectDB(); // ensure DB is up BEFORE starting server
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
} catch (err) {
  console.error("Startup error:", err?.message);
  process.exit(1);
}
