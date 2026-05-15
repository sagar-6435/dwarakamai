import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/category.schema").Category> & import("../schemas/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("../schemas/category.schema").Category> & import("../schemas/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findById(id: string): Promise<{
        category: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/category.schema").Category> & import("../schemas/category.schema").Category & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/category.schema").Category> & import("../schemas/category.schema").Category & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    create(createCategoryDto: CreateCategoryDto): Promise<{
        message: string;
        category: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/category.schema").Category> & import("../schemas/category.schema").Category & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/category.schema").Category> & import("../schemas/category.schema").Category & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        message: string;
        category: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/category.schema").Category> & import("../schemas/category.schema").Category & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/category.schema").Category> & import("../schemas/category.schema").Category & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=categories.controller.d.ts.map