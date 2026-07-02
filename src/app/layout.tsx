import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { AuthProvider } from '@/components/auth-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Shopell - Premium Ecommerce Platform',
    template: '%s | Shopell',
  },
  description: 'Discover premium products at Shopell. Shop electronics, fashion, home goods, and more with fast shipping and excellent customer service.',
  keywords: ['ecommerce', 'online shopping', 'shop', 'buy online', 'shopell'],
  authors: [{ name: 'Shopell' }],
  creator: 'Shopell',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shopell.com',
    siteName: 'Shopell',
    title: 'Shopell - Premium Ecommerce Platform',
    description: 'Discover premium products at Shopell. Shop electronics, fashion, home goods, and more.',
    images: [
      {
        url: 'https://shopell.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shopell',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopell - Premium Ecommerce Platform',
    description: 'Discover premium products at Shopell. Shop electronics, fashion, home goods, and more.',
    images: ['https://shopell.com/og-image.jpg'],
    creator: '@shopell',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
