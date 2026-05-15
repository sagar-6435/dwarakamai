import { OrdersService } from './orders.service';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    findAll(req: any, page?: number, limit?: number): Promise<{
        orders: Omit<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/order.schema").Order> & import("../schemas/order.schema").Order & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/order.schema").Order> & import("../schemas/order.schema").Order & {
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
    findById(id: string, req: any): Promise<{
        order: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/order.schema").Order> & import("../schemas/order.schema").Order & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/order.schema").Order> & import("../schemas/order.schema").Order & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    create(req: any, data: {
        items: any[];
        shippingAddress: any;
        paymentMethod: string;
    }): Promise<{
        message: string;
        order: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/order.schema").Order> & import("../schemas/order.schema").Order & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/order.schema").Order> & import("../schemas/order.schema").Order & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    updateStatus(id: string, data: {
        status?: string;
        paymentStatus?: string;
    }): Promise<{
        message: string;
        order: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/order.schema").Order> & import("../schemas/order.schema").Order & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/order.schema").Order> & import("../schemas/order.schema").Order & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=orders.controller.d.ts.map