'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/auth/login?mode=register')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting...</p>
    </div>
  )
}
