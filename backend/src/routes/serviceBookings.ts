import { Router } from 'express';
import {
  getServiceBookings,
  createServiceBooking,
  updateServiceBooking,
  deleteServiceBooking,
} from '../controllers/serviceBookingController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

// Protected routes
router.get('/', authMiddleware, getServiceBookings);
router.post('/', authMiddleware, createServiceBooking);

// Admin routes
router.put('/:id', authMiddleware, adminMiddleware, updateServiceBooking);
router.delete('/:id', authMiddleware, adminMiddleware, deleteServiceBooking);

export default router;
