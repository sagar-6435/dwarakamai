const router = require("express").Router();
const Category = require("../models/Category");
const { authenticate, requireAdmin } = require("../middleware/auth");

// GET /categories
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// POST /categories  (admin)
router.post("/", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: "Category already exists" });
    next(err);
  }
});

// PUT /categories/:id  (admin)
router.put("/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    next(err);
  }
});

// DELETE /categories/:id  (admin)
router.delete("/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
