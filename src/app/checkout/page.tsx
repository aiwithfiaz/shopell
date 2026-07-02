'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  CreditCard, 
  Truck, 
  ChevronRight,
  Lock,
  CheckCircle2,
  Banknote,
  MapPin,
  Package,
  CircleDot
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { useCartStore } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/use-auth'

const shippingMethods = [
  { id: 'standard', name: 'Standard Shipping', price: 0, days: '5-7 business days', icon: Package },
  { id: 'express', name: 'Express Shipping', price: 9.99, days: '2-3 business days', icon: Truck },
  { id: 'overnight', name: 'Overnight Shipping', price: 19.99, days: 'Next business day', icon: CircleDot },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, totalItems, clearCart, couponCode, couponDiscount } = useCartStore()
  const { addOrder } = useAuth()
  const [step, setStep] = React.useState(1)
  const [selectedShipping, setSelectedShipping] = React.useState('standard')
  const [selectedPayment, setSelectedPayment] = React.useState('cod')
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [orderPlaced, setOrderPlaced] = React.useState(false)
  const [orderNumber, setOrderNumber] = React.useState('')

  const [shippingForm, setShippingForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  })

  const [cardForm, setCardForm] = React.useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const subtotal = totalPrice
  const discountAmount = couponDiscount > 0 ? subtotal * (couponDiscount / 100) : 0
  const afterDiscount = subtotal - discountAmount
  const shippingCost = shippingMethods.find(m => m.id === selectedShipping)?.price || 0
  const freeShippingThreshold = 50
  const effectiveShipping = afterDiscount >= freeShippingThreshold ? 0 : shippingCost
  const tax = afterDiscount * 0.08
  const total = afterDiscount + effectiveShipping + tax

  const handleShippingChange = (field: string, value: string) => {
    setShippingForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleCardChange = (field: string, value: string) => {
    setCardForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateShipping = () => {
    const newErrors: Record<string, string> = {}
    if (!shippingForm.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!shippingForm.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!shippingForm.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(shippingForm.email)) newErrors.email = 'Invalid email'
    if (!shippingForm.phone.trim()) newErrors.phone = 'Phone is required'
    if (!shippingForm.address.trim()) newErrors.address = 'Address is required'
    if (!shippingForm.city.trim()) newErrors.city = 'City is required'
    if (!shippingForm.state.trim()) newErrors.state = 'State is required'
    if (!shippingForm.zip.trim()) newErrors.zip = 'ZIP code is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePayment = () => {
    if (selectedPayment === 'cod') return true
    const newErrors: Record<string, string> = {}
    if (!cardForm.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
    if (!cardForm.expiry.trim()) newErrors.expiry = 'Expiry date is required'
    if (!cardForm.cvv.trim()) newErrors.cvv = 'CVV is required'
    if (!cardForm.nameOnCard.trim()) newErrors.nameOnCard = 'Name on card is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (step === 1) {
      if (validateShipping()) setStep(2)
    } else if (step === 2) {
      if (validatePayment()) setStep(3)
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    
    const orderNum = `SHP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    const shippingAddr = `${shippingForm.firstName} ${shippingForm.lastName}, ${shippingForm.address}${shippingForm.apartment ? ', ' + shippingForm.apartment : ''}, ${shippingForm.city}, ${shippingForm.state} ${shippingForm.zip}, ${shippingForm.country}`

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.image,
          })),
          shippingAddress: shippingAddr,
          subtotal: subtotal,
          tax: tax,
          shippingCost: effectiveShipping,
          discount: discountAmount,
          total: total,
          paymentMethod: selectedPayment === 'cod' ? 'Cash on Delivery' : selectedPayment === 'credit-card' ? 'Credit Card' : 'PayPal',
          shippingMethod: selectedShipping,
        }),
      })
      
      if (res.ok) {
        const data = await res.json()
        addOrder({
          id: orderNum,
          items: items.map(item => ({
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.image,
          })),
          total: total,
          status: 'pending',
          paymentMethod: selectedPayment === 'cod' ? 'Cash on Delivery' : selectedPayment === 'credit-card' ? 'Credit Card' : 'PayPal',
          shippingAddress: shippingAddr,
          createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        })
      }
    } catch {
      addOrder({
        id: orderNum,
        items: items.map(item => ({
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        })),
        total: total,
        status: 'pending',
        paymentMethod: selectedPayment === 'cod' ? 'Cash on Delivery' : selectedPayment === 'credit-card' ? 'Credit Card' : 'PayPal',
        shippingAddress: shippingAddr,
        createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      })
    }
    
    setOrderNumber(orderNum)
    setOrderPlaced(true)
    clearCart()
    setIsProcessing(false)
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-lg px-4">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
                <p className="text-muted-foreground mb-6">
                  Thank you for your order. We&apos;ll send you a confirmation email shortly.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="text-lg font-bold font-mono">{orderNumber}</p>
                </div>
                <div className="space-y-3 text-sm text-left mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="font-medium">
                      {selectedPayment === 'cod' ? 'Cash on Delivery' : 'Credit Card'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping To</span>
                    <span className="font-medium text-right">
                      {shippingForm.firstName} {shippingForm.lastName}<br />
                      {shippingForm.address}, {shippingForm.city}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
                {selectedPayment === 'cod' && (
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6 text-left">
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                      Cash on Delivery
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                      Please keep ${total.toFixed(2)} ready in cash when your order arrives. Our delivery partner will collect the payment.
                    </p>
                  </div>
                )}
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/">Continue Shopping</Link>
                  </Button>
                  <Button className="flex-1" asChild>
                    <Link href="/user/profile">View Orders</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <Package className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some items to your cart before checking out.</p>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="border-b bg-muted/50">
          <div className="container py-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/cart" className="hover:text-primary">Cart</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Checkout</span>
            </div>
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground mt-2">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your order</p>
          </div>
        </div>

        <div className="container py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4">
              {[
                { id: 1, name: 'Shipping', icon: MapPin },
                { id: 2, name: 'Payment', icon: CreditCard },
                { id: 3, name: 'Review', icon: CheckCircle2 },
              ].map((checkoutStep, index) => (
                <React.Fragment key={checkoutStep.id}>
                  <button
                    onClick={() => {
                      if (checkoutStep.id < step) setStep(checkoutStep.id)
                    }}
                    className={`flex items-center gap-2 ${checkoutStep.id < step ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      step > checkoutStep.id
                        ? 'bg-green-500 text-white'
                        : step === checkoutStep.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step > checkoutStep.id ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <checkoutStep.icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className={`font-medium hidden sm:inline ${
                      step === checkoutStep.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {checkoutStep.name}
                    </span>
                  </button>
                  {index < 2 && (
                    <div className={`w-12 sm:w-20 h-0.5 ${
                      step > checkoutStep.id ? 'bg-green-500' : 'bg-muted'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="John" value={shippingForm.firstName} onChange={(e) => handleShippingChange('firstName', e.target.value)} className={errors.firstName ? 'border-red-500' : ''} />
                        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Doe" value={shippingForm.lastName} onChange={(e) => handleShippingChange('lastName', e.target.value)} className={errors.lastName ? 'border-red-500' : ''} />
                        {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" placeholder="john@example.com" value={shippingForm.email} onChange={(e) => handleShippingChange('email', e.target.value)} className={errors.email ? 'border-red-500' : ''} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" value={shippingForm.phone} onChange={(e) => handleShippingChange('phone', e.target.value)} className={errors.phone ? 'border-red-500' : ''} />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input id="address" placeholder="123 Main Street" value={shippingForm.address} onChange={(e) => handleShippingChange('address', e.target.value)} className={errors.address ? 'border-red-500' : ''} />
                      {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                      <Input id="apartment" placeholder="Apt 4B" value={shippingForm.apartment} onChange={(e) => handleShippingChange('apartment', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" placeholder="New York" value={shippingForm.city} onChange={(e) => handleShippingChange('city', e.target.value)} className={errors.city ? 'border-red-500' : ''} />
                        {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input id="state" placeholder="NY" value={shippingForm.state} onChange={(e) => handleShippingChange('state', e.target.value)} className={errors.state ? 'border-red-500' : ''} />
                        {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code *</Label>
                        <Input id="zip" placeholder="10001" value={shippingForm.zip} onChange={(e) => handleShippingChange('zip', e.target.value)} className={errors.zip ? 'border-red-500' : ''} />
                        {errors.zip && <p className="text-sm text-red-500">{errors.zip}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" value={shippingForm.country} onChange={(e) => handleShippingChange('country', e.target.value)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 1: Shipping Method */}
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping}>
                      {shippingMethods.map((method) => {
                        const isFree = method.price === 0 || afterDiscount >= freeShippingThreshold
                        return (
                          <div key={method.id} className={`flex items-center space-x-3 border rounded-lg p-4 mb-3 cursor-pointer transition-colors ${selectedShipping === method.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}>
                            <RadioGroupItem value={method.id} id={method.id} />
                            <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                  <method.icon className="h-5 w-5 text-muted-foreground" />
                                  <div>
                                    <p className="font-medium">{method.name}</p>
                                    <p className="text-sm text-muted-foreground">{method.days}</p>
                                  </div>
                                </div>
                                <span className="font-medium">
                                  {isFree ? (
                                    <span className="text-green-600">Free</span>
                                  ) : (
                                    `$${method.price.toFixed(2)}`
                                  )}
                                </span>
                              </div>
                            </Label>
                          </div>
                        )
                      })}
                    </RadioGroup>
                    {afterDiscount < freeShippingThreshold && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Add ${(freeShippingThreshold - afterDiscount).toFixed(2)} more for free standard shipping
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                      <div className={`flex items-center space-x-3 border rounded-lg p-4 mb-3 cursor-pointer transition-colors ${selectedPayment === 'cod' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}>
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <Banknote className="h-6 w-6 text-green-600" />
                              <div>
                                <p className="font-medium">Cash on Delivery</p>
                                <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                              </div>
                            </div>
                          </div>
                        </Label>
                      </div>
                      <div className={`flex items-center space-x-3 border rounded-lg p-4 mb-3 cursor-pointer transition-colors ${selectedPayment === 'credit-card' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}>
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <CreditCard className="h-6 w-6 text-muted-foreground" />
                              <div>
                                <p className="font-medium">Credit / Debit Card</p>
                                <p className="text-sm text-muted-foreground">Visa, Mastercard, AMEX</p>
                              </div>
                            </div>
                          </div>
                        </Label>
                      </div>
                      <div className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${selectedPayment === 'paypal' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}>
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-blue-600 text-lg">PayPal</span>
                              <div>
                                <p className="font-medium">PayPal</p>
                                <p className="text-sm text-muted-foreground">Pay with your PayPal account</p>
                              </div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {selectedPayment === 'credit-card' && (
                      <div className="mt-6 space-y-4 p-4 border rounded-lg">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" value={cardForm.cardNumber} onChange={(e) => handleCardChange('cardNumber', e.target.value)} className={errors.cardNumber ? 'border-red-500' : ''} />
                          {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date *</Label>
                            <Input id="expiry" placeholder="MM/YY" value={cardForm.expiry} onChange={(e) => handleCardChange('expiry', e.target.value)} className={errors.expiry ? 'border-red-500' : ''} />
                            {errors.expiry && <p className="text-sm text-red-500">{errors.expiry}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input id="cvv" placeholder="123" value={cardForm.cvv} onChange={(e) => handleCardChange('cvv', e.target.value)} className={errors.cvv ? 'border-red-500' : ''} />
                            {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nameOnCard">Name on Card *</Label>
                          <Input id="nameOnCard" placeholder="John Doe" value={cardForm.nameOnCard} onChange={(e) => handleCardChange('nameOnCard', e.target.value)} className={errors.nameOnCard ? 'border-red-500' : ''} />
                          {errors.nameOnCard && <p className="text-sm text-red-500">{errors.nameOnCard}</p>}
                        </div>
                      </div>
                    )}

                    {selectedPayment === 'cod' && (
                      <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Banknote className="h-5 w-5 text-amber-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-amber-800 dark:text-amber-200">How Cash on Delivery Works</p>
                            <ul className="text-sm text-amber-700 dark:text-amber-300 mt-2 space-y-1">
                              <li>• Order will be shipped after confirmation</li>
                              <li>• Pay <strong>${total.toFixed(2)}</strong> in cash when delivered</li>
                              <li>• Please keep exact change ready</li>
                              <li>• Available for all delivery addresses</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Shipping Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="font-medium">{shippingForm.firstName} {shippingForm.lastName}</p>
                        <p className="text-muted-foreground">{shippingForm.address}</p>
                        {shippingForm.apartment && <p className="text-muted-foreground">{shippingForm.apartment}</p>}
                        <p className="text-muted-foreground">{shippingForm.city}, {shippingForm.state} {shippingForm.zip}</p>
                        <p className="text-muted-foreground">{shippingForm.country}</p>
                        <p className="text-muted-foreground mt-2">{shippingForm.email} | {shippingForm.phone}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2" onClick={() => setStep(1)}>Edit</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Payment Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-3">
                        {selectedPayment === 'cod' ? (
                          <>
                            <Banknote className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium">Cash on Delivery</p>
                              <p className="text-sm text-muted-foreground">Pay ${total.toFixed(2)} when delivered</p>
                            </div>
                          </>
                        ) : selectedPayment === 'credit-card' ? (
                          <>
                            <CreditCard className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Credit / Debit Card</p>
                              <p className="text-sm text-muted-foreground">Card ending in {cardForm.cardNumber.slice(-4) || '****'}</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <span className="font-bold text-blue-600">PayPal</span>
                            <div>
                              <p className="font-medium">PayPal</p>
                              <p className="text-sm text-muted-foreground">Pay with your PayPal account</p>
                            </div>
                          </>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2" onClick={() => setStep(2)}>Edit</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Order Items ({totalItems})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div key={`${item.product.id}-${item.color}-${item.size}`} className="flex gap-4">
                            <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="flex-1">
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-60 overflow-auto">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.color}-${item.size}`} className="flex gap-3">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

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
                        {effectiveShipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `$${effectiveShipping.toFixed(2)}`
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

                  {step < 3 ? (
                    <Button className="w-full" size="lg" onClick={handleNextStep}>
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button className="w-full" size="lg" onClick={handlePlaceOrder} disabled={isProcessing}>
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          {selectedPayment === 'cod' ? (
                            <>
                              <Banknote className="mr-2 h-4 w-4" />
                              Place Order (COD)
                            </>
                          ) : (
                            <>
                              <Lock className="mr-2 h-4 w-4" />
                              Place Order
                            </>
                          )}
                        </>
                      )}
                    </Button>
                  )}

                  <p className="text-xs text-center text-muted-foreground">
                    <Lock className="inline h-3 w-3 mr-1" />
                    Your payment information is secure. We use SSL encryption.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
