'use client'

import { useSession, signOut } from 'next-auth/react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  full_name: string
  role: string
  avatar_url?: string
  phone?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>
  register: (data: { email: string; password: string; fullName: string }) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => void
  getUser: () => User | null
  syncWithSession: (session: any) => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
          const data = await response.json()

          if (!response.ok) {
            set({ isLoading: false })
            return { success: false, error: data.error || 'Invalid credentials' }
          }

          set({ user: data.user, isLoading: false })
          return { success: true }
        } catch {
          set({ isLoading: false })
          return { success: false, error: 'Network error. Please try again.' }
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true })
        try {
          const { signIn } = await import('next-auth/react')
          await signIn('google', { callbackUrl: '/' })
          return { success: true }
        } catch {
          set({ isLoading: false })
          return { success: false, error: 'Google sign-in failed. Please try again.' }
        }
      },

      register: async (data) => {
        set({ isLoading: true })
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
          const result = await response.json()

          if (!response.ok) {
            set({ isLoading: false })
            return { success: false, error: result.error || 'Registration failed' }
          }

          set({ isLoading: false })
          return { success: true }
        } catch {
          set({ isLoading: false })
          return { success: false, error: 'Network error. Please try again.' }
        }
      },

      logout: async () => {
        set({ user: null })
        await signOut({ callbackUrl: '/' })
      },

      updateProfile: (data) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...data } })
        }
      },

      getUser: () => {
        return get().user
      },

      syncWithSession: (session) => {
        if (session?.user) {
          set({
            user: {
              id: session.user.id || session.user.email,
              email: session.user.email || '',
              full_name: session.user.name || '',
              role: 'customer',
              avatar_url: session.user.image || undefined,
            },
          })
        }
      },
    }),
    {
      name: 'shopell-auth',
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
)