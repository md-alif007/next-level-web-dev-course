import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";
import { pool } from "../database/db";

const authorization = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.headers.authorization);

    const token = req.headers.authorization;

    // validation 1
    if (!token) {
      res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }

    // validation 2 : if the user exists
    const decoded = jwt.verify(token as string, config.secret) as JwtPayload;

    const userData = await pool.query(
      `
      SELECT * FROM users WHERE email = $1 
      `,
      [decoded.email],
    );

    const user = userData.rows[0];

    if (userData.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    // validation 3 : is_active or not
    if (!user.is_active) {
      res.status(403).json({
        success: false,
        message: "forbidden",
      });
    }

    next();
  };
};

export default authorization;
