'use client'

import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { Shield, Lock, Eye, Server } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/50">
          <div className="container py-12">
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground mt-2">Last updated: January 1, 2026</p>
          </div>
        </div>
        <div className="container py-12 max-w-4xl">
          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground">
                Welcome to Shopell (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase our products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <div className="grid md:grid-cols-2 gap-6 not-prose">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3">Personal Information</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Name and contact details</li>
                      <li>• Email address</li>
                      <li>• Shipping and billing address</li>
                      <li>• Phone number</li>
                      <li>• Payment information</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3">Usage Information</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• IP address and browser type</li>
                      <li>• Pages visited and time spent</li>
                      <li>• Referring website addresses</li>
                      <li>• Purchase history</li>
                      <li>• Device information</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>To process and fulfill your orders</li>
                <li>To send order confirmations and shipping updates</li>
                <li>To provide customer support</li>
                <li>To send promotional emails (with your consent)</li>
                <li>To improve our website and services</li>
                <li>To detect and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <div className="grid md:grid-cols-2 gap-6 not-prose">
                {[
                  { icon: Lock, title: 'Encryption', desc: 'All data is encrypted in transit using SSL/TLS technology' },
                  { icon: Shield, title: 'Protection', desc: 'Industry-standard security measures to protect your data' },
                  { icon: Eye, title: 'Monitoring', desc: 'Continuous monitoring for unauthorized access attempts' },
                  { icon: Server, title: 'Storage', desc: 'Secure servers with regular backups and disaster recovery' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <item.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground">
                We may use third-party service providers to help us operate our business, such as payment processors, shipping carriers, and analytics providers. These third parties have access to your information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to correct inaccurate data</li>
                <li>Right to delete your data</li>
                <li>Right to opt-out of marketing communications</li>
                <li>Right to data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at privacy@shopell.com or write to us at: Shopell Inc., 123 Commerce St, New York, NY 10001.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
