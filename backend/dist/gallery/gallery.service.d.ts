import { Model } from 'mongoose';
import { Gallery, GalleryDocument } from '../schemas/gallery.schema';
export declare class GalleryService {
    private galleryModel;
    constructor(galleryModel: Model<GalleryDocument>);
    findAll(page?: number, limit?: number, category?: string): Promise<{
        gallery: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Gallery> & Gallery & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Gallery> & Gallery & {
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
        item: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Gallery> & Gallery & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Gallery> & Gallery & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    create(data: any): Promise<{
        message: string;
        item: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Gallery> & Gallery & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Gallery> & Gallery & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    update(id: string, data: any): Promise<{
        message: string;
        item: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Gallery> & Gallery & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Gallery> & Gallery & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=gallery.service.d.ts.map