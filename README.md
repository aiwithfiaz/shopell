# Shopell.com - Enterprise Ecommerce Platform

A production-ready enterprise ecommerce platform built with Next.js 15+, TypeScript, Tailwind CSS, and Supabase.

## Features

### Frontend
- **Modern UI**: Built with Shadcn UI components and Tailwind CSS
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Dark/Light Theme**: System preference detection with manual toggle
- **Animations**: Smooth transitions with Framer Motion
- **SEO Optimized**: Dynamic metadata, Schema.org, XML sitemaps

### Backend
- **Next.js App Router**: Modern React patterns with Server Components
- **Server Actions**: Type-safe server-side mutations
- **Prisma ORM**: Type-safe database queries
- **Supabase**: Authentication, database, storage, and real-time

### Authentication
- Email/Password authentication
- Google OAuth
- Role-based access control (RBAC)
- Secure session management

### Ecommerce Features
- Product catalog with categories and filters
- Shopping cart with persistence
- Checkout flow with multiple payment options
- Order management and tracking
- User dashboard with profile, orders, wishlist
- Admin dashboard with analytics

### Database
- PostgreSQL with Supabase
- Row Level Security (RLS)
- Real-time subscriptions
- Automated backups

## Tech Stack

- **Frontend**: Next.js 15+, React 19, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-repo/shopell.git
cd shopell
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your Supabase project and update `.env.local`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

### Database Setup

1. Create a Supabase project
2. Run the Prisma migrations:
```bash
npx prisma migrate dev
```

3. Seed the database:
```bash
npx prisma db seed
```

## Project Structure

```
shopell/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── ui/          # Shadcn UI components
│   │   ├── header/      # Header components
│   │   ├── footer/      # Footer components
│   │   └── ...
│   ├── features/        # Feature-based modules
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── types/           # TypeScript types
│   └── services/        # API services
├── prisma/              # Prisma schema and migrations
├── public/              # Static assets
├── .agents/             # AI agent configurations
└── skills/              # Development skill guides
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

### Code Quality

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

## Testing

- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright
- **API Tests**: Jest + Supertest

Run tests:
```bash
npm run test
npm run test:e2e
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Start the server:
```bash
npm run start
```

## Environment Variables

See `.env.example` for all required environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@shopell.com or join our Slack channel.
