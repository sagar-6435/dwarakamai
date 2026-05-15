"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
let UploadService = class UploadService {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    async uploadImage(file, folder = 'dwarakamai') {
        if (!file) {
            throw new common_1.BadRequestException('No file provided');
        }
        if (!file.mimetype.startsWith('image/')) {
            throw new common_1.BadRequestException('Only image files are allowed');
        }
        try {
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                    folder: folder,
                    resource_type: 'auto',
                }, (error, result) => {
                    if (error)
                        reject(error);
                    else
                        resolve(result);
                });
                uploadStream.end(file.buffer);
            });
            return {
                message: 'Image uploaded successfully',
                url: result.secure_url,
                publicId: result.public_id,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Upload failed: ${error.message}`);
        }
    }
    async deleteImage(publicId) {
        try {
            await cloudinary_1.v2.uploader.destroy(publicId);
            return { message: 'Image deleted successfully' };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Delete failed: ${error.message}`);
        }
    }
    async uploadMultiple(files, folder = 'dwarakamai') {
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('No files provided');
        }
        const results = [];
        for (const file of files) {
            if (!file.mimetype.startsWith('image/')) {
                continue;
            }
            try {
                const result = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                        folder: folder,
                        resource_type: 'auto',
                    }, (error, result) => {
                        if (error)
                            reject(error);
                        else
                            resolve(result);
                    });
                    uploadStream.end(file.buffer);
                });
                results.push({
                    url: result.secure_url,
                    publicId: result.public_id,
                });
            }
            catch (error) {
                continue;
            }
        }
        return {
            message: `${results.length} images uploaded successfully`,
            images: results,
        };
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
//# sourceMappingURL=upload.service.js.map