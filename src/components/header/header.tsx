'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Heart,
  ChevronDown,
  LogOut,
  Settings,
  Package
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const navLinks = [
  { name: 'Products', href: '/products' },
  { name: 'Sale', href: '/sales' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const categories = [
  { name: 'Electronics', href: '/products?category=Electronics' },
  { name: 'Fashion', href: '/products?category=Fashion' },
  { name: 'Home & Garden', href: '/products?category=Home+%26+Garden' },
  { name: 'Beauty', href: '/products?category=Beauty' },
  { name: 'Sports', href: '/products?category=Sports' },
  { name: 'Accessories', href: '/products?category=Accessories' },
]

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const totalItems = useCartStore((state) => state.totalItems)
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-lg font-medium transition-colors hover:text-primary',
                    pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t pt-4 mt-2">
                <p className="text-sm font-medium text-muted-foreground mb-2">Categories</p>
                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="block py-2 text-muted-foreground hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/shopell-logo.svg" alt="Shopell" width={120} height={40} className="h-8 w-auto" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="relative group">
            <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              Categories
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Wishlist */}
          <Link href="/user/wishlist">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {user ? (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {user.full_name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                ) : (
                  <User className="h-5 w-5" />
                )}
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {user ? (
                <>
                  <div className="px-2 py-1.5">
                    <p className="font-medium">{user.full_name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/user/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/user/orders">
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/user/wishlist">
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/register">Create Account</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-t">
          <div className="container py-4">
            <form className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
    </header>
  )
}
