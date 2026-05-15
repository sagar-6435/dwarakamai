import { ServiceBookingsService } from './service-bookings.service';
export declare class ServiceBookingsController {
    private bookingsService;
    constructor(bookingsService: ServiceBookingsService);
    findAll(req: any, page?: number, limit?: number): Promise<{
        bookings: Omit<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/service-booking.schema").ServiceBooking> & import("../schemas/service-booking.schema").ServiceBooking & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/service-booking.schema").ServiceBooking> & import("../schemas/service-booking.schema").ServiceBooking & {
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
    create(req: any, data: any): Promise<{
        message: string;
        booking: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/service-booking.schema").ServiceBooking> & import("../schemas/service-booking.schema").ServiceBooking & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/service-booking.schema").ServiceBooking> & import("../schemas/service-booking.schema").ServiceBooking & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    update(id: string, data: any): Promise<{
        message: string;
        booking: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/service-booking.schema").ServiceBooking> & import("../schemas/service-booking.schema").ServiceBooking & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/service-booking.schema").ServiceBooking> & import("../schemas/service-booking.schema").ServiceBooking & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=service-bookings.controller.d.ts.map