import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    findAll(page?: number, limit?: number, category?: string): Promise<{
        products: Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, never>[];
        pagination: {
            total: number;
            pages: number;
            current: number;
        };
    }>;
    findById(id: string): Promise<{
        product: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    create(createProductDto: CreateProductDto): Promise<{
        message: string;
        product: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        message: string;
        product: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Product> & Product & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=products.service.d.ts.map