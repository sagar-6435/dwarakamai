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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cart_schema_1 = require("../schemas/cart.schema");
const product_schema_1 = require("../schemas/product.schema");
let CartService = class CartService {
    constructor(cartModel, productModel) {
        this.cartModel = cartModel;
        this.productModel = productModel;
    }
    async getCart(userId) {
        let cart = await this.cartModel.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            cart = new this.cartModel({ user: userId, items: [] });
            await cart.save();
        }
        return { cart };
    }
    async addToCart(userId, productId, quantity) {
        if (!productId || !quantity) {
            throw new common_1.BadRequestException('Product ID and quantity are required');
        }
        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        if (product.stock < quantity) {
            throw new common_1.BadRequestException('Insufficient stock');
        }
        let cart = await this.cartModel.findOne({ user: userId });
        if (!cart) {
            cart = new this.cartModel({
                user: userId,
                items: [{ product: productId, quantity }],
            });
        }
        else {
            const existingItem = cart.items.find((item) => item.product.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            }
            else {
                cart.items.push({ product: new mongoose_2.Types.ObjectId(productId), quantity });
            }
        }
        await this.calculateCartTotal(cart);
        await cart.save();
        await cart.populate('items.product');
        return { message: 'Item added to cart', cart };
    }
    async updateCartItem(userId, productId, quantity) {
        const cart = await this.cartModel.findOne({ user: userId });
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        const item = cart.items.find((item) => item.product.toString() === productId);
        if (!item) {
            throw new common_1.NotFoundException('Item not in cart');
        }
        if (quantity === 0) {
            cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        }
        else {
            item.quantity = quantity;
        }
        await this.calculateCartTotal(cart);
        await cart.save();
        await cart.populate('items.product');
        return { message: 'Cart updated', cart };
    }
    async removeFromCart(userId, productId) {
        const cart = await this.cartModel.findOne({ user: userId });
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        await this.calculateCartTotal(cart);
        await cart.save();
        await cart.populate('items.product');
        return { message: 'Item removed from cart', cart };
    }
    async clearCart(userId) {
        const cart = await this.cartModel
            .findOneAndUpdate({ user: userId }, { items: [], totalPrice: 0 }, { new: true })
            .populate('items.product');
        return { message: 'Cart cleared', cart };
    }
    async calculateCartTotal(cart) {
        cart.totalPrice = 0;
        for (const item of cart.items) {
            const product = await this.productModel.findById(item.product);
            if (product) {
                cart.totalPrice += product.price * item.quantity;
            }
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CartService);
//# sourceMappingURL=cart.service.js.map