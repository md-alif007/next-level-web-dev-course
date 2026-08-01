import { pool } from "../../database/database";
import type { IUser } from "./auth.interface";
import bcrypt from "bcryptjs";

const createUsersIntoDB = async (payLoad: IUser) => {
  const { name, email, password, role } = payLoad;

  const hashPassword = await bcrypt.hash(password, 10);

  const existingUser = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [email],
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email already exists");
  }

  const result = await pool.query(
    `
        INSERT INTO 
        users(name, email, password, role)
        VALUES($1,$2,$3,COALESCE($4 , 'contributor'))
        RETURNING * 
        `,
    [name, email, hashPassword, role],
  );

  delete result.rows[0].password;

  return result;
};

export const authService = {
  createUsersIntoDB,
};
