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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("../schemas/product.schema");
let ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async findAll(page = 1, limit = 10, category) {
        const filter = { active: true };
        if (category)
            filter.category = category;
        const skip = (page - 1) * limit;
        const products = await this.productModel
            .find(filter)
            .populate('category')
            .skip(skip)
            .limit(limit)
            .sort('-createdAt');
        const total = await this.productModel.countDocuments(filter);
        return {
            products,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                current: page,
            },
        };
    }
    async findById(id) {
        const product = await this.productModel.findById(id).populate('category');
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return { product };
    }
    async create(createProductDto) {
        const slug = createProductDto.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        const product = new this.productModel({
            ...createProductDto,
            slug,
        });
        await product.save();
        await product.populate('category');
        return {
            message: 'Product created successfully',
            product,
        };
    }
    async update(id, updateProductDto) {
        let updateData = updateProductDto;
        if (updateProductDto.name) {
            updateData.slug = updateProductDto.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
        }
        const product = await this.productModel
            .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
            .populate('category');
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return {
            message: 'Product updated successfully',
            product,
        };
    }
    async delete(id) {
        const product = await this.productModel.findByIdAndDelete(id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return { message: 'Product deleted successfully' };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map