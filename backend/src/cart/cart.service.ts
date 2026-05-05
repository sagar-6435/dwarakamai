import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../schemas/cart.schema';
import { Product, ProductDocument } from '../schemas/product.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getCart(userId: string) {
    let cart = await this.cartModel.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      cart = new this.cartModel({ user: userId, items: [] });
      await cart.save();
    }
    return { cart };
  }

  async addToCart(userId: string, productId: string, quantity: number) {
    if (!productId || !quantity) {
      throw new BadRequestException('Product ID and quantity are required');
    }

    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    let cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      cart = new this.cartModel({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId,
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await this.calculateCartTotal(cart);
    await cart.save();
    await cart.populate('items.product');

    return { message: 'Item added to cart', cart };
  }

  async updateCartItem(userId: string, productId: string, quantity: number) {
    const cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const item = cart.items.find((item) => item.product.toString() === productId);
    if (!item) {
      throw new NotFoundException('Item not in cart');
    }

    if (quantity === 0) {
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    } else {
      item.quantity = quantity;
    }

    await this.calculateCartTotal(cart);
    await cart.save();
    await cart.populate('items.product');

    return { message: 'Cart updated', cart };
  }

  async removeFromCart(userId: string, productId: string) {
    const cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await this.calculateCartTotal(cart);
    await cart.save();
    await cart.populate('items.product');

    return { message: 'Item removed from cart', cart };
  }

  async clearCart(userId: string) {
    const cart = await this.cartModel
      .findOneAndUpdate(
        { user: userId },
        { items: [], totalPrice: 0 },
        { new: true },
      )
      .populate('items.product');

    return { message: 'Cart cleared', cart };
  }

  private async calculateCartTotal(cart: CartDocument) {
    cart.totalPrice = 0;
    for (const item of cart.items) {
      const product = await this.productModel.findById(item.product);
      if (product) {
        cart.totalPrice += product.price * item.quantity;
      }
    }
  }
}
