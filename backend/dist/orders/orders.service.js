"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("../schemas/order.schema");
const product_schema_1 = require("../schemas/product.schema");
let OrdersService = class OrdersService {
    constructor(orderModel, productModel) {
        this.orderModel = orderModel;
        this.productModel = productModel;
    }
    generateOrderNumber() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `ORD-${timestamp}-${random}`;
    }
    async findAll(userId, isAdmin, page = 1, limit = 10) {
        const filter = {};
        if (!isAdmin)
            filter.customer = userId;
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
    async findById(id, userId, isAdmin) {
        const order = await this.orderModel
            .findById(id)
            .populate('customer')
            .populate('items.product');
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (!isAdmin && order.customer._id.toString() !== userId) {
            throw new common_1.BadRequestException('Access denied');
        }
        return { order };
    }
    async create(userId, items, shippingAddress, paymentMethod) {
        if (!items || items.length === 0) {
            throw new common_1.BadRequestException('Order must have at least one item');
        }
        let totalAmount = 0;
        const orderItems = [];
        for (const item of items) {
            const product = await this.productModel.findById(item.product);
            if (!product) {
                throw new common_1.NotFoundException(`Product ${item.product} not found`);
            }
            if (product.stock < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for ${product.name}`);
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
    async updateStatus(id, status, paymentStatus) {
        const updateData = {};
        if (status)
            updateData.status = status;
        if (paymentStatus)
            updateData.paymentStatus = paymentStatus;
        const order = await this.orderModel
            .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
            .populate('customer')
            .populate('items.product');
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return {
            message: 'Order updated successfully',
            order,
        };
    }
    async delete(id) {
        const order = await this.orderModel.findByIdAndDelete(id);
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return { message: 'Order deleted successfully' };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], OrdersService);
//# sourceMappingURL=orders.service.js.map