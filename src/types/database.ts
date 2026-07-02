export type UserRole = 'customer' | 'admin' | 'manager'
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
export type CouponType = 'percentage' | 'fixed'
export type ProductStatus = 'active' | 'draft' | 'archived'

export interface Profile {
  id: string
  auth_user_id: string
  full_name: string
  email: string
  phone?: string
  avatar_url?: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Address {
  id: string
  user_id: string
  full_name: string
  phone: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default: boolean
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parent_id?: string
  sort_order: number
  created_at: string
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo?: string
  description?: string
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description?: string
  short_description?: string
  sku?: string
  price: number
  compare_price?: number
  cost_price?: number
  category_id?: string
  brand_id?: string
  stock_quantity: number
  low_stock_threshold: number
  weight?: number
  status: ProductStatus
  featured: boolean
  rating: number
  review_count: number
  sales_count: number
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  alt?: string
  sort_order: number
  created_at: string
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string
  sku?: string
  price: number
  stock_quantity: number
  option1?: string
  option2?: string
  option3?: string
  created_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  variant_id?: string
  quantity: number
  created_at: string
}

export interface Coupon {
  id: string
  code: string
  type: CouponType
  value: number
  minimum_order: number
  maximum_discount?: number
  usage_limit?: number
  usage_count: number
  starts_at?: string
  expires_at?: string
  active: boolean
  created_at: string
}

export interface Order {
  id: string
  user_id?: string
  order_number: string
  email: string
  phone?: string
  shipping_full_name: string
  shipping_address_line1: string
  shipping_address_line2?: string
  shipping_city: string
  shipping_state: string
  shipping_postal_code: string
  shipping_country: string
  billing_same_as_shipping: boolean
  subtotal: number
  shipping_cost: number
  discount_amount: number
  tax_amount: number
  total: number
  coupon_id?: string
  status: OrderStatus
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  variant_id?: string
  name: string
  sku?: string
  price: number
  quantity: number
  total: number
  created_at: string
}

export interface Payment {
  id: string
  order_id: string
  user_id: string
  transaction_id?: string
  payment_method: string
  amount: number
  currency: string
  status: PaymentStatus
  paid_at?: string
  created_at: string
}

export interface Review {
  id: string
  user_id: string
  product_id: string
  rating: number
  title?: string
  comment?: string
  approved: boolean
  created_at: string
}

export interface Wishlist {
  id: string
  user_id: string
  product_id: string
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  read_status: boolean
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content?: string
  excerpt?: string
  image?: string
  author_id?: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface SeoSetting {
  id: string
  page_slug: string
  title?: string
  description?: string
  og_image?: string
  canonical_url?: string
  no_index: boolean
  created_at: string
  updated_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value?: string
  type: string
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile }
      addresses: { Row: Address }
      categories: { Row: Category }
      brands: { Row: Brand }
      products: { Row: Product }
      product_images: { Row: ProductImage }
      product_variants: { Row: ProductVariant }
      cart_items: { Row: CartItem }
      coupons: { Row: Coupon }
      orders: { Row: Order }
      order_items: { Row: OrderItem }
      payments: { Row: Payment }
      reviews: { Row: Review }
      wishlists: { Row: Wishlist }
      notifications: { Row: Notification }
      blog_posts: { Row: BlogPost }
      seo_settings: { Row: SeoSetting }
      site_settings: { Row: SiteSetting }
    }
  }
}