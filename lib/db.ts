// lib/db.ts
// This file sets up a single, reusable PostgreSQL connection pool
// using the "pg" library. Every API route imports "pool" from here
// instead of creating a new connection every time.

import { Pool } from "pg";

// The connection string comes from the .env file (DATABASE_URL).
// This is provided by Neon (or any PostgreSQL provider).
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Neon requires SSL. rejectUnauthorized: false keeps things simple
  // for a college project (avoids needing extra CA certificate setup).
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
