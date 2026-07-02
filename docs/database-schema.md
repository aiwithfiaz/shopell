# Shopell.com Database Schema

## Overview

This document describes the PostgreSQL database schema for Shopell.com, implemented using Prisma ORM with Supabase.

## Entity Relationship Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   profiles  │     │organizations│     │ org_members  │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │                   └───────────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   products  │────▶│  inventory  │     │   reviews   │
└──────┬──────┘     └─────────────┘     └──────┬──────┘
       │                                       │
       ▼                                       │
┌─────────────┐     ┌─────────────┐            │
│   orders    │────▶│   payments  │            │
└──────┬──────┘     └─────────────┘            │
       │                                       │
       ▼                                       │
┌─────────────┐     ┌─────────────┐            │
│ order_items │     │   carts     │            │
└─────────────┘     └─────────────┘            │
                                               │
       ┌───────────────────────────────────────┘
       ▼
┌─────────────┐
│audit_logs   │
└─────────────┘
```

## Table Definitions

### profiles
Extends Supabase auth.users with additional user data.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (references auth.users) |
| email | TEXT | User email (unique) |
| full_name | TEXT | User's full name |
| avatar_url | TEXT | Profile picture URL |
| phone_number | TEXT | Phone number |
| user_type | TEXT | customer, vendor, or admin |
| company_name | TEXT | Company name (optional) |
| billing_address | JSONB | Billing address |
| shipping_address | JSONB | Default shipping address |
| preferred_currency | TEXT | Default currency |
| language_preference | TEXT | Language preference |
| marketing_consent | BOOLEAN | Email marketing opt-in |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### organizations
Multi-tenant organization support.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Organization name |
| slug | TEXT | URL-friendly name (unique) |
| logo_url | TEXT | Organization logo |
| primary_contact_email | TEXT | Contact email |
| billing_email | TEXT | Billing email |
| subscription_tier | TEXT | Subscription plan |
| subscription_status | TEXT | Active, cancelled, etc. |
| settings | JSONB | Organization settings |
| metadata | JSONB | Additional data |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |
| deleted_at | TIMESTAMPTZ | Soft delete timestamp |

### org_members
Organization membership and roles.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| organization_id | UUID | References organizations |
| user_id | UUID | References auth.users |
| role | TEXT | owner, admin, member, viewer |
| permissions | JSONB | Custom permissions |
| joined_at | TIMESTAMPTZ | Join timestamp |
| invited_by | UUID | References auth.users |
| status | TEXT | active, pending, suspended |

### products
Product catalog.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| organization_id | UUID | References organizations |
| sku | TEXT | Stock keeping unit (unique) |
| name | TEXT | Product name |
| description | TEXT | Full description |
| short_description | TEXT | Brief description |
| category | TEXT | Product category |
| subcategory | TEXT | Product subcategory |
| brand | TEXT | Brand name |
| tags | TEXT[] | Search tags |
| variants | JSONB | Product variants |
| attributes | JSONB | Custom attributes |
| base_price | DECIMAL | Base price |
| compare_at_price | DECIMAL | Original price (for sales) |
| cost_per_unit | DECIMAL | Cost price |
| margin_percentage | DECIMAL | Profit margin |
| stock_quantity | INTEGER | Available stock |
| low_stock_threshold | INTEGER | Low stock alert level |
| weight_kg | DECIMAL | Product weight |
| dimensions | JSONB | Product dimensions |
| images | TEXT[] | Image URLs |
| video_urls | TEXT[] | Video URLs |
| seo_metadata | JSONB | SEO data |
| status | TEXT | draft, published, archived |
| visibility | TEXT | public, private, members-only |
| created_by | UUID | References auth.users |
| updated_by | UUID | References auth.users |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |
| deleted_at | TIMESTAMPTZ | Soft delete timestamp |

### inventory
Inventory tracking per product.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| product_id | UUID | References products |
| warehouse_id | UUID | Warehouse location |
| location | TEXT | Storage location |
| quantity | INTEGER | Total quantity |
| reserved_quantity | INTEGER | Reserved for orders |
| available_quantity | INTEGER | Computed: quantity - reserved |
| reorder_point | INTEGER | Reorder threshold |
| reorder_quantity | INTEGER | Quantity to reorder |
| last_restocked_at | TIMESTAMPTZ | Last restock date |
| next_restock_date | TIMESTAMPTZ | Scheduled restock |
| supplier_info | JSONB | Supplier details |
| status | TEXT | in_stock, low_stock, out_of_stock |

### orders
Customer orders.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| organization_id | UUID | References organizations |
| order_number | TEXT | Unique order number |
| customer_id | UUID | References profiles |
| guest_email | TEXT | Guest checkout email |
| status | TEXT | pending, processing, shipped, delivered, cancelled |
| payment_status | TEXT | unpaid, paid, refunded, failed |
| fulfillment_status | TEXT | unfulfilled, fulfilled |
| items | JSONB | Order line items |
| subtotal | DECIMAL | Items subtotal |
| tax_amount | DECIMAL | Tax total |
| discount_amount | DECIMAL | Discount total |
| shipping_cost | DECIMAL | Shipping cost |
| total_amount | DECIMAL | Order total |
| currency | TEXT | Currency code |
| shipping_address | JSONB | Delivery address |
| billing_address | JSONB | Billing address |
| shipping_method | TEXT | Shipping method |
| tracking_number | TEXT | Tracking number |
| carrier | TEXT | Shipping carrier |
| estimated_delivery | DATE | Expected delivery |
| actual_delivery | DATE | Actual delivery |
| notes | TEXT | Customer notes |
| internal_notes | TEXT | Admin notes |
| metadata | JSONB | Additional data |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### payments
Payment transactions.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| order_id | UUID | References orders |
| payment_method | TEXT | credit_card, paypal, etc. |
| payment_provider | TEXT | Stripe, PayPal, etc. |
| provider_transaction_id | TEXT | External transaction ID |
| amount | DECIMAL | Payment amount |
| currency | TEXT | Currency code |
| status | TEXT | pending, completed, failed, refunded |
| payment_date | TIMESTAMPTZ | Payment timestamp |
| refund_amount | DECIMAL | Refunded amount |
| refund_reason | TEXT | Reason for refund |
| gateway_response | JSONB | Gateway response data |
| metadata | JSONB | Additional data |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### carts
Shopping cart storage.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | References auth.users |
| session_id | TEXT | Guest session ID |
| items | JSONB | Cart items |
| total_items | INTEGER | Item count |
| total_price | DECIMAL | Cart total |
| currency | TEXT | Currency code |
| coupon_code | TEXT | Applied coupon |
| discount_amount | DECIMAL | Discount amount |
| expires_at | TIMESTAMPTZ | Cart expiration |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### reviews
Product reviews.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| product_id | UUID | References products |
| user_id | UUID | References auth.users |
| order_id | UUID | References orders |
| rating | INTEGER | 1-5 star rating |
| title | TEXT | Review title |
| content | TEXT | Review content |
| pros | TEXT[] | Positive points |
| cons | TEXT[] | Negative points |
| images | TEXT[] | Review images |
| verified_purchase | BOOLEAN | Verified buyer |
| helpful_count | INTEGER | Helpful votes |
| reported | BOOLEAN | Reported flag |
| status | TEXT | pending, approved, rejected |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### audit_logs
System audit trail.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| organization_id | UUID | References organizations |
| user_id | UUID | References auth.users |
| action | TEXT | Action performed |
| resource_type | TEXT | Resource type |
| resource_id | UUID | Resource ID |
| changes | JSONB | Change details |
| ip_address | INET | Client IP |
| user_agent | TEXT | Client user agent |
| metadata | JSONB | Additional data |
| created_at | TIMESTAMPTZ | Creation timestamp |

## Indexes

### Performance Indexes
```sql
-- Products
CREATE INDEX idx_products_organization ON products(organization_id);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);

-- Orders
CREATE INDEX idx_orders_organization ON orders(organization_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_number ON orders(order_number);

-- Inventory
CREATE INDEX idx_inventory_product ON inventory(product_id);
CREATE INDEX idx_inventory_status ON inventory(status);

-- Reviews
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
```

### Full-Text Search
```sql
CREATE INDEX idx_products_search ON products 
USING GIN (to_tsvector('english', name || ' ' || COALESCE(description, '')));
```

## Row Level Security

All tables have RLS enabled with policies for:
- User access to own data
- Organization member access
- Admin access
- Public read access where appropriate

## Triggers

- `handle_new_user`: Creates profile on user signup
- `generate_order_number`: Auto-generates order numbers
- `calculate_order_totals`: Computes order totals
- `update_inventory_on_order`: Manages stock on orders
