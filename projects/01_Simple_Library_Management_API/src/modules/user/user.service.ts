import { pool } from "../../database";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

// post method
const createUserIntoDB = async (payLoad: any) => {
  const { name, gmail, password, age } = payLoad;
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
      INSERT INTO 
      users(name , gmail , password , age) 
      VALUES($1,$2,$3,$4)
      RETURNING *
      `,
    [name, gmail, hashPassword, age],
  );

  delete result.rows[0].password;
  return result;
};

// gett all users
const getUsersFromDB = async () => {
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

// gett single user
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

// update user/put
const updateUserIntoDB = async (payLoad: IUser, id: string) => {
  const { name, gmail, password, is_active, age } = payLoad;

  let hashPassword: string | null = null;
  if (password) {
    hashPassword = await bcrypt.hash(password, 10);
  }

  const result = await pool.query(
    `
      UPDATE users SET
      name = COALESCE($1,name),
      gmail = COALESCE($2,gmail),
      password = COALESCE($3,password),
      is_active = COALESCE($4,is_active),
      age = COALESCE($5,age)     
      WHERE id = $6
      RETURNING *
      `,
    [name, gmail, hashPassword, is_active, age, id],
  );

  if (result.rows.length > 0) {
    delete result.rows[0].password;
  }
  return result;
};

// delete user
const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
      DELETE FROM users WHERE id = $1
      `,
    [id],
  );
  return result;
};

export const userService = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
