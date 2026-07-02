import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICart extends Document {
  _id: mongoose.Types.ObjectId
  user?: mongoose.Types.ObjectId
  sessionId?: string
  items: {
    product: mongoose.Types.ObjectId
    quantity: number
    variant?: {
      id: string
      name: string
      price: number
    }
  }[]
  couponCode?: string
  discount: number
  createdAt: Date
  updatedAt: Date
}

const CartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    sessionId: { type: String },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1, default: 1 },
        variant: {
          id: { type: String },
          name: { type: String },
          price: { type: Number },
        },
      },
    ],
    couponCode: { type: String },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
)

CartSchema.index({ user: 1 })
CartSchema.index({ sessionId: 1 })

const Cart: Model<ICart> = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema)

export default Cart
