import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(page = 1, limit = 10, category?: string) {
    const filter: any = { active: true };
    if (category) filter.category = category;

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

  async findById(id: string) {
    const product = await this.productModel.findById(id).populate('category');
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return { product };
  }

  async create(createProductDto: CreateProductDto) {
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

  async update(id: string, updateProductDto: UpdateProductDto) {
    let updateData: any = updateProductDto;

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
      throw new NotFoundException('Product not found');
    }

    return {
      message: 'Product updated successfully',
      product,
    };
  }

  async delete(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return { message: 'Product deleted successfully' };
  }
}
