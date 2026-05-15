import { Model } from 'mongoose';
import { Event, EventDocument } from '../schemas/event.schema';
export declare class EventsService {
    private eventModel;
    constructor(eventModel: Model<EventDocument>);
    findAll(page?: number, limit?: number, category?: string): Promise<{
        events: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Event> & Event & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Event> & Event & {
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
        event: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Event> & Event & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Event> & Event & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    create(data: any): Promise<{
        message: string;
        event: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Event> & Event & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Event> & Event & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    update(id: string, data: any): Promise<{
        message: string;
        event: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Event> & Event & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Event> & Event & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=events.service.d.ts.map