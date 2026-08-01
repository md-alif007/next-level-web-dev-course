import { Pool } from "pg";
import { config } from "../config/config";

export const pool = new Pool({
  connectionString: config.connection_string,
});

/*
id	Auto-incrementing unique identifier for each account,
name	Full display name of the team member, must be provided,
email	Valid login address, must be unique across all accounts, must be provided,
password	Encrypted string stored securely, must be provided during registration, never returned in responses,
role	Determines system access level, defaults to contributor, must be contributor or maintainer,
created_at	Timestamp marking when the account was created, automatically generated on insert,
updated_at	Timestamp marking when the account was last updated, automatically refreshed on update.
*/

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
    console.log("database connected successfully");
  } catch (error: any) {
    console.error(error);
  }
};
