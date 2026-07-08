import { Pool } from "pg";
import { config } from "../config/config";

export const pool = new Pool({
  connectionString: config.connectio_string,
});

export const initializingDataBase = async () => {
  try {
    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS users
      (
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      gmail VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(20),
      is_active BOOLEAN DEFAULT TRUE,
      age INT,

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
      `,
    );

    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS profile
      (
      id SERIAL PRIMARY KEY,
      user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,

      bio TEXT,
      address TEXT,
      gender VARCHAR(5),
      phone VARCHAR(11),

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
      `,
    );

    /*
    id
    title
    author
    genre
    published_year
    available
    created_at
    updated_at
    */
    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS books 
      (
        id SERIAL PRIMARY KEY,
        title VARCHAR(20) NOT NULL,
        author VARCHAR(20) NOT NULL,
        genre VARCHAR(20) NOT NULL,
        published_year INT NOT NULL,
        available BOOLEAN DEFAULT TRUE,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
      `,
    );

    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
