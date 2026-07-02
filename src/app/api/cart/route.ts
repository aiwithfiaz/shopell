import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ items: [] })
    }

    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select('*, products(id, name, slug, price, compare_price, stock_quantity, product_images(url, alt)), product_variants(id, name, price, option1, option2, option3)')
      .eq('user_id', userId)

    if (error) throw error

    return NextResponse.json({ items: cartItems || [] })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { userId, productId, variantId, quantity = 1 } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Check if product exists
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, name, slug, price, stock_quantity')
      .eq('id', productId)
      .single()

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('variant_id', variantId || null)
      .single()

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity
      if (product.stock_quantity && newQuantity > product.stock_quantity) {
        return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 })
      }

      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', existingItem.id)

      if (updateError) throw updateError
    } else {
      // Add new item
      if (product.stock_quantity && quantity > product.stock_quantity) {
        return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 })
      }

      const { error: insertError } = await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          product_id: productId,
          variant_id: variantId,
          quantity,
        })

      if (insertError) throw insertError
    }

    // Fetch updated cart
    const { data: updatedCart, error: cartError } = await supabase
      .from('cart_items')
      .select('*, products(id, name, slug, price, compare_price, stock_quantity, product_images(url, alt)), product_variants(id, name, price, option1, option2, option3)')
      .eq('user_id', userId)

    if (cartError) throw cartError

    return NextResponse.json({ items: updatedCart || [] })
  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { userId, itemId, quantity } = await request.json()

    if (!userId || !itemId) {
      return NextResponse.json({ error: 'User ID and Item ID are required' }, { status: 400 })
    }

    if (quantity <= 0) {
      // Remove item
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)
        .eq('user_id', userId)

      if (error) throw error
    } else {
      // Update quantity
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId)
        .eq('user_id', userId)

      if (error) throw error
    }

    // Fetch updated cart
    const { data: updatedCart, error: cartError } = await supabase
      .from('cart_items')
      .select('*, products(id, name, slug, price, compare_price, stock_quantity, product_images(url, alt)), product_variants(id, name, price, option1, option2, option3)')
      .eq('user_id', userId)

    if (cartError) throw cartError

    return NextResponse.json({ items: updatedCart || [] })
  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const itemId = searchParams.get('itemId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    if (itemId) {
      // Delete specific item
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)
        .eq('user_id', userId)

      if (error) throw error
    } else {
      // Clear entire cart
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)

      if (error) throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting from cart:', error)
    return NextResponse.json({ error: 'Failed to delete from cart' }, { status: 500 })
  }
}