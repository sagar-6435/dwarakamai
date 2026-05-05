import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  location: string;

  @Prop()
  image: string;

  @Prop()
  category: string;

  @Prop()
  capacity: number;

  @Prop({ default: 0 })
  registrations: number;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: true })
  active: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);
