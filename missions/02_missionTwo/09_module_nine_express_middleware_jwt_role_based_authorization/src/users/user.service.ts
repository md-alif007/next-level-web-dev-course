import { pool } from "../database/db";
import type { IUser } from "./user.interface";

// post method
const creatUsersIntoDB = async (payLoad: IUser) => {
  const { name, email, password, age } = payLoad;

  const result = await pool.query(
    `
        INSERT INTO users(name, email, password, age)
        VALUES ($1,$2,$3,$4)
        RETURNING *
    `,
    [name, email, password, age],
  );
  return result;
};

// get user
const getUserFromDB = async () => {
  const result = await pool.query(
    `
    SELECT * FROM users
    `,
  );
  return result;
};

// get single user
const getSingleUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE id = $1
    `,
    [id],
  );
  return result;
};

// update user
const updateUserIntoDB = async (id: string, payLoad: IUser) => {
  const { name, email, password, is_active, age } = payLoad;

  const result = await pool.query(
    `
    UPDATE users SET 
    name = COALESCE ($1 , name),
    email = COALESCE ($2 , email),
    password = COALESCE ($3 , password),
    is_active = COALESCE ($4 , is_active),
    age = COALESCE ($5 , age)
    WHERE id = $6
    RETURNING *
    `,
    [name, email, password, is_active, age, id],
  );
  return result;
};

// delete user
const delteUserFronDB = async (id: string) => {
  const result = await pool.query(
    `
      DELETE FROM users WHERE id = $1 
    `,
    [id],
  );
  return result;
};

export const usersService = {
  creatUsersIntoDB,
  getUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  delteUserFronDB
};
