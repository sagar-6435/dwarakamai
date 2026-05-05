import { Router } from 'express';
import { uploadImage, deleteImage, upload } from '../controllers/uploadController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

// Admin upload routes
router.post('/', authMiddleware, adminMiddleware, upload.single('file'), uploadImage);
router.delete('/', authMiddleware, adminMiddleware, deleteImage);

export default router;
