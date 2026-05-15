const router = require('express').Router();
const Category = require('../models/Category');
const { authenticate, adminOnly } = require('../middleware/auth');

const toSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// GET /categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort('name');
    return res.json(categories);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// GET /categories/:id
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    return res.json({ category });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// POST /categories (admin)
router.post('/', authenticate, adminOnly, async (req, res) => {
  try {
    const { name, description, image } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const category = new Category({ name, description, image, slug: toSlug(name) });
    await category.save();
    return res.status(201).json({ message: 'Category created successfully', category });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// PUT /categories/:id (admin)
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.name) updateData.slug = toSlug(updateData.name);

    const category = await Category.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    return res.json({ message: 'Category updated successfully', category });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// DELETE /categories/:id (admin)
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    return res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
