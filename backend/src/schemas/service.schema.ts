import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ServiceDocument = HydratedDocument<Service>;

@Schema({ timestamps: true })
export class Service {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  slug: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  duration: string;

  @Prop([String])
  features: string[];

  @Prop([String])
  images: string[];

  @Prop()
  category: string;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: true })
  active: boolean;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
