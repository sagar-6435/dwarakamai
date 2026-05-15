const router = require('express').Router();
const Gallery = require('../models/Gallery');
const { authenticate, adminOnly } = require('../middleware/auth');

// GET /gallery  — returns all active sets
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = { active: true };

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

// GET /gallery/all  — admin: returns all sets including inactive
router.get('/all', authenticate, adminOnly, async (req, res) => {
  try {
    const gallery = await Gallery.find().sort('displayOrder');
    return res.json({ gallery });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// GET /gallery/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Gallery set not found' });
    return res.json({ item });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// POST /gallery (admin) — create a new set
router.post('/', authenticate, adminOnly, async (req, res) => {
  try {
    const {
      title, description,
      mainImages,
      side1Image, side1Label,
      side2Image, side2Label,
      displayOrder,
    } = req.body;

    if (!title) return res.status(400).json({ message: 'Title is required' });

    const item = new Gallery({
      title, description,
      mainImages: mainImages || [],
      side1Image, side1Label,
      side2Image, side2Label,
      displayOrder: displayOrder ?? 0,
    });
    await item.save();
    return res.status(201).json({ message: 'Gallery set created successfully', item });
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
    if (!item) return res.status(404).json({ message: 'Gallery set not found' });
    return res.json({ message: 'Gallery set updated successfully', item });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// DELETE /gallery/:id (admin)
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Gallery set not found' });
    return res.json({ message: 'Gallery set deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
