import { HydratedDocument, Types } from 'mongoose';
export type CartDocument = HydratedDocument<Cart>;
export declare class Cart {
    user: Types.ObjectId;
    items: Array<{
        product: Types.ObjectId;
        quantity: number;
    }>;
    totalPrice: number;
}
export declare const CartSchema: import("mongoose").Schema<Cart, import("mongoose").Model<Cart, any, any, any, import("mongoose").Document<unknown, any, Cart> & Cart & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cart, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Cart>> & import("mongoose").FlatRecord<Cart> & {
    _id: Types.ObjectId;
}>;
//# sourceMappingURL=cart.schema.d.ts.map