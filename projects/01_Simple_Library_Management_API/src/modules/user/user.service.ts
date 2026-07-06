import { pool } from "../../database";
import type { IUser } from "./user.interface";

// post method
const createUserIntoDB = async (payLoad: any) => {
  const { name, gmail, password, age } = payLoad;
  const result = await pool.query(
    `
      INSERT INTO 
      users(name , gmail , password , age) 
      VALUES($1,$2,$3,$4)
      RETURNING *
      `,
    [name, gmail, password, age],
  );
  return result;
};

// gett all users
const getUsersFromDB = async () => {
  const result = await pool.query(
    `
        SELECT * FROM users
      `,
  );
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
  return result;
};

// update user/put
const updateUserIntoDB = async (payLoad: IUser, id: string) => {
  const { name, gmail, password, is_active, age } = payLoad;
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
    [name, gmail, password, is_active, age, id],
  );
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
  deleteUserFromDB
};
