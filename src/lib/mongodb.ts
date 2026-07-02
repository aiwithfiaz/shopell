import { MongoClient, Db, Collection } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://aiwithfiaz:AIWithFiaz%401427@cluster0.mwrfhsa.mongodb.net/?appName=Cluster0'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

interface MongodbCache {
  client: MongoClient | null
  db: Db | null
  promise: Promise<MongoClient> | null
}

declare global {
  var mongodb: MongodbCache | undefined
}

let cached: MongodbCache = global.mongodb || { client: null, db: null, promise: null }

if (!global.mongodb) {
  global.mongodb = cached
}

export async function connectToDatabase(): Promise<Db> {
  if (cached.db) {
    return cached.db
  }

  if (!cached.promise) {
    const opts = {
      maxPoolSize: 10,
      minPoolSize: 2,
    }

    cached.promise = MongoClient.connect(MONGODB_URI, opts)
  }

  try {
    cached.client = await cached.promise
    cached.db = cached.client.db('shopell')
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.db
}

export async function getCollection<T extends Document>(name: string): Promise<Collection<T>> {
  const db = await connectToDatabase()
  return db.collection<T>(name)
}
