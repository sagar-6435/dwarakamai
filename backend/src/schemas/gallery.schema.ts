import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GalleryDocument = HydratedDocument<Gallery>;

@Schema({ timestamps: true })
export class Gallery {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop()
  category: string;

  @Prop({ default: 0 })
  displayOrder: number;

  @Prop({ default: true })
  active: boolean;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
