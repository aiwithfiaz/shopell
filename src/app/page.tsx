'use client'

import * as React from 'react'
import Link from 'next/link'
import { 
  ArrowRight, 
  ShoppingCart, 
  Star, 
  Clock, 
  TrendingUp,
  Truck,
  Shield,
  CreditCard,
  Headphones
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { HeroSlider } from '@/components/hero-slider'

const featuredCategories = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop', href: '/products?category=Electronics' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop', href: '/products?category=Fashion' },
  { name: 'Home & Garden', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop', href: '/products?category=Home+%26+Garden' },
  { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop', href: '/products?category=Beauty' },
  { name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8a0621?w=400&h=400&fit=crop', href: '/products?category=Sports' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', href: '/products?category=Accessories' },
]

const trendingProducts = [
  {
    id: 1,
    name: 'Wireless Noise Cancelling Headphones',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 1247,
    badge: 'Best Seller',
    slug: 'wireless-noise-cancelling-headphones',
  },
  {
    id: 2,
    name: 'Smart Watch Pro Series',
    price: 449.99,
    originalPrice: 549.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 892,
    badge: 'New',
    slug: 'smart-watch-pro-series',
  },
  {
    id: 3,
    name: 'Premium Cotton T-Shirt',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 2156,
    badge: 'Sale',
    slug: 'premium-cotton-t-shirt',
  },
  {
    id: 4,
    name: 'Ultra-Slim Laptop Stand',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 567,
    badge: 'Popular',
    slug: 'ultra-slim-laptop-stand',
  },
]

const flashSaleProducts = [
  {
    id: 5,
    name: 'Bluetooth Speaker',
    price: 59.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    discount: 54,
    stock: 15,
    slug: 'bluetooth-speaker',
  },
  {
    id: 6,
    name: 'Fitness Tracker Band',
    price: 39.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop',
    discount: 50,
    stock: 8,
    slug: 'fitness-tracker-band',
  },
  {
    id: 7,
    name: 'Portable Charger',
    price: 29.99,
    originalPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
    discount: 50,
    stock: 23,
    slug: 'portable-charger',
  },
  {
    id: 8,
    name: 'Wireless Mouse',
    price: 24.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    discount: 50,
    stock: 31,
    slug: 'wireless-mouse',
  },
]

const newArrivals = [
  {
    id: 9,
    name: 'Minimalist Desk Lamp',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 89,
    slug: 'minimalist-desk-lamp',
  },
  {
    id: 10,
    name: 'Organic Face Cream',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 234,
    slug: 'organic-face-cream',
  },
  {
    id: 11,
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 456,
    slug: 'stainless-steel-water-bottle',
  },
  {
    id: 12,
    name: 'Canvas Backpack',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 178,
    slug: 'canvas-backpack',
  },
]

const bestSellers = [
  {
    id: 13,
    name: 'Running Shoes Pro',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 3421,
    sold: 15000,
    slug: 'running-shoes-pro',
  },
  {
    id: 14,
    name: 'Denim Jacket Classic',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 2876,
    sold: 12000,
    slug: 'denim-jacket-classic',
  },
  {
    id: 15,
    name: 'Ceramic Coffee Mug Set',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 4532,
    sold: 25000,
    slug: 'ceramic-coffee-mug-set',
  },
  {
    id: 16,
    name: 'Yoga Mat Premium',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 1890,
    sold: 8000,
    slug: 'yoga-mat-premium',
  },
]

const customerReviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'Amazing quality products and super fast shipping! Will definitely order again.',
    product: 'Wireless Headphones',
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    comment: 'Best online shopping experience. The customer service team was very helpful.',
    product: 'Smart Watch',
  },
  {
    id: 3,
    name: 'Emily Davis',
    rating: 4,
    comment: 'Love the product quality. The packaging was also excellent.',
    product: 'Running Shoes',
  },
]

const features = [
  { icon: Truck, title: 'Free Shipping', description: 'On orders over $50' },
  { icon: Shield, title: 'Secure Payment', description: '100% secure checkout' },
  { icon: CreditCard, title: 'Easy Returns', description: '30-day return policy' },
  { icon: Headphones, title: '24/7 Support', description: 'Dedicated customer care' },
]

export default function HomePage() {
  const [timeLeft, setTimeLeft] = React.useState({ hours: 5, minutes: 32, seconds: 15 })

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
        <HeroSlider />

        <section className="border-y bg-muted/50">
          <div className="container py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-center gap-3">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Categories</h2>
              <p className="text-muted-foreground mt-2">Browse our top categories</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products">View All<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredCategories.map((category) => (
              <Link key={category.name} href={category.href} className="group relative aspect-square rounded-xl overflow-hidden">
                <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-white font-medium">{category.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="container py-12 md:py-16 bg-muted/30">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <Clock className="h-8 w-8 text-red-500" />Flash Sale
                </h2>
                <p className="text-muted-foreground mt-2">Limited time offers</p>
              </div>
              <div className="flex gap-2">
                <div className="bg-background rounded-lg px-3 py-2 text-center min-w-[60px]">
                  <p className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</p>
                  <p className="text-xs text-muted-foreground">Hours</p>
                </div>
                <div className="bg-background rounded-lg px-3 py-2 text-center min-w-[60px]">
                  <p className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</p>
                  <p className="text-xs text-muted-foreground">Minutes</p>
                </div>
                <div className="bg-background rounded-lg px-3 py-2 text-center min-w-[60px]">
                  <p className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</p>
                  <p className="text-xs text-muted-foreground">Seconds</p>
                </div>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products?sale=true">View All<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {flashSaleProducts.map((product) => (
              <Card key={product.id} className="group">
                <CardContent className="p-4">
                  <Link href={`/products/${product.slug}`} className="relative aspect-square rounded-lg bg-muted mb-4 block overflow-hidden">
                    <Badge variant="destructive" className="absolute top-2 left-2 z-10">-{product.discount}%</Badge>
                    {product.stock <= 10 && <Badge variant="secondary" className="absolute top-2 right-2 z-10">Only {product.stock} left</Badge>}
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </Link>
                  <h3 className="font-medium line-clamp-2 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-500">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                  </div>
                  <Button className="w-full mt-4" size="sm"><ShoppingCart className="mr-2 h-4 w-4" />Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container py-12 md:py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <TrendingUp className="h-8 w-8 text-primary" />Trending Products
              </h2>
              <p className="text-muted-foreground mt-2">Popular items everyone loves</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products?sort=trending">View All<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingProducts.map((product) => (
              <Card key={product.id} className="group">
                <CardContent className="p-4">
                  <Link href={`/products/${product.slug}`} className="relative aspect-square rounded-lg bg-muted mb-4 block overflow-hidden">
                    <Badge variant="secondary" className="absolute top-2 left-2 z-10">{product.badge}</Badge>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </Link>
                  <h3 className="font-medium line-clamp-2 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /><span className="ml-1 text-sm font-medium">{product.rating}</span></div>
                    <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    {product.originalPrice && <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>}
                  </div>
                  <Button className="w-full mt-4" size="sm"><ShoppingCart className="mr-2 h-4 w-4" />Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container py-12 md:py-16 bg-muted/30">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">New Arrivals</h2>
              <p className="text-muted-foreground mt-2">Fresh finds just for you</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products?sort=newest">View All<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals.map((product) => (
              <Card key={product.id} className="group">
                <CardContent className="p-4">
                  <Link href={`/products/${product.slug}`} className="relative aspect-square rounded-lg bg-muted mb-4 block overflow-hidden">
                    <Badge variant="secondary" className="absolute top-2 left-2 z-10">New</Badge>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </Link>
                  <h3 className="font-medium line-clamp-2 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /><span className="ml-1 text-sm font-medium">{product.rating}</span></div>
                    <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                  </div>
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  <Button className="w-full mt-4" size="sm"><ShoppingCart className="mr-2 h-4 w-4" />Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container py-12 md:py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Best Sellers</h2>
              <p className="text-muted-foreground mt-2">Our most popular products</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products?sort=best-selling">View All<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestSellers.map((product) => (
              <Card key={product.id} className="group">
                <CardContent className="p-4">
                  <Link href={`/products/${product.slug}`} className="relative aspect-square rounded-lg bg-muted mb-4 block overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </Link>
                  <h3 className="font-medium line-clamp-2 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /><span className="ml-1 text-sm font-medium">{product.rating}</span></div>
                    <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{product.sold.toLocaleString()} sold</p>
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  <Button className="w-full mt-4" size="sm"><ShoppingCart className="mr-2 h-4 w-4" />Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container py-12 md:py-16 bg-muted/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">What Our Customers Say</h2>
            <p className="text-muted-foreground mt-2">Trusted by thousands of happy shoppers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {customerReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium text-primary">{review.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="font-medium">{review.name}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">&quot;{review.comment}&quot;</p>
                  <p className="text-sm text-muted-foreground">Purchased: <span className="font-medium">{review.product}</span></p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container py-12 md:py-16">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">Stay in the Loop</h2>
                  <p className="text-primary-foreground/80">Subscribe to our newsletter for exclusive deals, new arrivals, and insider-only discounts.</p>
                </div>
                <div className="flex w-full md:w-auto gap-2">
                  <input type="email" placeholder="Enter your email" className="flex-1 md:w-[300px] rounded-md bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 px-4 py-2" />
                  <Button variant="secondary">Subscribe</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  )
}
