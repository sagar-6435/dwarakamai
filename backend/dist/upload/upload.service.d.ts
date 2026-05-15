export declare class UploadService {
    constructor();
    uploadImage(file: Express.Multer.File, folder?: string): Promise<{
        message: string;
        url: any;
        publicId: any;
    }>;
    deleteImage(publicId: string): Promise<{
        message: string;
    }>;
    uploadMultiple(files: Express.Multer.File[], folder?: string): Promise<{
        message: string;
        images: {
            url: any;
            publicId: any;
        }[];
    }>;
}
//# sourceMappingURL=upload.service.d.ts.map