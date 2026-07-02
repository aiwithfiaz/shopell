'use client'

import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { Cookie, Settings, BarChart, Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const cookieTypes = [
  {
    icon: Settings,
    name: 'Essential Cookies',
    required: true,
    description: 'These cookies are necessary for the website to function properly. They enable core functionality such as security, account authentication, and shopping cart features.',
    examples: ['Session management', 'Shopping cart', 'Login authentication', 'Security tokens'],
  },
  {
    icon: BarChart,
    name: 'Analytics Cookies',
    required: false,
    description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
    examples: ['Google Analytics', 'Page view tracking', 'Bounce rate analysis', 'Traffic sources'],
  },
  {
    icon: Target,
    name: 'Marketing Cookies',
    required: false,
    description: 'These cookies are used to track visitors across websites to display relevant advertisements that are engaging and valuable.',
    examples: ['Social media pixels', 'Retargeting ads', 'Ad campaign tracking', 'Conversion tracking'],
  },
]

export default function CookiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/50">
          <div className="container py-12">
            <div className="flex items-center gap-3 mb-2">
              <Cookie className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Cookie Policy</h1>
            </div>
            <p className="text-muted-foreground mt-2">Last updated: January 1, 2026</p>
          </div>
        </div>
        <div className="container py-12 max-w-4xl">
          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
              <p className="text-muted-foreground">
                Cookies are small text files that are stored on your device when you visit a website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
              <div className="space-y-4 not-prose">
                {cookieTypes.map((type) => (
                  <Card key={type.name}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <type.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg">{type.name}</h3>
                            {type.required && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Required</span>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-3">{type.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {type.examples.map((example) => (
                              <span key={example} className="text-xs bg-muted px-2 py-1 rounded">
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
              <p className="text-muted-foreground">
                You can control and manage cookies through your browser settings. Most browsers allow you to refuse or accept cookies, delete existing cookies, and set preferences for certain websites.
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                <li>Chrome: Settings &gt; Privacy and Security &gt; Cookies</li>
                <li>Firefox: Options &gt; Privacy &gt; Cookies</li>
                <li>Safari: Preferences &gt; Privacy &gt; Cookies</li>
                <li>Edge: Settings &gt; Privacy &gt; Cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
              <p className="text-muted-foreground">
                Some cookies are placed by third-party services that appear on our pages. We do not control these third-party cookies. Please refer to the respective third party&apos;s privacy policy for more information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about our use of cookies, please contact us at privacy@shopell.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
