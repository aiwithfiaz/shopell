'use client'

import * as React from 'react'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'How do I track my order?',
    answer: 'Once your order ships, you will receive a confirmation email with a tracking number. You can use this number to track your package on our website or the carrier\'s website. You can also log into your account and check the status under "My Orders".',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept Visa, Mastercard, American Express, Discover, PayPal, and Apple Pay. All payments are processed securely through our payment partners.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. Next day delivery is available in select metro areas. International shipping takes 7-14 business days.',
  },
  {
    question: 'Can I cancel or modify my order?',
    answer: 'You can cancel or modify your order within 2 hours of placing it. After that, the order may have already been processed for shipping. Please contact support@shopell.com for assistance.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy on most items. Items must be in their original condition with tags attached. Please visit our Refund Policy page for complete details and instructions.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination. You can see the shipping options at checkout.',
  },
  {
    question: 'How do I create an account?',
    answer: 'Click on "Sign Up" in the top right corner of our website. Enter your email, create a password, and fill in your details. You\'ll receive a confirmation email to verify your account.',
  },
  {
    question: 'Are my payment details secure?',
    answer: 'Yes, we use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers.',
  },
  {
    question: 'What if I receive a damaged item?',
    answer: 'If you receive a damaged or defective item, please contact us immediately at support@shopell.com with photos of the damage. We will arrange for a replacement or full refund.',
  },
  {
    question: 'How can I contact customer support?',
    answer: 'You can reach us at support@shopell.com, call us at +1 (555) 123-4567, or use the contact form on our Contact page. Our support team is available Monday-Friday, 9 AM - 6 PM EST.',
  },
]

function FAQItem({ faq }: { faq: typeof faqs[0] }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Card>
      <CardContent className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 transition-colors"
        >
          <span className="font-medium pr-4">{faq.question}</span>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform flex-shrink-0",
              isOpen && "rotate-180"
            )}
          />
        </button>
        {isOpen && (
          <div className="px-4 pb-4 text-muted-foreground">
            {faq.answer}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/50">
          <div className="container py-12">
            <div className="flex items-center gap-3 mb-2">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
            </div>
            <p className="text-muted-foreground mt-2">Find answers to common questions</p>
          </div>
        </div>
        <div className="container py-12 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
