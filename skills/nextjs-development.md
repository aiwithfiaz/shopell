# Next.js Development Skill

## Purpose
Guide the development of Next.js applications using the App Router, Server Components, and modern Next.js patterns.

## Rules
1. Use App Router (not Pages Router)
2. Prefer Server Components by default
3. Use 'use client' only when necessary
4. Implement proper loading.tsx and error.tsx
5. Use parallel routes for complex layouts
6. Implement proper metadata for SEO
7. Use Server Actions for mutations

## Best Practices
- Use dynamic routes with [slug] patterns
- Implement proper caching strategies
- Use ISR for static pages with dynamic data
- Implement proper streaming with Suspense
- Use next/image for all images
- Implement proper SEO with generateMetadata
- Use next/font for font optimization

## Implementation Guidelines
- Place pages in `/src/app/`
- Use layout.tsx for shared layouts
- Implement loading.tsx for loading states
- Use error.tsx for error boundaries
- Create API routes in `/src/app/api/`
- Use Server Actions for form submissions
- Implement proper middleware for auth
