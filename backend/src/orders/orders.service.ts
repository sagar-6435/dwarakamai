import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { Product, ProductDocument } from '../schemas/product.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  private generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
  }

  async findAll(userId: string, isAdmin: boolean, page = 1, limit = 10) {
    const filter: any = {};
    if (!isAdmin) filter.customer = userId;

    const skip = (page - 1) * limit;
    const orders = await this.orderModel
      .find(filter)
      .populate('customer')
      .populate('items.product')
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    const total = await this.orderModel.countDocuments(filter);

    return {
      orders,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
      },
    };
  }

  async findById(id: string, userId: string, isAdmin: boolean) {
    const order = await this.orderModel
      .findById(id)
      .populate('customer')
      .populate('items.product');

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (!isAdmin && order.customer._id.toString() !== userId) {
      throw new BadRequestException('Access denied');
    }

    return { order };
  }

  async create(userId: string, items: any[], shippingAddress: any, paymentMethod: string) {
    if (!items || items.length === 0) {
      throw new BadRequestException('Order must have at least one item');
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await this.productModel.findById(item.product);
      if (!product) {
        throw new NotFoundException(`Product ${item.product} not found`);
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(`Insufficient stock for ${product.name}`);
      }

      totalAmount += product.price * item.quantity;
      orderItems.push({
        product: item.product,
        quantity: item.quantity,
        price: product.price,
      });

      product.stock -= item.quantity;
      await product.save();
    }

    const order = new this.orderModel({
      orderNumber: this.generateOrderNumber(),
      customer: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || 'cod',
    });

    await order.save();
    await order.populate('customer');
    await order.populate('items.product');

    return {
      message: 'Order created successfully',
      order,
    };
  }

  async updateStatus(id: string, status?: string, paymentStatus?: string) {
    const updateData: any = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const order = await this.orderModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .populate('customer')
      .populate('items.product');

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return {
      message: 'Order updated successfully',
      order,
    };
  }

  async delete(id: string) {
    const order = await this.orderModel.findByIdAndDelete(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return { message: 'Order deleted successfully' };
  }
}
