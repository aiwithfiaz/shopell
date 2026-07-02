'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronRight, Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    details: ['support@shopell.com', 'sales@shopell.com'],
  },
  {
    icon: Phone,
    title: 'Phone',
    details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
  },
  {
    icon: MapPin,
    title: 'Address',
    details: ['123 Commerce Street', 'New York, NY 10001'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Mon - Fri: 9AM - 6PM', 'Sat: 10AM - 4PM'],
  },
]

export default function ContactPage() {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    alert('Message sent successfully!')
  }

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
              <span className="text-foreground">Contact</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        <div className="container py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
                <p className="text-muted-foreground">
                  We're here to help and answer any questions you might have.
                </p>
              </div>
              
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{info.title}</h3>
                      {info.details.map((detail, index) => (
                        <p key={index} className="text-sm text-muted-foreground">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name *
                        </label>
                        <Input id="name" placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email *
                        </label>
                        <Input id="email" type="email" placeholder="john@example.com" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject *
                      </label>
                      <Input id="subject" placeholder="How can we help?" required />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        placeholder="Tell us more about your inquiry..."
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" disabled={isLoading}>
                      {isLoading ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="bg-muted/50 py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="text-muted-foreground mt-2">Quick answers to common questions</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  question: 'How long does shipping take?',
                  answer: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days.',
                },
                {
                  question: 'What is your return policy?',
                  answer: 'We offer a 30-day return policy for all unused items in their original packaging.',
                },
                {
                  question: 'Do you ship internationally?',
                  answer: 'Yes! We ship to over 50 countries worldwide. Shipping rates vary by location.',
                },
                {
                  question: 'How can I track my order?',
                  answer: 'Once your order ships, you\'ll receive an email with a tracking number to monitor your delivery.',
                },
              ].map((faq) => (
                <Card key={faq.question}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
