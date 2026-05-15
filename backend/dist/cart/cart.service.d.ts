import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from '../schemas/cart.schema';
import { ProductDocument } from '../schemas/product.schema';
export declare class CartService {
    private cartModel;
    private productModel;
    constructor(cartModel: Model<CartDocument>, productModel: Model<ProductDocument>);
    getCart(userId: string): Promise<{
        cart: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Cart> & Cart & {
            _id: Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Cart> & Cart & {
            _id: Types.ObjectId;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    addToCart(userId: string, productId: string, quantity: number): Promise<{
        message: string;
        cart: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Cart> & Cart & {
            _id: Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Cart> & Cart & {
            _id: Types.ObjectId;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    updateCartItem(userId: string, productId: string, quantity: number): Promise<{
        message: string;
        cart: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Cart> & Cart & {
            _id: Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Cart> & Cart & {
            _id: Types.ObjectId;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    removeFromCart(userId: string, productId: string): Promise<{
        message: string;
        cart: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Cart> & Cart & {
            _id: Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Cart> & Cart & {
            _id: Types.ObjectId;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    clearCart(userId: string): Promise<{
        message: string;
        cart: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Cart> & Cart & {
            _id: Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Cart> & Cart & {
            _id: Types.ObjectId;
        } & Required<{
            _id: Types.ObjectId;
        }>) | null;
    }>;
    private calculateCartTotal;
}
//# sourceMappingURL=cart.service.d.ts.map