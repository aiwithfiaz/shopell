import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId
  email: string
  password: string
  fullName: string
  avatar?: string
  phone?: string
  role: 'customer' | 'admin' | 'vendor'
  addresses: {
    id: string
    fullName: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
    phone: string
    isDefault: boolean
  }[]
  wishlist: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true, trim: true },
    avatar: { type: String },
    phone: { type: String },
    role: { type: String, enum: ['customer', 'admin', 'vendor'], default: 'customer' },
    addresses: [
      {
        id: { type: String, required: true },
        fullName: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
        isDefault: { type: Boolean, default: false },
      },
    ],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
)

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
