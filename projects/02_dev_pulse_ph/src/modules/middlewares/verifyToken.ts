import type { NextFunction, Request, Response } from "express";
import type { ROLE } from "../../types/types";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../../config/config";
import { pool } from "../../database/database";

const verifyToken = (...roles: ROLE[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      //   if the token exists
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized!",
        });
      }

      //   if the user exists
      const decoded = jwt.verify(
        token as string,
        config.secret as string,
      ) as JwtPayload;

      const userData = await pool.query(
        `
        SELECT * FROM users WHERE id = $1
        `,
        [decoded.id],
      );

      const user = userData.rows[0];

      if (userData.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Not Found!",
        });
      }

      //   setting namespace
      req.user = decoded;

      //   matching the role
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden!",
        });
      }
    } catch (error: any) {
      next(error);
    }

    next();
  };
};

export default verifyToken;
