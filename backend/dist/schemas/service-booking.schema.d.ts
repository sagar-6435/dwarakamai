import { HydratedDocument, Types } from 'mongoose';
export type ServiceBookingDocument = HydratedDocument<ServiceBooking>;
export declare class ServiceBooking {
    user: Types.ObjectId;
    service: Types.ObjectId;
    bookingDate: Date;
    preferredTime: string;
    status: string;
    notes: string;
    contact: {
        phone: string;
        email: string;
    };
}
export declare const ServiceBookingSchema: import("mongoose").Schema<ServiceBooking, import("mongoose").Model<ServiceBooking, any, any, any, import("mongoose").Document<unknown, any, ServiceBooking> & ServiceBooking & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ServiceBooking, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ServiceBooking>> & import("mongoose").FlatRecord<ServiceBooking> & {
    _id: Types.ObjectId;
}>;
//# sourceMappingURL=service-booking.schema.d.ts.map