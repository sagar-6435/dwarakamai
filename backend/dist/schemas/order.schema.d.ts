import { HydratedDocument, Types } from 'mongoose';
export type OrderDocument = HydratedDocument<Order>;
export declare class Order {
    orderNumber: string;
    customer: Types.ObjectId;
    items: Array<{
        product: Types.ObjectId;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    discountAmount: number;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        phone: string;
    };
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    notes: string;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, import("mongoose").Document<unknown, any, Order> & Order & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Order>> & import("mongoose").FlatRecord<Order> & {
    _id: Types.ObjectId;
}>;
//# sourceMappingURL=order.schema.d.ts.map