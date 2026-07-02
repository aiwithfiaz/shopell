'use client'

import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/50">
          <div className="container py-12">
            <h1 className="text-4xl font-bold">Terms & Conditions</h1>
            <p className="text-muted-foreground mt-2">Last updated: January 1, 2026</p>
          </div>
        </div>
        <div className="container py-12 max-w-4xl">
          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using the Shopell website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Account Registration</h2>
              <p className="text-muted-foreground">
                To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when creating your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Products and Pricing</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>All product descriptions, images, and specifications are as accurate as possible</li>
                <li>Prices are subject to change without notice</li>
                <li>We reserve the right to limit order quantities</li>
                <li>Product availability is subject to change</li>
                <li>Colors may vary depending on your display settings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Orders and Payment</h2>
              <p className="text-muted-foreground">
                By placing an order, you are making an offer to purchase a product. We reserve the right to accept or decline any order. Payment must be received in full before shipment. We accept major credit cards, PayPal, and other payment methods as displayed at checkout.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Shipping and Delivery</h2>
              <p className="text-muted-foreground">
                We will ship products to the address you provide during checkout. Delivery times are estimates and not guaranteed. Risk of loss and title for items pass to you upon delivery to the carrier. Please refer to our Shipping Policy for more details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Returns and Refunds</h2>
              <p className="text-muted-foreground">
                We offer returns and refunds in accordance with our Refund Policy. Items must be returned in their original condition within 30 days of purchase. Please refer to our Refund Policy for complete details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on this website, including text, graphics, logos, images, and software, is the property of Shopell and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Shopell shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services or products. Our total liability shall not exceed the amount paid by you for the product in question.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms shall be governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services constitutes acceptance of the modified terms.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
