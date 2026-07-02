'use client'

import * as React from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download
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

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Orders',
    value: '2,350',
    change: '+180.1%',
    trend: 'up',
    icon: ShoppingCart,
  },
  {
    title: 'Products',
    value: '1,200',
    change: '+19%',
    trend: 'up',
    icon: Package,
  },
  {
    title: 'Customers',
    value: '573',
    change: '+201',
    trend: 'up',
    icon: Users,
  },
]

const recentOrders = [
  {
    id: 'ORD-20260115-001',
    customer: 'Sarah Johnson',
    email: 'sarah@example.com',
    status: 'delivered',
    total: 299.99,
    date: '2026-01-15',
  },
  {
    id: 'ORD-20260115-002',
    customer: 'Michael Chen',
    email: 'michael@example.com',
    status: 'processing',
    total: 449.99,
    date: '2026-01-15',
  },
  {
    id: 'ORD-20260114-003',
    customer: 'Emily Davis',
    email: 'emily@example.com',
    status: 'shipped',
    total: 149.99,
    date: '2026-01-14',
  },
  {
    id: 'ORD-20260114-004',
    customer: 'James Wilson',
    email: 'james@example.com',
    status: 'pending',
    total: 79.99,
    date: '2026-01-14',
  },
  {
    id: 'ORD-20260113-005',
    customer: 'Lisa Anderson',
    email: 'lisa@example.com',
    status: 'delivered',
    total: 199.99,
    date: '2026-01-13',
  },
]

const topProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    sales: 1247,
    revenue: 374075.53,
    trend: 'up',
  },
  {
    id: 2,
    name: 'Smart Watch',
    sales: 892,
    revenue: 401359.88,
    trend: 'up',
  },
  {
    id: 3,
    name: 'Running Shoes',
    sales: 756,
    revenue: 98276.44,
    trend: 'up',
  },
  {
    id: 4,
    name: 'Laptop Stand',
    sales: 567,
    revenue: 45354.33,
    trend: 'down',
  },
]

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function AdminDashboardPage() {
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
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary font-medium"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted"
          >
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted"
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link
            href="/admin/customers"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted"
          >
            <Users className="h-5 w-5" />
            Customers
          </Link>
          <Separator className="my-2" />
          <Link
            href="/admin/categories"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted"
          >
            <Package className="h-5 w-5" />
            Categories
          </Link>
          <Link
            href="/admin/coupons"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted"
          >
            <Package className="h-5 w-5" />
            Coupons
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted"
          >
            <Package className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-card px-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </header>

        <main className="p-6">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {stat.change}
                    </span>{' '}
                    from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>
                    You made 265 sales this month
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/orders">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-sm text-muted-foreground">{order.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[order.status]}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          ${order.total.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Top Products</CardTitle>
                  <CardDescription>
                    Best selling products this month
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/products">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.sales.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          ${product.revenue.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
