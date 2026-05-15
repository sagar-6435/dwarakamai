const router = require("express").Router();
const Gallery = require("../models/Gallery");
const { authenticate, requireAdmin } = require("../middleware/auth");

function parsePage(query) {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(200, Math.max(1, parseInt(query.limit) || 20));
  return { page, limit, skip: (page - 1) * limit };
}

// GET /gallery
router.get("/", async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePage(req.query);
    const filter = req.query.category ? { category: req.query.category } : {};

    const [gallery, total] = await Promise.all([
      Gallery.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Gallery.countDocuments(filter),
    ]);
    res.json({ gallery, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
});

// POST /gallery  (admin)
router.post("/", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { title, image, category } = req.body;
    if (!title || !image) return res.status(400).json({ message: "Title and image are required" });
    const item = await Gallery.create({ title, image, category });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

// DELETE /gallery/:id  (admin)
router.delete("/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Gallery item not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
