import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

//Connect to Supabase
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;