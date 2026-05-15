import { Model } from 'mongoose';
import { Service, ServiceDocument } from '../schemas/service.schema';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
export declare class ServicesService {
    private serviceModel;
    constructor(serviceModel: Model<ServiceDocument>);
    findAll(page?: number, limit?: number, category?: string): Promise<{
        services: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Service> & Service & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Service> & Service & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        pagination: {
            total: number;
            pages: number;
            current: number;
        };
    }>;
    findById(id: string): Promise<{
        service: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Service> & Service & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Service> & Service & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    create(createServiceDto: CreateServiceDto): Promise<{
        message: string;
        service: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Service> & Service & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Service> & Service & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<{
        message: string;
        service: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Service> & Service & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Service> & Service & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=services.service.d.ts.map