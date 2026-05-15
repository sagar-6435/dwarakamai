const router = require('express').Router();
const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { authenticate } = require('../middleware/auth');

const calculateTotal = async (cart) => {
  cart.totalPrice = 0;
  for (const item of cart.items) {
    const product = await Product.findById(item.product);
    if (product) cart.totalPrice += product.price * item.quantity;
  }
};

// GET /cart
router.get('/', authenticate, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
      await cart.save();
    }
    return res.json({ cart });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// POST /cart/add
router.post('/add', authenticate, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ message: 'Insufficient stock' });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [{ product: productId, quantity }] });
    } else {
      const existing = cart.items.find((i) => i.product.toString() === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.items.push({ product: new mongoose.Types.ObjectId(productId), quantity });
      }
    }

    await calculateTotal(cart);
    await cart.save();
    await cart.populate('items.product');
    return res.json({ message: 'Item added to cart', cart });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// PUT /cart/update
router.put('/update', authenticate, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Item not in cart' });

    if (quantity === 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    } else {
      item.quantity = quantity;
    }

    await calculateTotal(cart);
    await cart.save();
    await cart.populate('items.product');
    return res.json({ message: 'Cart updated', cart });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// DELETE /cart/remove/:productId
router.delete('/remove/:productId', authenticate, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    await calculateTotal(cart);
    await cart.save();
    await cart.populate('items.product');
    return res.json({ message: 'Item removed from cart', cart });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// DELETE /cart/clear
router.delete('/clear', authenticate, async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [], totalPrice: 0 },
      { new: true }
    ).populate('items.product');
    return res.json({ message: 'Cart cleared', cart });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
