import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery, GalleryDocument } from '../schemas/gallery.schema';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<GalleryDocument>,
  ) {}

  async findAll(page = 1, limit = 12, category?: string) {
    const filter: any = { active: true };
    if (category) filter.category = category;

    const skip = (page - 1) * limit;
    const gallery = await this.galleryModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort('displayOrder');

    const total = await this.galleryModel.countDocuments(filter);

    return {
      gallery,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
      },
    };
  }

  async findById(id: string) {
    const item = await this.galleryModel.findById(id);
    if (!item) {
      throw new NotFoundException('Gallery item not found');
    }
    return { item };
  }

  async create(data: any) {
    const item = new this.galleryModel(data);
    await item.save();
    return { message: 'Gallery item created successfully', item };
  }

  async update(id: string, data: any) {
    const item = await this.galleryModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      throw new NotFoundException('Gallery item not found');
    }
    return { message: 'Gallery item updated successfully', item };
  }

  async delete(id: string) {
    const item = await this.galleryModel.findByIdAndDelete(id);
    if (!item) {
      throw new NotFoundException('Gallery item not found');
    }
    return { message: 'Gallery item deleted successfully' };
  }
}
