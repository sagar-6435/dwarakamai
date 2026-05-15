import { HydratedDocument } from 'mongoose';
export type GalleryDocument = HydratedDocument<Gallery>;
export declare class Gallery {
    title: string;
    description: string;
    image: string;
    category: string;
    displayOrder: number;
    active: boolean;
}
export declare const GallerySchema: import("mongoose").Schema<Gallery, import("mongoose").Model<Gallery, any, any, any, import("mongoose").Document<unknown, any, Gallery> & Gallery & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Gallery, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Gallery>> & import("mongoose").FlatRecord<Gallery> & {
    _id: import("mongoose").Types.ObjectId;
}>;
//# sourceMappingURL=gallery.schema.d.ts.map