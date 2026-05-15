import { HydratedDocument } from 'mongoose';
export type EventDocument = HydratedDocument<Event>;
export declare class Event {
    title: string;
    description: string;
    date: Date;
    location: string;
    image: string;
    category: string;
    capacity: number;
    registrations: number;
    featured: boolean;
    active: boolean;
}
export declare const EventSchema: import("mongoose").Schema<Event, import("mongoose").Model<Event, any, any, any, import("mongoose").Document<unknown, any, Event> & Event & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Event, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Event>> & import("mongoose").FlatRecord<Event> & {
    _id: import("mongoose").Types.ObjectId;
}>;
//# sourceMappingURL=event.schema.d.ts.map