const router = require("express").Router();
const Service = require("../models/Service");
const { authenticate, requireAdmin } = require("../middleware/auth");

function parsePage(query) {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(200, Math.max(1, parseInt(query.limit) || 20));
  return { page, limit, skip: (page - 1) * limit };
}

// GET /services
router.get("/", async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePage(req.query);
    const filter = {};
    if (req.query.active !== undefined) filter.active = req.query.active === "true";

    const [services, total] = await Promise.all([
      Service.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Service.countDocuments(filter),
    ]);
    res.json({ services, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
});

// GET /services/:id
router.get("/:id", async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    next(err);
  }
});

// POST /services  (admin)
router.post("/", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { name, description, price, duration, category, featured, active } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const service = await Service.create({ name, description, price, duration, category, featured, active });
    res.status(201).json(service);
  } catch (err) {
    next(err);
  }
});

// PUT /services/:id  (admin)
router.put("/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { name, description, price, duration, category, featured, active } = req.body;
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, price, duration, category, featured, active },
      { new: true, runValidators: true }
    );
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    next(err);
  }
});

// DELETE /services/:id  (admin)
router.delete("/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
