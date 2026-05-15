const router = require('express').Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { authenticate, adminOnly } = require('../middleware/auth');

const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
};

// GET /orders
router.get('/', authenticate, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.user.role !== 'admin') filter.customer = req.user.id;

    const [orders, total] = await Promise.all([
      Order.find(filter).populate('customer').populate('items.product').skip(skip).limit(limit).sort('-createdAt'),
      Order.countDocuments(filter),
    ]);

    return res.json({
      orders,
      pagination: { total, pages: Math.ceil(total / limit), current: page },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// GET /orders/:id
router.get('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer').populate('items.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (req.user.role !== 'admin' && order.customer._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    return res.json({ order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// POST /orders
router.post('/', authenticate, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must have at least one item' });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: `Product ${item.product} not found` });
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      totalAmount += product.price * item.quantity;
      orderItems.push({ product: item.product, quantity: item.quantity, price: product.price });

      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      orderNumber: generateOrderNumber(),
      customer: req.user.id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || 'cod',
    });

    await order.save();
    await order.populate('customer');
    await order.populate('items.product');

    return res.status(201).json({ message: 'Order created successfully', order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// PUT /orders/:id (admin)
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true })
      .populate('customer')
      .populate('items.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    return res.json({ message: 'Order updated successfully', order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// DELETE /orders/:id (admin)
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    return res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
