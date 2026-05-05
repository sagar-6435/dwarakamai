import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll() {
    return await this.categoryModel.find().sort('name');
  }

  async findById(id: string) {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return { category };
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const slug = createCategoryDto.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const category = new this.categoryModel({
      ...createCategoryDto,
      slug,
    });

    await category.save();

    return {
      message: 'Category created successfully',
      category,
    };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    let updateData: any = updateCategoryDto;

    if (updateCategoryDto.name) {
      updateData.slug = updateCategoryDto.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true },
    );

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return {
      message: 'Category updated successfully',
      category,
    };
  }

  async delete(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return { message: 'Category deleted successfully' };
  }
}
