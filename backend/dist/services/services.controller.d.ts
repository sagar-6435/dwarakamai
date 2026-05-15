import { ServicesService } from './services.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
export declare class ServicesController {
    private servicesService;
    constructor(servicesService: ServicesService);
    findAll(page?: number, limit?: number, category?: string): Promise<{
        services: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/service.schema").Service> & import("../schemas/service.schema").Service & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/service.schema").Service> & import("../schemas/service.schema").Service & {
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
        service: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/service.schema").Service> & import("../schemas/service.schema").Service & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/service.schema").Service> & import("../schemas/service.schema").Service & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    create(createServiceDto: CreateServiceDto): Promise<{
        message: string;
        service: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/service.schema").Service> & import("../schemas/service.schema").Service & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/service.schema").Service> & import("../schemas/service.schema").Service & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<{
        message: string;
        service: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/service.schema").Service> & import("../schemas/service.schema").Service & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/service.schema").Service> & import("../schemas/service.schema").Service & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=services.controller.d.ts.map