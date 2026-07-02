import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.resolve(process.cwd(), 'shopell.db')

let db: Database.Database | null = null

export function getDatabase(): Database.Database {
  if (!db) {
    db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
  }
  return db
}

export function closeDatabase() {
  if (db) {
    db.close()
    db = null
  }
}
