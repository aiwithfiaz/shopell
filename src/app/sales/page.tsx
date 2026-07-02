'use client'

import * as React from 'react'
import Link from 'next/link'
import { 
  ShoppingCart, 
  Star, 
  Clock, 
  Flame, 
  Tag, 
  ArrowRight,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'

const saleProducts = [
  {
    id: 1,
    name: 'Wireless Noise Cancelling Headphones',
    price: 149.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 1247,
    badge: '63% OFF',
    slug: 'wireless-noise-cancelling-headphones',
    category: 'Electronics',
    sold: 2341,
  },
  {
    id: 2,
    name: 'Smart Watch Pro Series',
    price: 199.99,
    originalPrice: 549.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 892,
    badge: '64% OFF',
    slug: 'smart-watch-pro-series',
    category: 'Electronics',
    sold: 1567,
  },
  {
    id: 3,
    name: 'Running Shoes Pro',
    price: 59.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 3421,
    badge: '67% OFF',
    slug: 'running-shoes-pro',
    category: 'Sports',
    sold: 5234,
  },
  {
    id: 4,
    name: 'Denim Jacket Classic',
    price: 49.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 2876,
    badge: '62% OFF',
    slug: 'denim-jacket-classic',
    category: 'Fashion',
    sold: 3456,
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    price: 29.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 2341,
    badge: '77% OFF',
    slug: 'bluetooth-speaker',
    category: 'Electronics',
    sold: 8765,
  },
  {
    id: 6,
    name: 'Premium Cotton T-Shirt',
    price: 19.99,
    originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 2156,
    badge: '71% OFF',
    slug: 'premium-cotton-t-shirt',
    category: 'Fashion',
    sold: 12345,
  },
  {
    id: 7,
    name: 'Yoga Mat Premium',
    price: 24.99,
    originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 1890,
    badge: '64% OFF',
    slug: 'yoga-mat-premium',
    category: 'Sports',
    sold: 4567,
  },
  {
    id: 8,
    name: 'Ceramic Coffee Mug Set',
    price: 19.99,
    originalPrice: 54.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 4532,
    badge: '64% OFF',
    slug: 'ceramic-coffee-mug-set',
    category: 'Home & Garden',
    sold: 9876,
  },
  {
    id: 9,
    name: 'Canvas Backpack',
    price: 34.99,
    originalPrice: 89.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 1780,
    badge: '61% OFF',
    slug: 'canvas-backpack',
    category: 'Accessories',
    sold: 6543,
  },
  {
    id: 10,
    name: 'Organic Face Cream',
    price: 14.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 2340,
    badge: '70% OFF',
    slug: 'organic-face-cream',
    category: 'Beauty',
    sold: 3210,
  },
  {
    id: 11,
    name: 'Fitness Tracker Band',
    price: 19.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 1890,
    badge: '75% OFF',
    slug: 'fitness-tracker-band',
    category: 'Electronics',
    sold: 7654,
  },
  {
    id: 12,
    name: 'Stainless Steel Water Bottle',
    price: 12.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 4560,
    badge: '63% OFF',
    slug: 'stainless-steel-water-bottle',
    category: 'Accessories',
    sold: 11234,
  },
]

const flashDeals = saleProducts.filter(p => parseFloat(p.badge) >= 70)

export default function SalesPage() {
  const [timeLeft, setTimeLeft] = React.useState({ hours: 23, minutes: 59, seconds: 59 })

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        else if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        else if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 text-white">
          <div className="container py-12 md:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                <Flame className="h-3 w-3 mr-1" />
                Limited Time Offer
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Mega Sale Event
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Up to 77% off on thousands of products. Don&apos;t miss out on these incredible deals!
              </p>
              <div className="flex justify-center gap-4 mb-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 text-center min-w-[80px]">
                  <p className="text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</p>
                  <p className="text-xs text-white/80">Hours</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 text-center min-w-[80px]">
                  <p className="text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</p>
                  <p className="text-xs text-white/80">Minutes</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 text-center min-w-[80px]">
                  <p className="text-3xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</p>
                  <p className="text-xs text-white/80">Seconds</p>
                </div>
              </div>
              <Button size="lg" className="bg-white text-red-600 hover:bg-white/90" asChild>
                <Link href="#deals">
                  Shop All Deals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Flash Deals - 70%+ Off */}
        <section className="container py-12 md:py-16" id="flash-deals">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Zap className="h-8 w-8 text-yellow-500" />
                Flash Deals - 70%+ Off
              </h2>
              <p className="text-muted-foreground mt-2">Extreme discounts on top products</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {flashDeals.map((product) => (
              <Card key={product.id} className="group">
                <CardContent className="p-4">
                  <Link href={`/products/${product.slug}`} className="relative aspect-square rounded-lg bg-muted mb-4 block overflow-hidden">
                    <Badge variant="destructive" className="absolute top-2 left-2 z-10">
                      <Flame className="h-3 w-3 mr-1" />
                      {product.badge}
                    </Badge>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </Link>
                  <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="font-medium line-clamp-2 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /><span className="ml-1 text-sm font-medium">{product.rating}</span></div>
                    <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-red-500">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-3">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.min(100, (product.sold / (product.sold + 500)) * 100)}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{product.sold.toLocaleString()} sold</p>
                  <Button className="w-full" size="sm"><ShoppingCart className="mr-2 h-4 w-4" />Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Deals */}
        <section className="container py-12 md:py-16 bg-muted/30" id="deals">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Tag className="h-8 w-8 text-primary" />
                All Sale Items
              </h2>
              <p className="text-muted-foreground mt-2">{saleProducts.length} products on sale</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {saleProducts.map((product) => (
              <Card key={product.id} className="group">
                <CardContent className="p-4">
                  <Link href={`/products/${product.slug}`} className="relative aspect-square rounded-lg bg-muted mb-4 block overflow-hidden">
                    <Badge variant="destructive" className="absolute top-2 left-2 z-10">{product.badge}</Badge>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </Link>
                  <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="font-medium line-clamp-2 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /><span className="ml-1 text-sm font-medium">{product.rating}</span></div>
                    <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-red-500">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                  </div>
                  <Button className="w-full" size="sm"><ShoppingCart className="mr-2 h-4 w-4" />Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="container py-12 md:py-16">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Don&apos;t Miss Out!</h2>
              <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
                These deals won&apos;t last forever. Shop now and save big on your favorite products. 
                New deals are added every day!
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/products">
                  Browse All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  )
}
