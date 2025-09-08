import Product from "../models/Product.js";

export const listProducts = async (req, res) => {
  const { category, minPrice, maxPrice, sort="createdAt:desc", page=1, limit=12, q } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {
      ...(minPrice ? { $gte: +minPrice } : {}),
      ...(maxPrice ? { $lte: +maxPrice } : {}),
    };
  }
  if (q) filter.$text = { $search: q };

  const [field, dir] = sort.split(":");
  const docs = await Product.find(filter)
    .populate("artisan", "name")
    .sort({ [field]: dir === "asc" ? 1 : -1 })
    .skip((+page - 1) * +limit)
    .limit(+limit)
    .lean();

  const total = await Product.countDocuments(filter);
  res.json({ data: docs, total, page:+page, limit:+limit });
};
