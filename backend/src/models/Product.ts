import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  category: mongoose.Types.ObjectId;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  specifications?: Record<string, string>;
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
    },
    discountPrice: Number,
    stock: {
      type: Number,
      default: 0,
    },
    images: [String],
    specifications: mongoose.Schema.Types.Mixed,
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

export default mongoose.model<IProduct>('Product', productSchema);
