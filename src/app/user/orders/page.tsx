'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Package, 
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  Eye,
  ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { useAuth } from '@/hooks/use-auth'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

const statusIcons: Record<string, React.ComponentType<any>> = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle2,
  cancelled: XCircle,
}

interface OrderItem {
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  items: OrderItem[]
  total: number
  status: string
  paymentMethod: string
  shippingAddress: string
  createdAt: string
}

export default function OrdersPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [orders, setOrders] = React.useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders?userId=${user.id}`)
        if (res.ok) {
          const data = await res.json()
          setOrders(data.orders || [])
        }
      } catch {
        // Failed to fetch orders
      }
    }

    fetchOrders()
  }, [user, router])

  if (!user) return null

  const order = orders.find(o => o.id === selectedOrder)

  if (order) {
    const StatusIcon = statusIcons[order.status] || Clock
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <div className="border-b bg-muted/50">
            <div className="container py-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link href="/" className="hover:text-primary">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/user/profile" className="hover:text-primary">My Account</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/user/orders" className="hover:text-primary">Orders</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">#{order.id}</span>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-3xl font-bold">Order #{order.id}</h1>
                  <p className="text-muted-foreground mt-1">Placed on {order.createdAt}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Order Status */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <Badge className={statusColors[order.status]}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      {['pending', 'processing', 'shipped', 'delivered'].map((status, index) => {
                        const isActive = ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status) >= index
                        return (
                          <div key={status} className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isActive ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                            }`}>
                              {index < ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status) ? (
                                <CheckCircle2 className="h-5 w-5" />
                              ) : (
                                <span>{index + 1}</span>
                              )}
                            </div>
                            <p className="text-xs mt-2 capitalize">{status}</p>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                          <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${(order.total * 0.92).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">${(order.total * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{order.shippingAddress}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{order.paymentMethod}</p>
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="border-b bg-muted/50">
          <div className="container py-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/user/profile" className="hover:text-primary">My Account</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Orders</span>
            </div>
            <h1 className="text-3xl font-bold">My Orders</h1>
            <p className="text-muted-foreground mt-2">View and track your orders</p>
          </div>
        </div>

        <div className="container py-8">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
              <Button asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const StatusIcon = statusIcons[order.status] || Clock
                return (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex -space-x-2">
                            {order.items.slice(0, 3).map((item, i) => (
                              <img
                                key={i}
                                src={item.image}
                                alt={item.name}
                                className="h-12 w-12 rounded-lg border-2 border-background object-cover"
                              />
                            ))}
                          </div>
                          <div>
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.createdAt}</p>
                            <p className="text-sm text-muted-foreground">{order.items.length} item(s)</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={statusColors[order.status]}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                          <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
