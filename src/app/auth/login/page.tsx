'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'
  const authError = searchParams.get('error')
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login'

  const [mode, setMode] = React.useState<'login' | 'register'>(initialMode)
  const [showPassword, setShowPassword] = React.useState(false)
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  React.useEffect(() => {
    if (authError) {
      setError('Google sign-in failed. Please try again.')
    }
  }, [authError])

  const resetForm = () => {
    setFormData({ fullName: '', email: '', password: '', confirmPassword: '' })
    setError('')
    setSuccess('')
  }

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode)
    resetForm()
  }

  const handleGoogleAuth = async () => {
    setError('')
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: redirect })
    } catch {
      setError('Google sign-in failed. Please try again.')
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })
      if (result?.error) {
        setError('Invalid email or password')
        setIsLoading(false)
      } else {
        router.push(redirect)
        router.refresh()
      }
    } catch {
      setError('Login failed. Please try again.')
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      })
      const result = await response.json()
      if (!response.ok) {
        setError(result.error || 'Registration failed')
        setIsLoading(false)
      } else {
        setSuccess('Account created! Signing you in...')
        const signInResult = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })
        if (signInResult?.error) {
          setSuccess('Account created! Please sign in.')
          setTimeout(() => switchMode('login'), 1500)
        } else {
          router.push(redirect)
          router.refresh()
        }
        setIsLoading(false)
      }
    } catch {
      setError('Registration failed. Please try again.')
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Image src="/shopell-logo.svg" alt="Shopell" width={140} height={44} className="h-10 w-auto" priority />
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {mode === 'login'
                  ? 'Sign in to your account to continue'
                  : 'Join Shopell and start shopping today'}
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 mb-4 text-sm text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400 rounded-lg">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 p-3 mb-4 text-sm text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400 rounded-lg">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <Button variant="outline" className="w-full h-11 font-medium" type="button" onClick={handleGoogleAuth} disabled={isLoading}>
              <GoogleIcon className="h-5 w-5 mr-3" />
              Continue with Google
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground">
                  {mode === 'login' ? 'Or sign in with email' : 'Or register with email'}
                </span>
              </div>
            </div>

            {mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="email" name="email" type="email" placeholder="name@example.com" className="pl-10 h-11" value={formData.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="pl-10 pr-10 h-11" value={formData.password} onChange={handleChange} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 font-medium" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="fullName" name="fullName" placeholder="John Doe" className="pl-10 h-11" value={formData.fullName} onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="email" name="email" type="email" placeholder="name@example.com" className="pl-10 h-11" value={formData.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters" className="pl-10 pr-10 h-11" value={formData.password} onChange={handleChange} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="Confirm your password" className="pl-10 h-11" value={formData.confirmPassword} onChange={handleChange} />
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 font-medium" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center text-sm">
              {mode === 'login' ? (
                <p className="text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <button onClick={() => switchMode('register')} className="text-primary font-medium hover:underline">Sign up</button>
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <button onClick={() => switchMode('login')} className="text-primary font-medium hover:underline">Sign in</button>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Shopell
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>}>
      <AuthForm />
    </React.Suspense>
  )
}