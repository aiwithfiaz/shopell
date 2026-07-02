import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId
  sku: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  category: string
  subcategory?: string
  brand: string
  tags: string[]
  basePrice: number
  compareAtPrice?: number
  images: string[]
  stock: number
  lowStockThreshold: number
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  variants: {
    id: string
    name: string
    price: number
    stock: number
    attributes: Record<string, string>
  }[]
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  rating: number
  numReviews: number
  seoMetadata: {
    title?: string
    description?: string
    keywords?: string[]
  }
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    sku: { type: String, required: true, unique: true, uppercase: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    category: { type: String, required: true, index: true },
    subcategory: { type: String, index: true },
    brand: { type: String, required: true, index: true },
    tags: [{ type: String }],
    basePrice: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    images: [{ type: String }],
    stock: { type: Number, required: true, min: 0, default: 0 },
    lowStockThreshold: { type: Number, default: 5 },
    weight: { type: Number },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },
    variants: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true, default: 0 },
        attributes: { type: Schema.Types.Mixed },
      },
    ],
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    seoMetadata: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
)

ProductSchema.index({ name: 'text', description: 'text' })

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)

export default Product
