'use client'

import * as React from 'react'
import Link from 'next/link'
import { 
  Search, 
  SlidersHorizontal, 
  Grid, 
  List, 
  Star, 
  ShoppingCart,
  ChevronDown,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'

const products = [
  {
    id: 1,
    name: 'Wireless Noise Cancelling Headphones',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 1247,
    category: 'Electronics',
    brand: 'AudioTech',
    slug: 'wireless-noise-cancelling-headphones',
    inStock: true,
  },
  {
    id: 2,
    name: 'Smart Watch Pro Series',
    price: 449.99,
    originalPrice: 549.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 892,
    category: 'Electronics',
    brand: 'TechWear',
    slug: 'smart-watch-pro-series',
    inStock: true,
  },
  {
    id: 3,
    name: 'Premium Cotton T-Shirt',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 2156,
    category: 'Fashion',
    brand: 'StyleCo',
    slug: 'premium-cotton-t-shirt',
    inStock: true,
  },
  {
    id: 4,
    name: 'Ultra-Slim Laptop Stand',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 567,
    category: 'Accessories',
    brand: 'ErgoDesign',
    slug: 'ultra-slim-laptop-stand',
    inStock: true,
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    price: 59.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 2341,
    category: 'Electronics',
    brand: 'SoundMax',
    slug: 'bluetooth-speaker',
    inStock: true,
  },
  {
    id: 6,
    name: 'Fitness Tracker Band',
    price: 39.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 1890,
    category: 'Electronics',
    brand: 'FitLife',
    slug: 'fitness-tracker-band',
    inStock: true,
  },
  {
    id: 7,
    name: 'Portable Charger',
    price: 29.99,
    originalPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 3456,
    category: 'Electronics',
    brand: 'PowerUp',
    slug: 'portable-charger',
    inStock: true,
  },
  {
    id: 8,
    name: 'Wireless Mouse',
    price: 24.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 2789,
    category: 'Accessories',
    brand: 'ClickTech',
    slug: 'wireless-mouse',
    inStock: true,
  },
  {
    id: 9,
    name: 'Running Shoes Pro',
    price: 129.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 3421,
    category: 'Sports',
    brand: 'FitLife',
    slug: 'running-shoes-pro',
    inStock: true,
  },
  {
    id: 10,
    name: 'Denim Jacket Classic',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 2876,
    category: 'Fashion',
    brand: 'StyleCo',
    slug: 'denim-jacket-classic',
    inStock: true,
  },
  {
    id: 11,
    name: 'Ceramic Coffee Mug Set',
    price: 39.99,
    originalPrice: 54.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 4532,
    category: 'Home & Garden',
    brand: 'HomeStyle',
    slug: 'ceramic-coffee-mug-set',
    inStock: true,
  },
  {
    id: 12,
    name: 'Yoga Mat Premium',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 1890,
    category: 'Sports',
    brand: 'FitLife',
    slug: 'yoga-mat-premium',
    inStock: true,
  },
]

const categories = [
  'All Categories',
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Beauty',
  'Sports',
  'Accessories',
]

const brands = [
  'All Brands',
  'AudioTech',
  'TechWear',
  'StyleCo',
  'ErgoDesign',
  'SoundMax',
  'FitLife',
  'PowerUp',
  'ClickTech',
  'HomeStyle',
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('All Categories')
  const [selectedBrand, setSelectedBrand] = React.useState('All Brands')
  const [sortBy, setSortBy] = React.useState('featured')
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')
  const [priceRange, setPriceRange] = React.useState([0, 1000])
  const [isFilterOpen, setIsFilterOpen] = React.useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory
    const matchesBrand = selectedBrand === 'All Brands' || product.brand === selectedBrand
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <div className="border-b bg-muted/50">
          <div className="container py-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <span className="text-foreground">Products</span>
            </div>
            <h1 className="text-3xl font-bold">All Products</h1>
            <p className="text-muted-foreground mt-2">
              Showing {filteredProducts.length} results
            </p>
          </div>
        </div>

        <div className="container py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-6">
                    {/* Search */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Search</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Brand */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Brand</label>
                      <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {brands.map((brand) => (
                            <SelectItem key={brand} value={brand}>
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={1000}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-[280px] flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Brand */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Brand</label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={1000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('All Categories')
                    setSelectedBrand('All Brands')
                    setPriceRange([0, 1000])
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="best-selling">Best Selling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Products */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found matching your criteria.</p>
                </div>
              ) : (
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }>
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="group">
                      <CardContent className="p-4">
                        <Link href={`/products/${product.slug || product.id}`} className={
                          viewMode === 'grid'
                            ? 'relative aspect-square rounded-lg bg-muted mb-4 block overflow-hidden'
                            : 'relative flex gap-4'
                        }>
                          {product.originalPrice > product.price && (
                            <Badge variant="destructive" className="absolute top-2 left-2 z-10">
                              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                            </Badge>
                          )}
                          <img
                            src={product.image}
                            alt={product.name}
                            className={
                              viewMode === 'grid'
                                ? 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                : 'h-32 w-32 flex-shrink-0 rounded-lg object-cover'
                            }
                          />
                        </Link>
                        <div className={viewMode === 'list' ? 'flex-1' : ''}>
                          <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                          <h3 className="font-medium line-clamp-2 mb-2">
                            <Link href={`/products/${product.slug || product.id}`} className="hover:text-primary">
                              {product.name}
                            </Link>
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="ml-1 text-sm font-medium">{product.rating}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              ({product.reviews.toLocaleString()})
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-lg font-bold">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <Button className="w-full" size="sm">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button variant="outline" size="icon" disabled>
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </Button>
                <Button variant="default" size="icon">1</Button>
                <Button variant="outline" size="icon">2</Button>
                <Button variant="outline" size="icon">3</Button>
                <Button variant="outline" size="icon">
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
