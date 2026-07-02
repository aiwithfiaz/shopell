import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password } = await request.json()

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI!)
    const db = client.db('shopell')

    const existingUser = await db.collection('users').findOne({
      email: email.toLowerCase(),
    })

    if (existingUser) {
      await client.close()
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await db.collection('users').insertOne({
      email: email.toLowerCase(),
      password: hashedPassword,
      fullName,
      name: fullName,
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await client.close()

    return NextResponse.json({
      user: {
        id: result.insertedId.toString(),
        email: email.toLowerCase(),
        fullName,
        role: 'customer',
      },
      message: 'Account created successfully',
    }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Failed to register' }, { status: 500 })
  }
}