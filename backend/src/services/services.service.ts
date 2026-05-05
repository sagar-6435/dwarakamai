import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from '../schemas/service.schema';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
  ) {}

  async findAll(page = 1, limit = 10, category?: string) {
    const filter: any = { active: true };
    if (category) filter.category = category;

    const skip = (page - 1) * limit;
    const services = await this.serviceModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    const total = await this.serviceModel.countDocuments(filter);

    return {
      services,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
      },
    };
  }

  async findById(id: string) {
    const service = await this.serviceModel.findById(id);
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return { service };
  }

  async create(createServiceDto: CreateServiceDto) {
    const slug = createServiceDto.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const service = new this.serviceModel({
      ...createServiceDto,
      slug,
    });

    await service.save();

    return {
      message: 'Service created successfully',
      service,
    };
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    let updateData: any = updateServiceDto;

    if (updateServiceDto.name) {
      updateData.slug = updateServiceDto.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    const service = await this.serviceModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true },
    );

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return {
      message: 'Service updated successfully',
      service,
    };
  }

  async delete(id: string) {
    const service = await this.serviceModel.findByIdAndDelete(id);
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return { message: 'Service deleted successfully' };
  }
}
