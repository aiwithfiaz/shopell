# Shopell.com Deployment Guide

## Overview

This guide covers deploying Shopell.com to production using Vercel and Supabase.

## Prerequisites

- Vercel account
- Supabase account
- GitHub account
- Node.js 18+ installed locally

## Step 1: Supabase Setup

### Create Project

1. Go to [Supabase](https://supabase.com)
2. Click "New Project"
3. Enter project name: `shopell-production`
4. Set database password
5. Choose region closest to your users
6. Click "Create new project"

### Configure Authentication

1. Go to Authentication → Settings
2. Enable Email/Password provider
3. Configure Google OAuth (optional)
4. Set Site URL to your production domain

### Set Up Database

1. Go to SQL Editor
2. Run the migration scripts from `/prisma/migrations/`
3. Enable Row Level Security on all tables

### Configure Storage

1. Go to Storage
2. Create buckets:
   - `product-images` (public)
   - `user-uploads` (private)
   - `documents` (private)

### Get API Keys

1. Go to Settings → API
2. Copy:
   - Project URL
   - Anon public key
   - Service role key (keep secret!)

## Step 2: Vercel Setup

### Import Project

1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import from GitHub
4. Select your Shopell repository

### Configure Build Settings

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Set Environment Variables

Add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=https://shopell.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX
STRIPE_SECRET_KEY=your-stripe-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

### Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Click "Visit" to see your site

## Step 3: Custom Domain

### Add Domain

1. Go to your Vercel project
2. Click "Settings" → "Domains"
3. Add your domain: `shopell.com`
4. Add `www.shopell.com`

### Configure DNS

Add these DNS records:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

### SSL Certificate

Vercel automatically provisions SSL certificates for custom domains.

## Step 4: Post-Deployment

### Verify Deployment

1. Check all pages load correctly
2. Test authentication flows
3. Verify database connections
4. Test payment integrations

### Set Up Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Google Analytics**: Add GA4 measurement ID
3. **Error Tracking**: Configure Sentry (optional)

### Configure Backups

1. Go to Supabase → Database → Backups
2. Enable point-in-time recovery
3. Set up scheduled backups

## Step 5: Production Checklist

- [ ] Environment variables configured
- [ ] Custom domain added
- [ ] SSL certificate active
- [ ] Authentication working
- [ ] Database migrations applied
- [ ] RLS policies enabled
- [ ] Storage buckets configured
- [ ] Email templates customized
- [ ] Error monitoring set up
- [ ] Analytics configured
- [ ] Performance tested
- [ ] Security headers configured

## Troubleshooting

### Build Failures

1. Check build logs in Vercel
2. Verify environment variables
3. Run `npm run build` locally

### Database Connection Issues

1. Check Supabase project status
2. Verify connection string
3. Check IP allowlist

### Authentication Issues

1. Verify Site URL in Supabase
2. Check OAuth redirect URLs
3. Verify JWT secrets

## Rollback Procedure

1. Go to Vercel project
2. Click "Deployments"
3. Find previous working deployment
4. Click "..." → "Promote to Production"

## Support

For deployment issues:
- Vercel: [Vercel Documentation](https://vercel.com/docs)
- Supabase: [Supabase Documentation](https://supabase.com/docs)
