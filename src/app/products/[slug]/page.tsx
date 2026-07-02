'use client'

import * as React from 'react'
import Link from 'next/link'
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  Minus,
  Plus,
  ChevronRight,
  ZoomIn,
  ChevronLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { useCartStore } from '@/hooks/use-cart'

const product = {
  id: 1,
  name: 'Wireless Noise Cancelling Headphones',
  price: 299.99,
  originalPrice: 399.99,
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&h=800&fit=crop',
  ],
  rating: 4.8,
  reviews: 1247,
  category: 'Electronics',
  brand: 'AudioTech',
  sku: 'ATH-NC-001',
  inStock: true,
  stockCount: 15,
  description: `
    Experience crystal-clear audio with our premium Wireless Noise Cancelling Headphones. 
    Featuring advanced Active Noise Cancellation (ANC) technology, these headphones block out 
    external noise so you can focus on what matters - your music.
    
    With up to 30 hours of battery life, quick charge capability, and premium comfort padding, 
    these headphones are perfect for long listening sessions whether you're commuting, working, 
    or relaxing at home.
  `,
  features: [
    'Active Noise Cancellation (ANC)',
    '30-hour battery life',
    'Quick charge: 5 min = 3 hours playback',
    'Premium memory foam ear cushions',
    'Foldable design with carrying case',
    'Bluetooth 5.0 with multipoint connection',
    'Built-in microphone for calls',
    'Touch controls for easy operation',
  ],
  specifications: {
    'Driver Size': '40mm',
    'Frequency Response': '20Hz - 20kHz',
    'Impedance': '32 ohms',
    'Battery Life': 'Up to 30 hours (ANC on)',
    'Charging Time': '2 hours',
    'Weight': '250g',
    'Connectivity': 'Bluetooth 5.0, 3.5mm jack',
    'Color': 'Midnight Black',
  },
}

const relatedProducts = [
  {
    id: 2,
    name: 'Bluetooth Speaker',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 2341,
  },
  {
    id: 3,
    name: 'Wireless Earbuds',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 1890,
  },
  {
    id: 4,
    name: 'Headphone Stand',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 567,
  },
  {
    id: 5,
    name: 'Audio Cable',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 890,
  },
]

const reviews = [
  {
    id: 1,
    author: 'Sarah Johnson',
    rating: 5,
    date: '2026-01-15',
    title: 'Best headphones I\'ve ever owned!',
    comment: 'The noise cancellation is incredible. I use these daily for work and they block out all the office noise. Sound quality is amazing too.',
    verified: true,
  },
  {
    id: 2,
    author: 'Michael Chen',
    rating: 5,
    date: '2026-01-12',
    title: 'Perfect for commuting',
    comment: 'These headphones make my daily commute so much more enjoyable. The battery life is fantastic - I only charge them once a week.',
    verified: true,
  },
  {
    id: 3,
    author: 'Emily Davis',
    rating: 4,
    date: '2026-01-10',
    title: 'Great quality, minor issue',
    comment: 'Sound quality is excellent and the comfort is top-notch. Only giving 4 stars because the touch controls can be a bit sensitive sometimes.',
    verified: true,
  },
]

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [quantity, setQuantity] = React.useState(1)
  const [isWishlisted, setIsWishlisted] = React.useState(false)
  const [isZoomed, setIsZoomed] = React.useState(false)
  const addItem = useCartStore(state => state.addItem)
  const [addedToCart, setAddedToCart] = React.useState(false)

  const handleAddToCart = () => {
    addItem(product as any, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    addItem(product as any, quantity)
    window.location.href = '/checkout'
  }

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % product.images.length)
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/50">
          <div className="container py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/products" className="hover:text-primary">Products</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/products?category=${product.category.toLowerCase()}`} className="hover:text-primary">
                {product.category}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div 
                className="aspect-square rounded-xl bg-muted overflow-hidden relative cursor-zoom-in group"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge className="bg-black/50 text-white backdrop-blur-sm">
                    <ZoomIn className="h-4 w-4 mr-1" /> Click to zoom
                  </Badge>
                </div>
                {/* Navigation Arrows */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage() }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-black"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage() }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-black"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-black/50 text-white backdrop-blur-sm">
                    {selectedImage + 1} / {product.images.length}
                  </Badge>
                </div>
              </div>
              
              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'border-transparent hover:border-muted-foreground/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">{product.brand}</Badge>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-muted-foreground">
                      ({product.reviews.toLocaleString()} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <Badge variant="destructive">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">SKU:</span>
                  <span className="text-muted-foreground">{product.sku}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">Availability:</span>
                  {product.inStock ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      In Stock ({product.stockCount} available)
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-muted"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-muted"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {addedToCart ? 'Added!' : 'Add to Cart'}
                </Button>
                <Button
                  size="lg"
                  variant={isWishlisted ? 'default' : 'outline'}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <Button size="lg" className="w-full" onClick={handleBuyNow}>
                Buy Now
              </Button>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="flex flex-col items-center text-center">
                  <Truck className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm">2 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RotateCcw className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm">30 Day Returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="features">
              <TabsList>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
              </TabsList>
              <TabsContent value="features" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                    <div className="space-y-3">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b last:border-0">
                          <span className="font-medium">{key}</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Customer Reviews</h3>
                    <Button>Write a Review</Button>
                  </div>
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{review.author}</span>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-muted-foreground'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <h4 className="font-medium mb-2">{review.title}</h4>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group">
                  <CardContent className="p-4">
                    <div className="relative aspect-square rounded-lg bg-muted mb-4 overflow-hidden">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium line-clamp-2 mb-2">
                      <Link href={`/products/${relatedProduct.id}`} className="hover:text-primary">
                        {relatedProduct.name}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{relatedProduct.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({relatedProduct.reviews.toLocaleString()})
                      </span>
                    </div>
                    <span className="text-lg font-bold">${relatedProduct.price.toFixed(2)}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Full Screen Image Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 text-white hover:text-white/80 text-4xl"
          >
            ×
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); nextImage() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setSelectedImage(i) }}
                className={`w-3 h-3 rounded-full ${i === selectedImage ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
