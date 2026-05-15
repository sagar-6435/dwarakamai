import { HydratedDocument } from 'mongoose';
export type ServiceDocument = HydratedDocument<Service>;
export declare class Service {
    name: string;
    slug: string;
    description: string;
    price: number;
    duration: string;
    features: string[];
    images: string[];
    category: string;
    featured: boolean;
    active: boolean;
}
export declare const ServiceSchema: import("mongoose").Schema<Service, import("mongoose").Model<Service, any, any, any, import("mongoose").Document<unknown, any, Service> & Service & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Service, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Service>> & import("mongoose").FlatRecord<Service> & {
    _id: import("mongoose").Types.ObjectId;
}>;
//# sourceMappingURL=service.schema.d.ts.map