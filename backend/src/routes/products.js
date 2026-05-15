const router = require("express").Router();
const Product = require("../models/Product");
const { authenticate, requireAdmin } = require("../middleware/auth");

function parsePage(query) {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(200, Math.max(1, parseInt(query.limit) || 20));
  return { page, limit, skip: (page - 1) * limit };
}

// GET /products
router.get("/", async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePage(req.query);
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.active !== undefined) filter.active = req.query.active === "true";

    const [products, total] = await Promise.all([
      Product.find(filter).populate("category", "name").sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);
    res.json({ products, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
});

// GET /products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /products  (admin)
router.post("/", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { name, description, price, stock, images, category, active } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ message: "Name and price are required" });
    }
    const product = await Product.create({ name, description, price, stock, images, category, active });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// PUT /products/:id  (admin)
router.put("/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { name, description, price, stock, images, category, active } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock, images, category, active },
      { new: true, runValidators: true }
    ).populate("category", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// DELETE /products/:id  (admin)
router.delete("/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
