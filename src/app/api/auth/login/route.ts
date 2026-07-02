import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('auth_user_id', data.user.id)
      .single()

    return NextResponse.json({
      user: {
        id: profile?.id || data.user.id,
        email: data.user.email,
        full_name: profile?.full_name,
        role: profile?.role || 'customer',
        avatar_url: profile?.avatar_url,
      },
      session: data.session,
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 })
  }
}