import { pool } from "../../database/db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

// post method
const creatUsersIntoDB = async (payLoad: IUser) => {
  const { name, email, password, age, role } = payLoad;
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
        INSERT INTO users(name, email, password, age , role)
        VALUES ($1,$2,$3,$4 ,COALESCE($5,'user'))
        RETURNING *
    `,
    [name, email, hashPassword, age, role],
  );
  delete result.rows[0].password;
  return result;
};

// get user
const getUserFromDB = async () => {
  const result = await pool.query(
    `
    SELECT * FROM users
    `,
  );

  result.rows.forEach((user) => {
    delete user.password;
  });
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

  if (result.rows.length > 0) {
    delete result.rows[0].password;
  }
  return result;
};

// update user
const updateUserIntoDB = async (id: string, payLoad: IUser) => {
  const { name, email, password, is_active, age } = payLoad;

  let hashPassword: String | null = null;

  if (password) {
    hashPassword = await bcrypt.hash(password, 10);
  }

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
    [name, email, hashPassword, is_active, age, id],
  );
  if (result.rows.length > 0) {
    delete result.rows[0].password;
  }
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
  delteUserFronDB,
};
