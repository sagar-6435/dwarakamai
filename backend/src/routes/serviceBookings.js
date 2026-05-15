const router = require('express').Router();
const ServiceBooking = require('../models/ServiceBooking');
const { authenticate, adminOnly } = require('../middleware/auth');

// GET /service-bookings
router.get('/', authenticate, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.user.role !== 'admin') filter.user = req.user.id;

    const [bookings, total] = await Promise.all([
      ServiceBooking.find(filter).populate('user').populate('service').skip(skip).limit(limit).sort('-createdAt'),
      ServiceBooking.countDocuments(filter),
    ]);

    return res.json({
      bookings,
      pagination: { total, pages: Math.ceil(total / limit), current: page },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// POST /service-bookings
router.post('/', authenticate, async (req, res) => {
  try {
    const booking = new ServiceBooking({ ...req.body, user: req.user.id });
    await booking.save();
    await booking.populate('user');
    await booking.populate('service');
    return res.status(201).json({ message: 'Service booking created successfully', booking });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// PUT /service-bookings/:id (admin)
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const booking = await ServiceBooking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('user').populate('service');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    return res.json({ message: 'Booking updated successfully', booking });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// DELETE /service-bookings/:id (admin)
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const booking = await ServiceBooking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    return res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
