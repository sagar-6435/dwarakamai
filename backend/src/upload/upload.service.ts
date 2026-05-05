import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File, folder: string = 'dwarakamai') {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }

    try {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: folder,
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );

        uploadStream.end(file.buffer);
      }) as any;

      return {
        message: 'Image uploaded successfully',
        url: result.secure_url,
        publicId: result.public_id,
      };
    } catch (error: any) {
      throw new BadRequestException(`Upload failed: ${error.message}`);
    }
  }

  async deleteImage(publicId: string) {
    try {
      await cloudinary.uploader.destroy(publicId);
      return { message: 'Image deleted successfully' };
    } catch (error: any) {
      throw new BadRequestException(`Delete failed: ${error.message}`);
    }
  }

  async uploadMultiple(files: Express.Multer.File[], folder: string = 'dwarakamai') {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    const results = [];

    for (const file of files) {
      if (!file.mimetype.startsWith('image/')) {
        continue;
      }

      try {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: folder,
              resource_type: 'auto',
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          );

          uploadStream.end(file.buffer);
        }) as any;

        results.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
      } catch (error) {
        continue;
      }
    }

    return {
      message: `${results.length} images uploaded successfully`,
      images: results,
    };
  }
}
