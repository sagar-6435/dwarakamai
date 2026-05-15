import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { ProductDocument } from '../schemas/product.schema';
export declare class OrdersService {
    private orderModel;
    private productModel;
    constructor(orderModel: Model<OrderDocument>, productModel: Model<ProductDocument>);
    private generateOrderNumber;
    findAll(userId: string, isAdmin: boolean, page?: number, limit?: number): Promise<{
        orders: Omit<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Order> & Order & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Order> & Order & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, never>, never>[];
        pagination: {
            total: number;
            pages: number;
            current: number;
        };
    }>;
    findById(id: string, userId: string, isAdmin: boolean): Promise<{
        order: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Order> & Order & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Order> & Order & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    create(userId: string, items: any[], shippingAddress: any, paymentMethod: string): Promise<{
        message: string;
        order: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Order> & Order & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Order> & Order & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    updateStatus(id: string, status?: string, paymentStatus?: string): Promise<{
        message: string;
        order: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Order> & Order & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Order> & Order & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=orders.service.d.ts.map