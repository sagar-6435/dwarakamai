import { Request, Response } from 'express';
import ServiceBooking from '../models/ServiceBooking';

export const getServiceBookings = async (req: Request, res: Response) => {
  try {
    const authReq = req as any;
    const { page = 1, limit = 10 } = req.query;

    const filter: any = {};
    if (authReq.user.role !== 'admin') {
      filter.user = authReq.user.id;
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const bookings = await ServiceBooking.find(filter)
      .populate('user')
      .populate('service')
      .skip(skip)
      .limit(limitNum)
      .sort('-createdAt');

    const total = await ServiceBooking.countDocuments(filter);

    res.json({
      bookings,
      pagination: {
        total,
        pages: Math.ceil(total / limitNum),
        current: pageNum,
      },
    });
  } catch (error) {
    console.error('Get service bookings error:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

export const createServiceBooking = async (req: Request, res: Response) => {
  try {
    const authReq = req as any;
    const { service, bookingDate, preferredTime, notes, contact } = req.body;

    if (!service || !bookingDate) {
      return res.status(400).json({ message: 'Service and booking date are required' });
    }

    const booking = new ServiceBooking({
      user: authReq.user.id,
      service,
      bookingDate,
      preferredTime,
      notes,
      contact: contact || {},
    });

    await booking.save();
    await booking.populate('user');
    await booking.populate('service');

    res.status(201).json({
      message: 'Service booking created successfully',
      booking,
    });
  } catch (error) {
    console.error('Create service booking error:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
};

export const updateServiceBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const booking = await ServiceBooking.findByIdAndUpdate(
      id,
      { status, notes },
      { new: true, runValidators: true }
    )
      .populate('user')
      .populate('service');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({
      message: 'Booking updated successfully',
      booking,
    });
  } catch (error) {
    console.error('Update service booking error:', error);
    res.status(500).json({ message: 'Error updating booking' });
  }
};

export const deleteServiceBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const booking = await ServiceBooking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Delete service booking error:', error);
    res.status(500).json({ message: 'Error deleting booking' });
  }
};
