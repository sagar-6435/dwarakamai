const router = require('express').Router();
const Service = require('../models/Service');
const { authenticate, adminOnly } = require('../middleware/auth');

const toSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// GET /services
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { active: true };
    if (req.query.category) filter.category = req.query.category;

    const [services, total] = await Promise.all([
      Service.find(filter).skip(skip).limit(limit).sort('-createdAt'),
      Service.countDocuments(filter),
    ]);

    return res.json({
      services,
      pagination: { total, pages: Math.ceil(total / limit), current: page },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// GET /services/:id
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    return res.json({ service });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// POST /services (admin)
router.post('/', authenticate, adminOnly, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const service = new Service({ ...req.body, slug: toSlug(name) });
    await service.save();
    return res.status(201).json({ message: 'Service created successfully', service });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// PUT /services/:id (admin)
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.name) updateData.slug = toSlug(updateData.name);

    const service = await Service.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    return res.json({ message: 'Service updated successfully', service });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// DELETE /services/:id (admin)
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    return res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
