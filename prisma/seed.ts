import Database from 'better-sqlite3'
import path from 'path'
import bcrypt from 'bcryptjs'

const dbPath = path.resolve(__dirname, '../shopell.db')
const db = new Database(dbPath)

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image TEXT,
    sortOrder INTEGER DEFAULT 0,
    isActive INTEGER DEFAULT 1,
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    shortDescription TEXT,
    category TEXT NOT NULL,
    subcategory TEXT,
    brand TEXT NOT NULL,
    tags TEXT,
    basePrice REAL NOT NULL,
    compareAtPrice REAL,
    images TEXT,
    stock INTEGER DEFAULT 0,
    lowStockThreshold INTEGER DEFAULT 5,
    variants TEXT,
    status TEXT DEFAULT 'draft',
    featured INTEGER DEFAULT 0,
    rating REAL DEFAULT 0,
    numReviews INTEGER DEFAULT 0,
    seoMetadata TEXT,
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    fullName TEXT NOT NULL,
    avatar TEXT,
    phone TEXT,
    role TEXT DEFAULT 'customer',
    addresses TEXT DEFAULT '[]',
    wishlist TEXT DEFAULT '[]',
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderNumber TEXT UNIQUE NOT NULL,
    userId INTEGER,
    items TEXT NOT NULL,
    shippingAddress TEXT,
    subtotal REAL NOT NULL,
    tax REAL DEFAULT 0,
    shippingCost REAL DEFAULT 0,
    discount REAL DEFAULT 0,
    total REAL NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT DEFAULT 'pending',
    paymentStatus TEXT DEFAULT 'pending',
    paymentMethod TEXT,
    shippingMethod TEXT,
    trackingNumber TEXT,
    notes TEXT,
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    sessionId TEXT,
    items TEXT DEFAULT '[]',
    couponCode TEXT,
    discount REAL DEFAULT 0,
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (userId) REFERENCES users(id)
  );
`);

const categories = [
  { name: 'Electronics', slug: 'electronics', description: 'Latest gadgets and tech', sortOrder: 1 },
  { name: 'Fashion', slug: 'fashion', description: 'Trending clothing and accessories', sortOrder: 2 },
  { name: 'Home & Garden', slug: 'home-garden', description: 'Everything for your home', sortOrder: 3 },
  { name: 'Beauty', slug: 'beauty', description: 'Skincare and beauty products', sortOrder: 4 },
  { name: 'Sports', slug: 'sports', description: 'Sports and fitness equipment', sortOrder: 5 },
  { name: 'Accessories', slug: 'accessories', description: 'Phone and tech accessories', sortOrder: 6 },
]

const products = [
  {
    sku: 'ELEC-001',
    name: 'Wireless Noise Cancelling Headphones',
    slug: 'wireless-noise-cancelling-headphones',
    description: 'Experience crystal-clear audio with our premium Wireless Noise Cancelling Headphones. Featuring advanced Active Noise Cancellation (ANC) technology.',
    shortDescription: 'Premium wireless headphones with ANC',
    category: 'Electronics',
    brand: 'AudioTech',
    tags: JSON.stringify(['wireless', 'headphones', 'noise-cancelling']),
    basePrice: 299.99,
    compareAtPrice: 399.99,
    images: JSON.stringify(['/images/products/headphones.jpg']),
    stock: 150,
    rating: 4.8,
    numReviews: 1247,
    featured: 1,
    status: 'published',
  },
  {
    sku: 'ELEC-002',
    name: 'Smart Watch Pro Series',
    slug: 'smart-watch-pro-series',
    description: 'Stay connected with our feature-packed smartwatch. Track your fitness, receive notifications, and more.',
    shortDescription: 'Advanced smartwatch with fitness tracking',
    category: 'Electronics',
    brand: 'TechWear',
    tags: JSON.stringify(['smartwatch', 'fitness', 'wearable']),
    basePrice: 449.99,
    compareAtPrice: 549.99,
    images: JSON.stringify(['/images/products/smartwatch.jpg']),
    stock: 89,
    rating: 4.9,
    numReviews: 892,
    featured: 1,
    status: 'published',
  },
  {
    sku: 'FASH-001',
    name: 'Premium Cotton T-Shirt',
    slug: 'premium-cotton-t-shirt',
    description: 'Ultra-soft premium cotton t-shirt. Perfect for everyday wear with a comfortable fit.',
    shortDescription: 'Soft cotton t-shirt for everyday wear',
    category: 'Fashion',
    brand: 'StyleCo',
    tags: JSON.stringify(['t-shirt', 'cotton', 'casual']),
    basePrice: 49.99,
    compareAtPrice: 69.99,
    images: JSON.stringify(['/images/products/tshirt.jpg']),
    stock: 250,
    rating: 4.7,
    numReviews: 2156,
    featured: 1,
    status: 'published',
  },
  {
    sku: 'ACC-001',
    name: 'Ultra-Slim Laptop Stand',
    slug: 'ultra-slim-laptop-stand',
    description: 'Ergonomic laptop stand for better posture. Ultra-slim design with adjustable height.',
    shortDescription: 'Ergonomic adjustable laptop stand',
    category: 'Accessories',
    brand: 'ErgoDesign',
    tags: JSON.stringify(['laptop-stand', 'ergonomic', 'office']),
    basePrice: 79.99,
    compareAtPrice: 99.99,
    images: JSON.stringify(['/images/products/laptop-stand.jpg']),
    stock: 120,
    rating: 4.6,
    numReviews: 567,
    featured: 1,
    status: 'published',
  },
  {
    sku: 'ELEC-003',
    name: 'Bluetooth Speaker',
    slug: 'bluetooth-speaker',
    description: 'Portable Bluetooth speaker with powerful bass and 12-hour battery life.',
    shortDescription: 'Portable speaker with 12-hour battery',
    category: 'Electronics',
    brand: 'SoundMax',
    tags: JSON.stringify(['speaker', 'bluetooth', 'portable']),
    basePrice: 59.99,
    compareAtPrice: 129.99,
    images: JSON.stringify(['/images/products/speaker.jpg']),
    stock: 200,
    rating: 4.5,
    numReviews: 2341,
    featured: 0,
    status: 'published',
  },
  {
    sku: 'ELEC-004',
    name: 'Fitness Tracker Band',
    slug: 'fitness-tracker-band',
    description: 'Track your daily activity, sleep, and heart rate with this lightweight fitness band.',
    shortDescription: 'Lightweight fitness tracking band',
    category: 'Electronics',
    brand: 'FitLife',
    tags: JSON.stringify(['fitness', 'tracker', 'wearable']),
    basePrice: 39.99,
    compareAtPrice: 79.99,
    images: JSON.stringify(['/images/products/fitness-band.jpg']),
    stock: 180,
    rating: 4.4,
    numReviews: 1890,
    featured: 0,
    status: 'published',
  },
  {
    sku: 'ACC-002',
    name: 'Portable Charger',
    slug: 'portable-charger',
    description: '20000mAh portable power bank with fast charging support.',
    shortDescription: 'High-capacity portable power bank',
    category: 'Accessories',
    brand: 'PowerUp',
    tags: JSON.stringify(['charger', 'power-bank', 'portable']),
    basePrice: 29.99,
    compareAtPrice: 59.99,
    images: JSON.stringify(['/images/products/charger.jpg']),
    stock: 300,
    rating: 4.6,
    numReviews: 3456,
    featured: 0,
    status: 'published',
  },
  {
    sku: 'ACC-003',
    name: 'Wireless Mouse',
    slug: 'wireless-mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI and long battery life.',
    shortDescription: 'Ergonomic wireless mouse',
    category: 'Accessories',
    brand: 'ClickTech',
    tags: JSON.stringify(['mouse', 'wireless', 'ergonomic']),
    basePrice: 24.99,
    compareAtPrice: 49.99,
    images: JSON.stringify(['/images/products/mouse.jpg']),
    stock: 250,
    rating: 4.5,
    numReviews: 2789,
    featured: 0,
    status: 'published',
  },
]

async function seed() {
  try {
    console.log('Seeding database...')

    // Clear existing data
    db.exec('DELETE FROM categories')
    db.exec('DELETE FROM products')
    db.exec('DELETE FROM users')
    console.log('Cleared existing data')

    // Seed categories
    const insertCategory = db.prepare(
      'INSERT INTO categories (name, slug, description, sortOrder) VALUES (?, ?, ?, ?)'
    )
    for (const cat of categories) {
      insertCategory.run(cat.name, cat.slug, cat.description, cat.sortOrder)
    }
    console.log(`Seeded ${categories.length} categories`)

    // Seed products
    const insertProduct = db.prepare(`
      INSERT INTO products (sku, name, slug, description, shortDescription, category, brand, tags, basePrice, compareAtPrice, images, stock, rating, numReviews, featured, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    for (const prod of products) {
      insertProduct.run(
        prod.sku, prod.name, prod.slug, prod.description, prod.shortDescription,
        prod.category, prod.brand, prod.tags, prod.basePrice, prod.compareAtPrice,
        prod.images, prod.stock, prod.rating, prod.numReviews, prod.featured, prod.status
      )
    }
    console.log(`Seeded ${products.length} products`)

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    db.prepare(
      'INSERT INTO users (email, password, fullName, role) VALUES (?, ?, ?, ?)'
    ).run('admin@shopell.com', hashedPassword, 'Admin User', 'admin')
    console.log('Created admin user')

    // Create test customer
    const customerPassword = await bcrypt.hash('customer123', 12)
    db.prepare(
      'INSERT INTO users (email, password, fullName, role) VALUES (?, ?, ?, ?)'
    ).run('customer@example.com', customerPassword, 'John Doe', 'customer')
    console.log('Created test customer')

    console.log('\n✅ Database seeded successfully!')
    console.log('\nAdmin credentials:')
    console.log('Email: admin@shopell.com')
    console.log('Password: admin123')
    console.log('\nCustomer credentials:')
    console.log('Email: customer@example.com')
    console.log('Password: customer123')

  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    db.close()
  }
}

seed()
