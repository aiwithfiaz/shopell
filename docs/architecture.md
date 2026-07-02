# Shopell.com Architecture

## Overview

Shopell.com is a modern ecommerce platform built with a scalable, modular architecture using Next.js App Router, Supabase, and TypeScript.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client (Browser)                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                      │
│                  (CDN, Edge Functions)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Application                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Routes    │  │   Server    │  │    API Routes       │ │
│  │  (Pages)    │  │  Components │  │                     │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Supabase                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │    Auth     │  │  Database   │  │     Storage         │ │
│  │  (JWT)      │  │ (PostgreSQL)│  │  (S3-compatible)    │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Component Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth route group
│   ├── (dashboard)/       # Dashboard route group
│   ├── (shop)/            # Shop route group
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Base UI components (Shadcn)
│   ├── layout/            # Layout components
│   ├── header/            # Header components
│   ├── footer/            # Footer components
│   ├── product/           # Product components
│   ├── cart/              # Cart components
│   └── checkout/          # Checkout components
└── features/              # Feature modules
    ├── auth/
    ├── products/
    ├── cart/
    └── checkout/
```

### State Management

- **Local State**: React useState/useReducer
- **Global State**: Zustand stores
- **Server State**: React Server Components
- **Form State**: React Hook Form

### Styling Strategy

- **Base Styles**: Tailwind CSS
- **Component Styles**: Shadcn UI
- **Theme**: CSS variables + next-themes
- **Animations**: Framer Motion

## Backend Architecture

### API Strategy

1. **Server Components**: Default for data fetching
2. **Server Actions**: For mutations
3. **API Routes**: For external integrations

### Authentication Flow

```
User → Supabase Auth → JWT Token → Middleware → Protected Routes
```

### Database Access

```
Server Component → Prisma Client → PostgreSQL
```

## Database Design

### Core Entities

- **Users**: User accounts and profiles
- **Organizations**: Multi-tenant support
- **Products**: Product catalog
- **Orders**: Order management
- **Payments**: Payment processing
- **Inventory**: Stock management

### Relationships

```
Users ─┬─> Profiles
       ├─> Orders
       ├─> Reviews
       └─> Wishlists

Products ─┬─> Inventory
          ├─> Order Items
          ├─> Reviews
          └─> Variants

Orders ─┬─> Order Items
        ├─> Payments
        └─> Shipping
```

## Security Architecture

### Authentication

- JWT tokens with short expiry
- Refresh token rotation
- Secure HTTP-only cookies
- CSRF protection

### Authorization

- Role-Based Access Control (RBAC)
- Row Level Security (RLS)
- API key authentication
- Rate limiting

### Data Protection

- Input validation (Zod)
- SQL injection prevention (Prisma)
- XSS protection (CSP headers)
- HTTPS enforcement

## Performance Architecture

### Caching Strategy

- **Static Pages**: ISR with revalidation
- **API Responses**: Cache headers
- **Images**: Next/Image optimization
- **Fonts**: next/font optimization

### Optimization Techniques

- Code splitting
- Dynamic imports
- Image lazy loading
- Prefetching
- Bundle analysis

## Deployment Architecture

```
GitHub → Vercel Build → Edge Network → Users
                    ↓
              Supabase Cloud
```

### Environments

- **Development**: Local + Supabase local
- **Preview**: Vercel preview deployments
- **Production**: Vercel production + Supabase production

## Monitoring & Observability

- **Error Tracking**: Sentry
- **Analytics**: Google Analytics 4
- **Performance**: Vercel Analytics
- **Logs**: Supabase Logs

## Scalability Considerations

- **Horizontal**: Vercel auto-scaling
- **Database**: Supabase connection pooling
- **Storage**: Supabase Storage (S3-compatible)
- **CDN**: Vercel Edge Network
