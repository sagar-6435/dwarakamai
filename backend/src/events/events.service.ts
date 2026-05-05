import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from '../schemas/event.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async findAll(page = 1, limit = 10, category?: string) {
    const filter: any = { active: true };
    if (category) filter.category = category;

    const skip = (page - 1) * limit;
    const events = await this.eventModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort('date');

    const total = await this.eventModel.countDocuments(filter);

    return {
      events,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
      },
    };
  }

  async findById(id: string) {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return { event };
  }

  async create(data: any) {
    const event = new this.eventModel(data);
    await event.save();
    return { message: 'Event created successfully', event };
  }

  async update(id: string, data: any) {
    const event = await this.eventModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return { message: 'Event updated successfully', event };
  }

  async delete(id: string) {
    const event = await this.eventModel.findByIdAndDelete(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return { message: 'Event deleted successfully' };
  }
}
