const router = require("express").Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const { authenticate, requireAdmin } = require("../middleware/auth");

function parsePage(query) {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(500, Math.max(1, parseInt(query.limit) || 20));
  return { page, limit, skip: (page - 1) * limit };
}

// GET /orders  (admin sees all, user sees own)
router.get("/", authenticate, async (req, res, next) => {
  try {
    const { page, limit, skip } = parsePage(req.query);
    const filter = req.user.role === "admin" ? {} : { customer: req.user._id };
    if (req.query.status) filter.status = req.query.status;

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate("customer", "name email phone")
        .populate("items.product", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(filter),
    ]);
    res.json({ orders, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
});

// GET /orders/:id
router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email phone")
      .populate("items.product", "name images");
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (req.user.role !== "admin" && String(order.customer?._id) !== String(req.user._id)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// POST /orders  (authenticated user places order)
router.post("/", authenticate, async (req, res, next) => {
  try {
    const { items, paymentMethod, shippingAddress } = req.body;
    if (!items?.length) return res.status(400).json({ message: "Order must have at least one item" });

    // Validate products and compute total
    let totalAmount = 0;
    const resolvedItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(400).json({ message: `Product ${item.product} not found` });
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
      resolvedItems.push({ product: product._id, name: product.name, quantity: item.quantity, price: product.price });
      totalAmount += product.price * item.quantity;
    }

    // Decrement stock
    for (const item of resolvedItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    const order = await Order.create({
      customer: req.user._id,
      items: resolvedItems,
      totalAmount,
      paymentMethod: paymentMethod || "cod",
      shippingAddress,
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

// PUT /orders/:id  (admin updates status; user can cancel own pending order)
router.put("/:id", authenticate, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (req.user.role === "admin") {
      const { status, paymentStatus } = req.body;
      if (status) order.status = status;
      if (paymentStatus) order.paymentStatus = paymentStatus;
    } else {
      // Users can only cancel their own pending orders
      if (String(order.customer) !== String(req.user._id)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      if (req.body.status === "cancelled" && order.status === "pending") {
        order.status = "cancelled";
      } else {
        return res.status(403).json({ message: "You can only cancel pending orders" });
      }
    }

    await order.save();
    res.json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
