import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId
  orderNumber: string
  user: mongoose.Types.ObjectId
  items: {
    product: mongoose.Types.ObjectId
    name: string
    sku: string
    price: number
    quantity: number
    image?: string
  }[]
  shippingAddress: {
    fullName: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
    phone: string
  }
  billingAddress?: {
    fullName: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  subtotal: number
  tax: number
  shippingCost: number
  discount: number
  total: number
  currency: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: string
  shippingMethod: string
  trackingNumber?: string
  carrier?: string
  estimatedDelivery?: Date
  actualDelivery?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        sku: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        image: { type: String },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },
    billingAddress: {
      fullName: { type: String },
      addressLine1: { type: String },
      addressLine2: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: { type: String, required: true },
    shippingMethod: { type: String, required: true },
    trackingNumber: { type: String },
    carrier: { type: String },
    estimatedDelivery: { type: Date },
    actualDelivery: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
)

OrderSchema.index({ user: 1, createdAt: -1 })
OrderSchema.index({ orderNumber: 1 })

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)

export default Order
