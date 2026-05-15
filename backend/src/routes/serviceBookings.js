const router = require("express").Router();
const ServiceBooking = require("../models/ServiceBooking");
const { authenticate, requireAdmin } = require("../middleware/auth");

function parsePage(query) {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(500, Math.max(1, parseInt(query.limit) || 20));
  return { page, limit, skip: (page - 1) * limit };
}

// GET /service-bookings  (admin sees all, user sees own)
router.get("/", authenticate, async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePage(req.query);
    const filter = req.user.role === "admin" ? {} : { customer: req.user._id };

    const [bookings, total] = await Promise.all([
      ServiceBooking.find(filter)
        .populate("service", "name price")
        .populate("customer", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ServiceBooking.countDocuments(filter),
    ]);
    res.json({ bookings, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
});

// POST /service-bookings
router.post("/", async (req, res, next) => {
  try {
    const { service, name, email, phone, date, notes } = req.body;
    if (!name || !email) return res.status(400).json({ message: "Name and email are required" });
    const booking = await ServiceBooking.create({ service, name, email, phone, date, notes });
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
});

// PUT /service-bookings/:id  (admin)
router.put("/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { status } = req.body;
    const booking = await ServiceBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

// DELETE /service-bookings/:id  (admin)
router.delete("/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const booking = await ServiceBooking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
