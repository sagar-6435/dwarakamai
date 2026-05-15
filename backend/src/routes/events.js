const router = require('express').Router();
const Event = require('../models/Event');
const { authenticate, adminOnly } = require('../middleware/auth');

// GET /events
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { active: true };
    if (req.query.category) filter.category = req.query.category;

    const [events, total] = await Promise.all([
      Event.find(filter).skip(skip).limit(limit).sort('date'),
      Event.countDocuments(filter),
    ]);

    return res.json({
      events,
      pagination: { total, pages: Math.ceil(total / limit), current: page },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// GET /events/:id
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    return res.json({ event });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// POST /events (admin)
router.post('/', authenticate, adminOnly, async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    return res.status(201).json({ message: 'Event created successfully', event });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// PUT /events/:id (admin)
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    return res.json({ message: 'Event updated successfully', event });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// DELETE /events/:id (admin)
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    return res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
