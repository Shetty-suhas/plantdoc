import Database from "better-sqlite3";
import { z } from "zod";
import bcrypt from "bcryptjs";

// Initialize database
const db = new Database("plantdoc.db");

// Enable foreign keys
db.pragma("foreign_keys = ON");

// Create users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create diagnoses table to store user's plant diagnoses
db.exec(`
  CREATE TABLE IF NOT EXISTS diagnoses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    plant_name TEXT,
    disease TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  )
`);

// User schema for validation
export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

export type User = z.infer<typeof UserSchema> & { id: number };

// User methods
export const userMethods = {
  create: db.prepare(`
    INSERT INTO users (email, password, name)
    VALUES (?, ?, ?)
  `),

  findByEmail: db.prepare(`
    SELECT * FROM users WHERE email = ?
  `),

  findById: db.prepare(`
    SELECT * FROM users WHERE id = ?
  `),
};

// Diagnosis methods
export const diagnosisMethods = {
  create: db.prepare(`
    INSERT INTO diagnoses (user_id, plant_name, disease, description, image_url)
    VALUES (?, ?, ?, ?, ?)
  `),

  findByUserId: db.prepare(`
    SELECT * FROM diagnoses
    WHERE user_id = ?
    ORDER BY created_at DESC
  `),
};

export { db };
