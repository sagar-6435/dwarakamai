import { Model } from 'mongoose';
import { ServiceBooking, ServiceBookingDocument } from '../schemas/service-booking.schema';
export declare class ServiceBookingsService {
    private bookingModel;
    constructor(bookingModel: Model<ServiceBookingDocument>);
    findAll(userId: string, isAdmin: boolean, page?: number, limit?: number): Promise<{
        bookings: Omit<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ServiceBooking> & ServiceBooking & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, ServiceBooking> & ServiceBooking & {
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
    create(userId: string, data: any): Promise<{
        message: string;
        booking: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ServiceBooking> & ServiceBooking & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, ServiceBooking> & ServiceBooking & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    update(id: string, data: any): Promise<{
        message: string;
        booking: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ServiceBooking> & ServiceBooking & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, ServiceBooking> & ServiceBooking & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=service-bookings.service.d.ts.map