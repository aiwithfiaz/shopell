'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ArrowRight,
  Tag,
  Truck,
  Shield,
  RotateCcw,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { useCartStore } from '@/hooks/use-cart'

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, couponCode, couponDiscount, applyCoupon, removeCoupon } = useCartStore()
  const [couponInput, setCouponInput] = React.useState('')
  const [couponError, setCouponError] = React.useState('')

  const subtotal = totalPrice
  const discountAmount = couponDiscount > 0 ? subtotal * (couponDiscount / 100) : 0
  const afterDiscount = subtotal - discountAmount
  const shipping = afterDiscount > 50 ? 0 : 9.99
  const tax = afterDiscount * 0.08
  const total = afterDiscount + shipping + tax

  const handleApplyCoupon = () => {
    setCouponError('')
    if (!couponInput.trim()) return
    const success = applyCoupon(couponInput.trim())
    if (!success) {
      setCouponError('Invalid coupon code')
    } else {
      setCouponInput('')
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="border-b bg-muted/50">
          <div className="container py-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <span className="text-foreground">Shopping Cart</span>
            </div>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground mt-2">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        <div className="container py-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <Button asChild>
                <Link href="/products">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={`${item.product.id}-${item.color}-${item.size}`}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Link href={`/products/${item.product.slug}`} className="w-24 h-24 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-medium">
                                <Link href={`/products/${item.product.slug}`} className="hover:text-primary">
                                  {item.product.name}
                                </Link>
                              </h3>
                              {(item.color || item.size) && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {item.color && `Color: ${item.color}`}
                                  {item.color && item.size && ' | '}
                                  {item.size && `Size: ${item.size}`}
                                </p>
                              )}
                              {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                                <p className="text-sm text-green-600 mt-1">
                                  You save: ${((item.product.originalPrice - item.product.price) * item.quantity).toFixed(2)}
                                </p>
                              )}
                            </div>
                            <p className="font-bold whitespace-nowrap">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border rounded-md">
                              <button
                                onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                className="px-3 py-1 hover:bg-muted"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-3 py-1 font-medium min-w-[40px] text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="px-3 py-1 hover:bg-muted"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.product.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-start">
                  <Button variant="outline" asChild>
                    <Link href="/products">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Coupon code (try SAVE10)"
                        value={couponInput}
                        onChange={(e) => { setCouponInput(e.target.value); setCouponError('') }}
                      />
                      <Button variant="outline" onClick={handleApplyCoupon}>
                        <Tag className="h-4 w-4 mr-2" />
                        Apply
                      </Button>
                    </div>
                    {couponError && <p className="text-sm text-red-500">{couponError}</p>}
                    {couponCode && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-600">Coupon: {couponCode} ({couponDiscount}% off)</span>
                        <button onClick={removeCoupon} className="text-red-500 hover:text-red-700">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({couponDiscount}%)</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">
                          {shipping === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            `$${shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (8%)</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button className="w-full" size="lg" asChild>
                      <Link href="/checkout">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <div className="pt-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Truck className="h-4 w-4" />
                        <span>Free shipping on orders over $50</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        <span>Secure checkout</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <RotateCcw className="h-4 w-4" />
                        <span>30-day return policy</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
