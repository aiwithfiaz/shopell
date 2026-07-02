import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const db = getDatabase()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = 'SELECT o.*, u.fullName as customerName, u.email as customerEmail FROM orders o LEFT JOIN users u ON o.userId = u.id WHERE 1=1'
    const params: any[] = []

    if (status && status !== 'all') {
      query += ' AND o.status = ?'
      params.push(status)
    }
    if (search) {
      query += ' AND (o.orderNumber LIKE ? OR u.fullName LIKE ? OR u.email LIKE ?)'
      const searchTerm = `%${search}%`
      params.push(searchTerm, searchTerm, searchTerm)
    }

    query += ' ORDER BY o.createdAt DESC LIMIT ? OFFSET ?'
    params.push(limit, offset)

    const orders = db.prepare(query).all(...params)

    const countQuery = 'SELECT COUNT(*) as count FROM orders o LEFT JOIN users u ON o.userId = u.id WHERE 1=1'
    let countParams: any[] = []
    let countSql = countQuery

    if (status && status !== 'all') {
      countSql += ' AND o.status = ?'
      countParams.push(status)
    }
    if (search) {
      countSql += ' AND (o.orderNumber LIKE ? OR u.fullName LIKE ? OR u.email LIKE ?)'
      const searchTerm = `%${search}%`
      countParams.push(searchTerm, searchTerm, searchTerm)
    }

    const total = db.prepare(countSql).get(...countParams) as any

    const ordersWithParsedItems = orders.map((order: any) => ({
      ...order,
      items: JSON.parse(order.items || '[]'),
    }))

    return NextResponse.json({ orders: ordersWithParsedItems, total: total.count })
  } catch (error) {
    console.error('Admin get orders error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
