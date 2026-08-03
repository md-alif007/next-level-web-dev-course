import { Pool } from "pg";
import { config } from "../config/config";

export const pool = new Pool({
  connectionString: config.connection_string,
});

export const initializingDatabase = async () => {
  try {
    await pool.query(
      `   
    CREATE TABLE IF NOT EXISTS users 
    (
    id SERIAL PRIMARY KEY ,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'contributor',

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `,
    );

    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS issues 
      (
      id SERIAL PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      description TEXT NOT NULL,
      type TEXT NOT NULL
        CHECK (type IN ('bug', 'feature_request')),
      status TEXT NOT NULL DEFAULT 'open'
        CHECK (status IN ('open', 'in_progress', 'resolved')),
      reporter_id INT NOT NULL,

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()

      )
      `,
    );
    console.log("database connected successfully");
  } catch (error: any) {
    console.error(error);
  }
};
