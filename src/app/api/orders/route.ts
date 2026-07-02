import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `SHP-${timestamp}-${random}`
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const body = await request.json()
    const { 
      user_id, 
      email, 
      phone,
      shipping_full_name,
      shipping_address_line1,
      shipping_address_line2,
      shipping_city,
      shipping_state,
      shipping_postal_code,
      shipping_country,
      items,
      subtotal,
      shipping_cost,
      discount_amount,
      tax_amount,
      total,
      coupon_id,
      notes 
    } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 })
    }

    if (!shipping_full_name || !shipping_address_line1 || !shipping_city || !shipping_state || !shipping_postal_code) {
      return NextResponse.json({ error: 'Shipping address is required' }, { status: 400 })
    }

    const order_number = generateOrderNumber()

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id,
        order_number,
        email,
        phone,
        shipping_full_name,
        shipping_address_line1,
        shipping_address_line2,
        shipping_city,
        shipping_state,
        shipping_postal_code,
        shipping_country: shipping_country || 'US',
        subtotal: subtotal || 0,
        shipping_cost: shipping_cost || 0,
        discount_amount: discount_amount || 0,
        tax_amount: tax_amount || 0,
        total,
        coupon_id,
        notes,
        status: 'pending',
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      variant_id: item.variant_id,
      name: item.name,
      sku: item.sku,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    // Create payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        order_id: order.id,
        user_id,
        amount: total,
        payment_method: body.payment_method || 'stripe',
        status: 'pending',
      })

    if (paymentError) throw paymentError

    // Clear cart if user is logged in
    if (user_id) {
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user_id)
    }

    return NextResponse.json({ order }, { status: 201 })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status') as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded' | null
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('orders')
      .select('*, order_items(*, products(name, slug, product_images(url)))', { count: 'exact' })

    if (userId) {
      query = query.eq('user_id', userId)
    }
    if (status) {
      query = query.eq('status', status)
    }

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data: orders, count, error } = await query

    if (error) throw error

    return NextResponse.json({ orders: orders || [], total: count })
  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}