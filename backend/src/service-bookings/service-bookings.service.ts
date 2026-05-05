import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceBooking, ServiceBookingDocument } from '../schemas/service-booking.schema';

@Injectable()
export class ServiceBookingsService {
  constructor(
    @InjectModel(ServiceBooking.name)
    private bookingModel: Model<ServiceBookingDocument>,
  ) {}

  async findAll(userId: string, isAdmin: boolean, page = 1, limit = 10) {
    const filter: any = {};
    if (!isAdmin) filter.user = userId;

    const skip = (page - 1) * limit;
    const bookings = await this.bookingModel
      .find(filter)
      .populate('user')
      .populate('service')
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    const total = await this.bookingModel.countDocuments(filter);

    return {
      bookings,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
      },
    };
  }

  async create(userId: string, data: any) {
    const booking = new this.bookingModel({
      ...data,
      user: userId,
    });

    await booking.save();
    await booking.populate('user');
    await booking.populate('service');

    return { message: 'Service booking created successfully', booking };
  }

  async update(id: string, data: any) {
    const booking = await this.bookingModel
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .populate('user')
      .populate('service');

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return { message: 'Booking updated successfully', booking };
  }

  async delete(id: string) {
    const booking = await this.bookingModel.findByIdAndDelete(id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return { message: 'Booking deleted successfully' };
  }
}
