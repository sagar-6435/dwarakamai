import { Request, Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';

export const getCart = async (req: Request, res: Response) => {
  try {
    const authReq = req as any;

    let cart = await Cart.findOne({ user: authReq.user.id })
      .populate('items.product');

    if (!cart) {
      cart = new Cart({ user: authReq.user.id, items: [] });
      await cart.save();
    }

    res.json({ cart });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Error fetching cart' });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const authReq = req as any;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ user: authReq.user.id });

    if (!cart) {
      cart = new Cart({
        user: authReq.user.id,
        items: [{ product: productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    // Calculate total price
    cart.totalPrice = 0;
    for (const item of cart.items) {
      const prod = await Product.findById(item.product);
      if (prod) {
        cart.totalPrice += prod.price * item.quantity;
      }
    }

    await cart.save();
    await cart.populate('items.product');

    res.json({
      message: 'Item added to cart',
      cart,
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Error adding to cart' });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const authReq = req as any;
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const cart = await Cart.findOne({ user: authReq.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find((item) => item.product.toString() === productId);

    if (!item) {
      return res.status(404).json({ message: 'Item not in cart' });
    }

    if (quantity === 0) {
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    } else {
      item.quantity = quantity;
    }

    // Calculate total price
    cart.totalPrice = 0;
    for (const cartItem of cart.items) {
      const product = await Product.findById(cartItem.product);
      if (product) {
        cart.totalPrice += product.price * cartItem.quantity;
      }
    }

    await cart.save();
    await cart.populate('items.product');

    res.json({
      message: 'Cart updated',
      cart,
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Error updating cart' });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const authReq = req as any;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: authReq.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);

    // Calculate total price
    cart.totalPrice = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (product) {
        cart.totalPrice += product.price * item.quantity;
      }
    }

    await cart.save();
    await cart.populate('items.product');

    res.json({
      message: 'Item removed from cart',
      cart,
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Error removing from cart' });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const authReq = req as any;

    const cart = await Cart.findOneAndUpdate(
      { user: authReq.user.id },
      { items: [], totalPrice: 0 },
      { new: true }
    ).populate('items.product');

    res.json({
      message: 'Cart cleared',
      cart,
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Error clearing cart' });
  }
};
