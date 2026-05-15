import { HydratedDocument, Types } from 'mongoose';
export type ProductDocument = HydratedDocument<Product>;
export declare class Product {
    name: string;
    slug: string;
    description: string;
    category: Types.ObjectId;
    price: number;
    discountPrice: number;
    stock: number;
    images: string[];
    specifications: Record<string, string>;
    featured: boolean;
    active: boolean;
}
export declare const ProductSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, import("mongoose").Document<unknown, any, Product> & Product & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Product>> & import("mongoose").FlatRecord<Product> & {
    _id: Types.ObjectId;
}>;
//# sourceMappingURL=product.schema.d.ts.map