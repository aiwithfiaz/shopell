'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
  ],
  support: [
    { name: 'FAQ', href: '/policies/faq' },
    { name: 'Shipping', href: '/policies/shipping' },
    { name: 'Returns', href: '/policies/refund' },
    { name: 'Payment', href: '/policies/terms' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/policies/privacy' },
    { name: 'Terms & Conditions', href: '/policies/terms' },
    { name: 'Refund Policy', href: '/policies/refund' },
    { name: 'Cookie Policy', href: '/policies/cookies' },
  ],
}

export function Footer() {
  const [email, setEmail] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center space-x-2">
              <Image src="/shopell-logo.svg" alt="Shopell" width={100} height={32} className="h-6 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Your premium destination for quality products. Shop with confidence and enjoy fast, reliable shipping.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@shopell.com</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Commerce St, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Shopell. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
