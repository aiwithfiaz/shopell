'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Star, 
  Bell, 
  Shield,
  LogOut,
  ChevronRight,
  Camera,
  Edit2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { useAuth } from '@/hooks/use-auth'

const sidebarLinks = [
  { name: 'Profile', href: '/user/profile', icon: User },
  { name: 'Orders', href: '/user/orders', icon: Package },
  { name: 'Wishlist', href: '/user/wishlist', icon: Heart },
  { name: 'Addresses', href: '/user/addresses', icon: MapPin },
  { name: 'Reviews', href: '/user/reviews', icon: Star },
  { name: 'Notifications', href: '/user/notifications', icon: Bell },
  { name: 'Security', href: '/user/security', icon: Shield },
]

export default function UserProfilePage() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = React.useState(false)
  const [formData, setFormData] = React.useState({
    full_name: '',
    email: '',
    phone: '',
  })

  React.useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
      })
    }
  }, [user])

  React.useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleSave = () => {
    updateProfile(formData)
    setIsEditing(false)
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const initials = user.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || user.email[0].toUpperCase()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="border-b bg-muted/50">
          <div className="container py-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">My Account</span>
            </div>
            <h1 className="text-3xl font-bold">My Account</h1>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-medium text-primary">
                        {initials}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{user.full_name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <nav className="space-y-1">
                    {sidebarLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          pathname === link.href
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        <link.icon className="h-4 w-4" />
                        {link.name}
                      </Link>
                    ))}
                    <Separator className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted w-full"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Profile Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your account details and preferences</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt={user.full_name} className="h-24 w-24 rounded-full object-cover" />
                        ) : (
                          <span className="text-2xl font-medium text-primary">
                            {initials}
                          </span>
                        )}
                      </div>
                      {isEditing && (
                        <button className="absolute bottom-0 right-0 rounded-full bg-primary p-1.5 text-primary-foreground">
                          <Camera className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-lg">{user.full_name}</p>
                      <p className="text-muted-foreground">{user.email}</p>
                      <Badge variant="secondary" className="mt-1 capitalize">{user.role}</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        value={formData.full_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    {isEditing && (
                      <div className="flex justify-end">
                        <Button onClick={handleSave}>Save Changes</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Package className="h-8 w-8 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Heart className="h-8 w-8 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Wishlist Items</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Star className="h-8 w-8 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Reviews</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}