import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ServiceBookingDocument = HydratedDocument<ServiceBooking>;

@Schema({ timestamps: true })
export class ServiceBooking {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Service', required: true })
  service: Types.ObjectId;

  @Prop({ required: true })
  bookingDate: Date;

  @Prop()
  preferredTime: string;

  @Prop({ enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' })
  status: string;

  @Prop()
  notes: string;

  @Prop({
    type: {
      phone: String,
      email: String,
    },
  })
  contact: {
    phone: string;
    email: string;
  };
}

export const ServiceBookingSchema = SchemaFactory.createForClass(ServiceBooking);
