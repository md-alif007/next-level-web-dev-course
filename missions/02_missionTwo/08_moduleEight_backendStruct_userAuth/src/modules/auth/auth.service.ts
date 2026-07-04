import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDB = async (payLoad: {
  email: string;
  password: string;
}) => {
  const { email, password } = payLoad;
  // 1 . check if the user exists
  // 2 . compare the password
  // 3. generate the token

  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("Invalid credentials!");
  }
  const user = userData.rows[0];

  // 2 . compare the password
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Invalid credentials!");
  }

  // 3. generate the token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    is_active: user.is_active,
    email: user.email,
  };
  const accessToken = jwt.sign(jwtPayload, config.secret as string, {
    expiresIn: "1d",
  });
  return {accessToken};
};

export const authService = {
  loginUserIntoDB,
};
