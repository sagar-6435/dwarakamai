import { GalleryService } from './gallery.service';
export declare class GalleryController {
    private galleryService;
    constructor(galleryService: GalleryService);
    findAll(page?: number, limit?: number, category?: string): Promise<{
        gallery: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/gallery.schema").Gallery> & import("../schemas/gallery.schema").Gallery & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/gallery.schema").Gallery> & import("../schemas/gallery.schema").Gallery & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        pagination: {
            total: number;
            pages: number;
            current: number;
        };
    }>;
    findById(id: string): Promise<{
        item: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/gallery.schema").Gallery> & import("../schemas/gallery.schema").Gallery & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/gallery.schema").Gallery> & import("../schemas/gallery.schema").Gallery & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    create(data: any): Promise<{
        message: string;
        item: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/gallery.schema").Gallery> & import("../schemas/gallery.schema").Gallery & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/gallery.schema").Gallery> & import("../schemas/gallery.schema").Gallery & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    update(id: string, data: any): Promise<{
        message: string;
        item: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/gallery.schema").Gallery> & import("../schemas/gallery.schema").Gallery & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/gallery.schema").Gallery> & import("../schemas/gallery.schema").Gallery & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=gallery.controller.d.ts.map