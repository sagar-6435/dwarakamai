import { Router } from 'express';
import {
  getGallery,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getGallery);
router.get('/:id', getGalleryItem);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, createGalleryItem);
router.put('/:id', authMiddleware, adminMiddleware, updateGalleryItem);
router.delete('/:id', authMiddleware, adminMiddleware, deleteGalleryItem);

export default router;
