const router = require('express').Router();
const Product = require('../models/Product');
const { authenticate, adminOnly } = require('../middleware/auth');

const toSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// GET /products
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { active: true };
    if (req.query.category) filter.category = req.query.category;

    const [products, total] = await Promise.all([
      Product.find(filter).populate('category').skip(skip).limit(limit).sort('-createdAt'),
      Product.countDocuments(filter),
    ]);

    return res.json({
      products,
      pagination: { total, pages: Math.ceil(total / limit), current: page },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// GET /products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json({ product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// POST /products (admin)
router.post('/', authenticate, adminOnly, async (req, res) => {
  try {
    const { name, description, category, price, discountPrice, stock, images, specifications } = req.body;
    if (!name || !category || price === undefined) {
      return res.status(400).json({ message: 'Name, category and price are required' });
    }

    const product = new Product({
      name, description, category, price, discountPrice, stock, images, specifications,
      slug: toSlug(name),
    });
    await product.save();
    await product.populate('category');
    return res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// PUT /products/:id (admin)
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.name) updateData.slug = toSlug(updateData.name);

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate('category');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// DELETE /products/:id (admin)
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
