import { EventsService } from './events.service';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    findAll(page?: number, limit?: number, category?: string): Promise<{
        events: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/event.schema").Event> & import("../schemas/event.schema").Event & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/event.schema").Event> & import("../schemas/event.schema").Event & {
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
        event: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/event.schema").Event> & import("../schemas/event.schema").Event & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/event.schema").Event> & import("../schemas/event.schema").Event & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    create(data: any): Promise<{
        message: string;
        event: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/event.schema").Event> & import("../schemas/event.schema").Event & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/event.schema").Event> & import("../schemas/event.schema").Event & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    update(id: string, data: any): Promise<{
        message: string;
        event: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/event.schema").Event> & import("../schemas/event.schema").Event & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../schemas/event.schema").Event> & import("../schemas/event.schema").Event & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=events.controller.d.ts.map