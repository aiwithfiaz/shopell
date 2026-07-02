import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()

    // Check database connection by counting tables
    const [productsCount, usersCount, ordersCount] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }),
    ])

    return NextResponse.json({
      status: 'connected',
      database: 'supabase',
      collections: {
        products: productsCount.count || 0,
        users: usersCount.count || 0,
        orders: ordersCount.count || 0,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Database health check failed:', error)
    return NextResponse.json(
      {
        status: 'disconnected',
        error: 'Failed to connect to database',
      },
      { status: 500 }
    )
  }
}