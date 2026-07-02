import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { searchParams } = new URL(request.url)
    
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'created_at'
    const order = searchParams.get('order') || 'desc'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const featured = searchParams.get('featured')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')

    let query = supabase
      .from('products')
      .select('*, categories(id, name, slug), brands(id, name, slug), product_images(url, alt)')
      .eq('status', 'active')

    if (category) {
      query = query.eq('categories.slug', category)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    if (minPrice) {
      query = query.gte('price', parseFloat(minPrice))
    }

    if (maxPrice) {
      query = query.lte('price', parseFloat(maxPrice))
    }

    // Get total count
    const { count } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    // Apply sorting
    const validSorts = ['created_at', 'price', 'rating', 'name', 'sales_count']
    const sortField = validSorts.includes(sort) ? sort : 'created_at'
    query = query.order(sortField, { ascending: order === 'asc' })

    // Apply pagination
    const offset = (page - 1) * limit
    query = query.range(offset, offset + limit - 1)

    const { data: products, error } = await query

    if (error) throw error

    return NextResponse.json({
      products: products || [],
      pagination: {
        total: count || 0,
        page,
        limit,
        pages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const body = await request.json()

    const { name, slug, description, short_description, sku, price, compare_price, category_id, brand_id, stock_quantity, status, featured, tags } = body

    const { data: product, error } = await supabase
      .from('products')
      .insert({
        name,
        slug,
        description,
        short_description,
        sku,
        price,
        compare_price,
        category_id,
        brand_id,
        stock_quantity: stock_quantity || 0,
        status: status || 'draft',
        featured: featured || false,
        tags,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}