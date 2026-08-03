import { pool } from "../../database/database";
import type { IUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../../config/config";

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

const loginUserIntoDB = async (payLoad: {
  email: string;
  password: string;
}) => {
  const { email, password } = payLoad;

  // 1 . check if the user exists
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [email],
  );
  if (userData.rows.length === 0) {
    throw new Error("Not Found!");
  }

  // 2 . check if the password is correct
  const user = userData.rows[0];

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Invalid credentials!");
  }

  // 3 . generate the token
  const jwtPayLoad = {
    id: user.id,
    name: user.name,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayLoad, config.secret!, { expiresIn: "1d" });
  return { accessToken };
};

export const authService = {
  createUsersIntoDB,
  loginUserIntoDB,
};
