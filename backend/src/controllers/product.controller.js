import Product from "../models/Product.js";
import User from "../models/User.js";

export async function listProducts(req, res) {
  try {
    const { search = "", category, page = 1, limit = 12, sort } = req.query;
    const q = {};
    if (search) q.title = { $regex: search, $options: "i" };
    if (category) q.category = category;

    const opts = {
      skip: (Number(page) - 1) * Number(limit),
      limit: Number(limit)
    };

    const sortMap = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      newest: { createdAt: -1 }
    };
    opts.sort = sortMap[sort] || sortMap["newest"];

    const [data, total] = await Promise.all([
      Product.find(q).populate("artisan", "name").setOptions(opts).lean(),
      Product.countDocuments(q)
    ]);

    return res.json({ data, total, page: Number(page), limit: Number(limit) });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e.message });
  }
}
