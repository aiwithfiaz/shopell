'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const slides = [
  {
    id: 1,
    badge: 'New Collection 2026',
    title: 'Discover Premium Products',
    description: 'Shop the latest trends with confidence. Quality products, fast shipping, and exceptional customer service.',
    cta: 'Shop Now',
    ctaLink: '/products',
    secondaryCta: 'Explore Categories',
    secondaryLink: '/categories',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=600&fit=crop',
    gradient: 'from-blue-600/90 via-blue-500/80 to-indigo-600/90',
    align: 'left' as const,
  },
  {
    id: 2,
    badge: 'Flash Sale - Up to 60% Off',
    title: 'Electronics Deals',
    description: 'Massive savings on top brands. Limited time offer - grab yours before they sell out!',
    cta: 'Shop Electronics',
    ctaLink: '/products?category=Electronics',
    secondaryCta: 'View All Deals',
    secondaryLink: '/products?sale=true',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=600&fit=crop',
    gradient: 'from-purple-600/90 via-pink-500/80 to-rose-600/90',
    align: 'left' as const,
  },
  {
    id: 3,
    badge: 'Free Shipping',
    title: 'Fashion Essentials',
    description: 'Elevate your style with our curated collection. Premium quality at affordable prices.',
    cta: 'Shop Fashion',
    ctaLink: '/products?category=Fashion',
    secondaryCta: 'New Arrivals',
    secondaryLink: '/products?sort=newest',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
    gradient: 'from-emerald-600/90 via-teal-500/80 to-cyan-600/90',
    align: 'left' as const,
  },
  {
    id: 4,
    badge: 'Best Sellers',
    title: 'Home & Living',
    description: 'Transform your space with our home essentials. Create your dream home today.',
    cta: 'Shop Home',
    ctaLink: '/products?category=Home+%26+Garden',
    secondaryCta: 'Inspiration',
    secondaryLink: '/categories',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&h=600&fit=crop',
    gradient: 'from-orange-600/90 via-amber-500/80 to-yellow-600/90',
    align: 'left' as const,
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true)

  React.useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length)
  }

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }

  const slide = slides[currentSlide]

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <div className="absolute inset-0">
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={cn("absolute inset-0 bg-gradient-to-r", s.gradient)} />
        </div>
      ))}

      <div className="relative z-20 container h-full flex items-center">
        <div className="max-w-2xl text-white">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            {slide.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            {slide.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
            {slide.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="bg-white text-gray-900 hover:bg-white/90">
              <Link href={slide.ctaLink}>
                {slide.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <Link href={slide.secondaryLink}>
                {slide.secondaryCta}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentSlide
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            )}
          />
        ))}
      </div>
    </section>
  )
}
