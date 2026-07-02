import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  sku: z.string().min(1, 'SKU is required'),
  description: z.string().optional(),
  short_description: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  brand: z.string().optional(),
  base_price: z.number().positive('Price must be positive'),
  compare_at_price: z.number().positive().optional(),
  stock_quantity: z.number().min(0, 'Stock cannot be negative'),
  weight_kg: z.number().positive().optional(),
  images: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  visibility: z.enum(['public', 'private', 'members-only']).default('public'),
})

export const checkoutSchema = z.object({
  shipping_address: z.object({
    full_name: z.string().min(2, 'Name is required'),
    address_line1: z.string().min(5, 'Address is required'),
    address_line2: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    postal_code: z.string().min(3, 'Postal code is required'),
    country: z.string().min(2, 'Country is required'),
    phone_number: z.string().min(10, 'Phone number is required'),
  }),
  billing_address: z.object({
    full_name: z.string().min(2, 'Name is required'),
    address_line1: z.string().min(5, 'Address is required'),
    address_line2: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    postal_code: z.string().min(3, 'Postal code is required'),
    country: z.string().min(2, 'Country is required'),
  }).optional(),
  shipping_method: z.string().min(1, 'Shipping method is required'),
  payment_method: z.string().min(1, 'Payment method is required'),
  same_as_billing: z.boolean().default(true),
})

export const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone_number: z.string().optional(),
  company_name: z.string().optional(),
  preferred_currency: z.string().default('USD'),
  language_preference: z.string().default('en'),
  marketing_consent: z.boolean().default(false),
})

export const addressSchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  address_line1: z.string().min(5, 'Address is required'),
  address_line2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postal_code: z.string().min(3, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
  phone_number: z.string().min(10, 'Phone number is required'),
  is_default: z.boolean().default(false),
})

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(3, 'Title must be at least 3 characters').optional(),
  content: z.string().min(10, 'Review must be at least 10 characters').optional(),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
})

export const couponSchema = z.object({
  code: z.string().min(3, 'Coupon code must be at least 3 characters'),
  description: z.string().optional(),
  discount_type: z.enum(['percentage', 'fixed']),
  discount_value: z.number().positive('Discount must be positive'),
  min_purchase: z.number().positive().optional(),
  max_uses: z.number().positive().optional(),
  start_date: z.string(),
  end_date: z.string(),
})

export const categorySchema = z.object({
  name: z.string().min(2, 'Category name is required'),
  slug: z.string().min(2, 'Slug is required'),
  description: z.string().optional(),
  image: z.string().optional(),
  parent_id: z.string().uuid().optional(),
  sort_order: z.number().min(0).default(0),
  is_active: z.boolean().default(true),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type ProductInput = z.infer<typeof productSchema>
export type CheckoutInput = z.infer<typeof checkoutSchema>
export type ProfileInput = z.infer<typeof profileSchema>
export type AddressInput = z.infer<typeof addressSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type CouponInput = z.infer<typeof couponSchema>
export type CategoryInput = z.infer<typeof categorySchema>
