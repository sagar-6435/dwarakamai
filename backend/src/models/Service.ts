import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  images: string[];
  category: string;
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: String,
    price: Number,
    duration: String,
    features: [String],
    images: [String],
    category: String,
    featured: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IService>('Service', serviceSchema);
