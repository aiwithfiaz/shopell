'use client'

import * as React from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Search,
  Eye,
  ChevronDown,
  Download,
  Filter,
  ArrowUpDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface OrderItem {
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: number
  orderNumber: string
  userId: number | null
  customerName: string | null
  customerEmail: string | null
  items: OrderItem[]
  shippingAddress: string
  subtotal: number
  tax: number
  shippingCost: number
  discount: number
  total: number
  status: string
  paymentStatus: string
  paymentMethod: string
  shippingMethod: string
  trackingNumber: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = React.useState<Order[]>([])
  const [total, setTotal] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null)
  const [updatingId, setUpdatingId] = React.useState<number | null>(null)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.set('status', statusFilter)
      if (searchQuery) params.set('search', searchQuery)
      
      const res = await fetch(`/api/admin/orders?${params}`)
      const data = await res.json()
      setOrders(data.orders || [])
      setTotal(data.total || 0)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchOrders()
  }, [statusFilter, searchQuery])

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    setUpdatingId(orderId)
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      fetchOrders()
    } catch (error) {
      console.error('Failed to update order:', error)
    } finally {
      setUpdatingId(null)
    }
  }

  const stats = React.useMemo(() => {
    const all = orders
    const pending = all.filter(o => o.status === 'pending').length
    const processing = all.filter(o => o.status === 'processing').length
    const shipped = all.filter(o => o.status === 'shipped').length
    const delivered = all.filter(o => o.status === 'delivered').length
    const revenue = all.reduce((sum, o) => sum + o.total, 0)
    return { pending, processing, shipped, delivered, revenue }
  }, [orders])

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r bg-card lg:block">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
            <LayoutDashboard className="h-6 w-6" />
            Shopell Admin
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted">
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary font-medium">
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted">
            <Users className="h-5 w-5" />
            Customers
          </Link>
          <Separator className="my-2" />
          <Link href="/admin/categories" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted">
            <Package className="h-5 w-5" />
            Categories
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted">
            <Package className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b bg-card px-6">
          <h1 className="text-2xl font-bold">Orders</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </header>

        <main className="p-6">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-5 mb-8">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Shipped</p>
                <p className="text-2xl font-bold text-purple-600">{stats.shipped}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">${stats.revenue.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by order number, customer name, or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders Table */}
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">No orders found</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono font-medium">{order.orderNumber}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customerName || 'Guest'}</p>
                            <p className="text-sm text-muted-foreground">{order.customerEmail || 'N/A'}</p>
                          </div>
                        </TableCell>
                        <TableCell>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</TableCell>
                        <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[order.status]}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            order.paymentStatus === 'paid' ? 'border-green-500 text-green-600' :
                            order.paymentStatus === 'pending' ? 'border-yellow-500 text-yellow-600' : ''
                          }>
                            {order.paymentMethod} ({order.paymentStatus})
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Select
                              value={order.status}
                              onValueChange={(val) => updateOrderStatus(order.id, val)}
                              disabled={updatingId === order.id}
                            >
                              <SelectTrigger className="w-[120px] h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order {selectedOrder?.orderNumber}</DialogTitle>
            <DialogDescription>Placed on {selectedOrder && new Date(selectedOrder.createdAt).toLocaleString()}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedOrder.customerName || 'Guest'}</p>
                  <p className="text-sm">{selectedOrder.customerEmail || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Shipping Address</p>
                  <p className="text-sm">{selectedOrder.shippingAddress || 'N/A'}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payment</p>
                  <p className="text-sm">{selectedOrder.paymentMethod}</p>
                  <Badge variant="outline" className="mt-1">{selectedOrder.paymentStatus}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge className={statusColors[selectedOrder.status]}>{selectedOrder.status}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tracking</p>
                  <p className="text-sm">{selectedOrder.trackingNumber || 'Not assigned'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Items</p>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 border rounded-lg">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{selectedOrder.shippingCost === 0 ? 'Free' : `$${selectedOrder.shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${selectedOrder.tax.toFixed(2)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-${selectedOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
              {selectedOrder.notes && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Notes</p>
                  <p className="text-sm">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
