import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IReview extends Document {
  _id: mongoose.Types.ObjectId
  product: mongoose.Types.ObjectId
  user: mongoose.Types.ObjectId
  order?: mongoose.Types.ObjectId
  rating: number
  title?: string
  content?: string
  pros?: string[]
  cons?: string[]
  images?: string[]
  verifiedPurchase: boolean
  helpfulCount: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema = new Schema<IReview>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true },
    content: { type: String },
    pros: [{ type: String }],
    cons: [{ type: String }],
    images: [{ type: String }],
    verifiedPurchase: { type: Boolean, default: false },
    helpfulCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

ReviewSchema.index({ product: 1, user: 1 }, { unique: true })

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema)

export default Review
