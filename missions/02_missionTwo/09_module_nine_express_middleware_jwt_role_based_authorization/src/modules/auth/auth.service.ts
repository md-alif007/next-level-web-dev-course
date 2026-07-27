import bcrypt from "bcryptjs";
import { pool } from "../../database/db";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../../config/config";

const loginUserIntoDB = async (payLoad: {
  email: string;
  password: string;
}) => {
  const { email, password } = payLoad;

  // 1 . check if the user exists
  // 2 . check if the password is correct
  // 3 . generate the token

  //   first step :
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email = $1 
    `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("Invalid credentials");
  }

  const user = userData.rows[0];

  // second step
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Invalid credentials");
  }

  //   third step
  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
    is_active: user.is_active,
  };

  const accessToken = jwt.sign(jwtPayload, config.secret, { expiresIn: "1d" });
  const refreshToken = jwt.sign(jwtPayload, config.refresh_secret, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const generateRefreshToken = async (token: string) => {
  // validation 1
  if (!token) {
    throw new Error("unauthorized");
  }

  // validation 2 : if the user exists
  const decoded = jwt.verify(token as string, config.refresh_secret) as JwtPayload;

  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email = $1 
        `,
    [decoded.email],
  );

  const user = userData.rows[0];

  if (userData.rows.length === 0) {
    throw new Error("user not found");
  }

  // validation 3 : is_active or not
  if (!user?.is_active) {
    throw new Error("forbidden");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
    is_active: user.is_active,
  };

  const accessToken = jwt.sign(jwtPayload, config.secret, { expiresIn: "1d" });

  return {accessToken}
};

export const authService = {
  loginUserIntoDB,
  generateRefreshToken,
};
