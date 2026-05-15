const router = require('express').Router();
const Gallery = require('../models/Gallery');
const { authenticate, adminOnly } = require('../middleware/auth');

// GET /gallery
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const filter = { active: true };
    if (req.query.category) filter.category = req.query.category;

    const [gallery, total] = await Promise.all([
      Gallery.find(filter).skip(skip).limit(limit).sort('displayOrder'),
      Gallery.countDocuments(filter),
    ]);

    return res.json({
      gallery,
      pagination: { total, pages: Math.ceil(total / limit), current: page },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// GET /gallery/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Gallery item not found' });
    return res.json({ item });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// POST /gallery (admin)
router.post('/', authenticate, adminOnly, async (req, res) => {
  try {
    const item = new Gallery(req.body);
    await item.save();
    return res.status(201).json({ message: 'Gallery item created successfully', item });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// PUT /gallery/:id (admin)
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Gallery item not found' });
    return res.json({ message: 'Gallery item updated successfully', item });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// DELETE /gallery/:id (admin)
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Gallery item not found' });
    return res.json({ message: 'Gallery item deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
