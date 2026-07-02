'use client'

import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { Truck, Package, Clock, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const shippingMethods = [
  {
    icon: Truck,
    title: 'Standard Shipping',
    time: '5-7 business days',
    price: 'Free on orders over $50',
    description: 'Our standard shipping option delivers your order within 5-7 business days. Available for all domestic addresses.',
  },
  {
    icon: Package,
    title: 'Express Shipping',
    time: '2-3 business days',
    price: '$9.99',
    description: 'Need it faster? Express shipping ensures delivery within 2-3 business days for an additional fee.',
  },
  {
    icon: Clock,
    title: 'Next Day Delivery',
    time: '1 business day',
    price: '$19.99',
    description: 'Order before 2 PM and receive your package the next business day. Available in select metro areas.',
  },
  {
    icon: Globe,
    title: 'International Shipping',
    time: '7-14 business days',
    price: 'Starting at $14.99',
    description: 'We ship to over 50 countries worldwide. International shipping rates vary by destination.',
  },
]

export default function ShippingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/50">
          <div className="container py-12">
            <h1 className="text-4xl font-bold">Shipping Policy</h1>
            <p className="text-muted-foreground mt-2">Last updated: January 1, 2026</p>
          </div>
        </div>
        <div className="container py-12 max-w-4xl">
          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Shipping Methods</h2>
              <div className="grid md:grid-cols-2 gap-6 not-prose">
                {shippingMethods.map((method) => (
                  <Card key={method.title}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <method.icon className="h-8 w-8 text-primary flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-lg">{method.title}</h3>
                          <p className="text-sm text-primary font-medium">{method.time} - {method.price}</p>
                          <p className="text-muted-foreground mt-2">{method.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Order Processing</h2>
              <p className="text-muted-foreground">
                Orders are processed within 1-2 business days. You will receive a confirmation email with tracking information once your order has shipped.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Shipping Restrictions</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>P.O. Box addresses are accepted for standard shipping only</li>
                <li>Hazardous materials cannot be shipped internationally</li>
                <li>Some remote areas may experience additional delivery times</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>
              <p className="text-muted-foreground">
                Once your order ships, you can track it using the tracking number sent to your email. You can also log into your account and view order details under &quot;My Orders&quot;.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about shipping, please contact our support team at support@shopell.com or call us at +1 (555) 123-4567.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
