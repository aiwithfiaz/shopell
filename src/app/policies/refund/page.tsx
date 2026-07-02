'use client'

import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { RotateCcw, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function RefundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/50">
          <div className="container py-12">
            <h1 className="text-4xl font-bold">Refund Policy</h1>
            <p className="text-muted-foreground mt-2">Last updated: January 1, 2026</p>
          </div>
        </div>
        <div className="container py-12 max-w-4xl">
          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">30-Day Return Policy</h2>
              <p className="text-muted-foreground">
                We offer a 30-day return policy on most items. If 30 days have passed since your purchase, we cannot offer a full refund or exchange.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Eligibility for Returns</h2>
              <div className="grid md:grid-cols-2 gap-6 not-prose">
                <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h3 className="font-bold text-green-700 dark:text-green-400">Eligible Items</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Items in original condition with tags attached</li>
                      <li>• Unworn, unwashed, unused items</li>
                      <li>• Items in original packaging</li>
                      <li>• Electronics with all accessories</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <h3 className="font-bold text-red-700 dark:text-red-400">Non-Eligible Items</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Final sale items</li>
                      <li>• Gift cards</li>
                      <li>• Personalized items</li>
                      <li>• Intimate or sanitary goods</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How to Request a Refund</h2>
              <ol className="list-decimal list-inside text-muted-foreground space-y-3">
                <li>Contact our support team at support@shopell.com with your order number</li>
                <li>Describe the reason for your return</li>
                <li>Receive a Return Merchandise Authorization (RMA) number</li>
                <li>Pack the item securely and include the RMA number</li>
                <li>Ship the item back using a trackable shipping method</li>
                <li>Refund will be processed within 5-7 business days of receiving the return</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Refund Processing</h2>
              <p className="text-muted-foreground">
                Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
              </p>
              <p className="text-muted-foreground mt-3">
                If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment within 5-7 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Damaged or Defective Items</h2>
              <p className="text-muted-foreground">
                If you received a damaged or defective item, please contact us immediately at support@shopell.com. We will arrange for a replacement or full refund at no additional cost to you.
              </p>
            </section>

            <section className="not-prose">
              <Card className="bg-muted/50">
                <CardContent className="p-6 flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-2">Need Help?</h3>
                    <p className="text-muted-foreground">
                      Contact our customer support team at support@shopell.com or call +1 (555) 123-4567 for any refund-related questions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
