import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    findAll(page?: number, limit?: number, category?: string): Promise<{
        products: Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/product.schema").Product> & import("../schemas/product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/product.schema").Product> & import("../schemas/product.schema").Product & {
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
        product: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/product.schema").Product> & import("../schemas/product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/product.schema").Product> & import("../schemas/product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    create(createProductDto: CreateProductDto): Promise<{
        message: string;
        product: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/product.schema").Product> & import("../schemas/product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/product.schema").Product> & import("../schemas/product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        message: string;
        product: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/product.schema").Product> & import("../schemas/product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/product.schema").Product> & import("../schemas/product.schema").Product & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=products.controller.d.ts.map