import { UploadService } from './upload.service';
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    uploadImage(file: Express.Multer.File, data: {
        folder?: string;
    }): Promise<{
        message: string;
        url: any;
        publicId: any;
    }>;
    uploadMultiple(files: Express.Multer.File[], data: {
        folder?: string;
    }): Promise<{
        message: string;
        images: {
            url: any;
            publicId: any;
        }[];
    }>;
    deleteImage(data: {
        publicId: string;
    }): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=upload.controller.d.ts.map