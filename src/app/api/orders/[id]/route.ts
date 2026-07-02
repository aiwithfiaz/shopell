import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = getDatabase()
    const { id } = await params

    const order = db.prepare('SELECT * FROM orders WHERE id = ? OR orderNumber = ?').get(id, id) as any

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    order.items = JSON.parse(order.items || '[]')

    return NextResponse.json({ order })
  } catch (error) {
    console.error('Get order error:', error)
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = getDatabase()
    const { id } = await params
    const body = await request.json()
    const { status, paymentStatus, trackingNumber, notes } = body

    const existing = db.prepare('SELECT * FROM orders WHERE id = ?').get(parseInt(id)) as any
    if (!existing) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const updates: string[] = []
    const values: any[] = []

    if (status) {
      updates.push('status = ?')
      values.push(status)
    }
    if (paymentStatus) {
      updates.push('paymentStatus = ?')
      values.push(paymentStatus)
    }
    if (trackingNumber !== undefined) {
      updates.push('trackingNumber = ?')
      values.push(trackingNumber)
    }
    if (notes !== undefined) {
      updates.push('notes = ?')
      values.push(notes)
    }
    updates.push("updatedAt = datetime('now')")

    if (updates.length > 1) {
      db.prepare(`UPDATE orders SET ${updates.join(', ')} WHERE id = ?`).run(...values, parseInt(id))
    }

    const updated = db.prepare('SELECT * FROM orders WHERE id = ?').get(parseInt(id)) as any
    updated.items = JSON.parse(updated.items || '[]')

    return NextResponse.json({ order: updated })
  } catch (error) {
    console.error('Update order error:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = getDatabase()
    const { id } = await params

    const existing = db.prepare('SELECT * FROM orders WHERE id = ?').get(parseInt(id))
    if (!existing) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    db.prepare('DELETE FROM orders WHERE id = ?').run(parseInt(id))

    return NextResponse.json({ message: 'Order deleted' })
  } catch (error) {
    console.error('Delete order error:', error)
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 })
  }
}
