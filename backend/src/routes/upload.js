const router = require('express').Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { authenticate, adminOnly } = require('../middleware/auth');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage so we can stream to Cloudinary
const upload = multer({ storage: multer.memoryStorage() });

const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });

// POST /upload/image (admin)
router.post('/image', authenticate, adminOnly, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file provided' });
    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({ message: 'Only image files are allowed' });
    }

    const folder = req.body.folder || 'dwarakamai';
    const result = await uploadToCloudinary(req.file.buffer, folder);
    return res.json({
      message: 'Image uploaded successfully',
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    return res.status(500).json({ message: `Upload failed: ${err.message}` });
  }
});

// POST /upload/images (admin)
router.post('/images', authenticate, adminOnly, upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files provided' });
    }

    const folder = req.body.folder || 'dwarakamai';
    const results = [];

    for (const file of req.files) {
      if (!file.mimetype.startsWith('image/')) continue;
      try {
        const result = await uploadToCloudinary(file.buffer, folder);
        results.push({ url: result.secure_url, publicId: result.public_id });
      } catch {
        // skip failed uploads
      }
    }

    return res.json({ message: `${results.length} images uploaded successfully`, images: results });
  } catch (err) {
    return res.status(500).json({ message: `Upload failed: ${err.message}` });
  }
});

// DELETE /upload/image (admin)
router.delete('/image', authenticate, adminOnly, async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId) return res.status(400).json({ message: 'Public ID is required' });

    await cloudinary.uploader.destroy(publicId);
    return res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: `Delete failed: ${err.message}` });
  }
});

module.exports = router;
