import { CartService } from './cart.service';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<{
        cart: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/cart.schema").Cart> & import("../schemas/cart.schema").Cart & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/cart.schema").Cart> & import("../schemas/cart.schema").Cart & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    addToCart(req: any, data: {
        productId: string;
        quantity: number;
    }): Promise<{
        message: string;
        cart: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/cart.schema").Cart> & import("../schemas/cart.schema").Cart & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/cart.schema").Cart> & import("../schemas/cart.schema").Cart & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    updateCartItem(req: any, data: {
        productId: string;
        quantity: number;
    }): Promise<{
        message: string;
        cart: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/cart.schema").Cart> & import("../schemas/cart.schema").Cart & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/cart.schema").Cart> & import("../schemas/cart.schema").Cart & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    removeFromCart(req: any, productId: string): Promise<{
        message: string;
        cart: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/cart.schema").Cart> & import("../schemas/cart.schema").Cart & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/cart.schema").Cart> & import("../schemas/cart.schema").Cart & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    clearCart(req: any): Promise<{
        message: string;
        cart: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/cart.schema").Cart> & import("../schemas/cart.schema").Cart & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/cart.schema").Cart> & import("../schemas/cart.schema").Cart & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>) | null;
    }>;
}
//# sourceMappingURL=cart.controller.d.ts.map