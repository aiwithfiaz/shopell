'use client'

import Link from 'next/link'
import { ChevronRight, Users, Target, Award, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'

const values = [
  {
    icon: Users,
    title: 'Customer First',
    description: 'Every decision we make starts with our customers. Their satisfaction is our success.',
  },
  {
    icon: Target,
    title: 'Quality Products',
    description: 'We curate only the best products from trusted brands and suppliers.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything from product quality to customer service.',
  },
  {
    icon: Heart,
    title: 'Community',
    description: 'Building a community of happy shoppers who share our passion for quality.',
  },
]

const stats = [
  { label: 'Happy Customers', value: '50,000+' },
  { label: 'Products Sold', value: '500,000+' },
  { label: '5-Star Reviews', value: '25,000+' },
  { label: 'Countries Served', value: '50+' },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-16">
          <div className="container">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">About Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Shopell</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Your trusted destination for premium products and exceptional shopping experiences.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="container py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-muted-foreground">
                Founded in 2026, Shopell was born from a simple idea: everyone deserves access to quality products 
                without the hassle of traditional shopping. We started as a small team of passionate individuals 
                who believed that online shopping should be easy, enjoyable, and trustworthy.
              </p>
              <p className="text-muted-foreground">
                Today, we've grown into a global ecommerce platform serving customers in over 50 countries. 
                Our commitment to quality, affordability, and customer satisfaction remains at the heart of everything we do.
              </p>
              <Button asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
            </div>
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-6xl">🛍️</span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-muted/50 py-16">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-muted-foreground mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="container py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="text-muted-foreground mt-2">What drives us every day</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6 text-center">
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Shopell?</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Join thousands of satisfied customers who have discovered a better way to shop online.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
