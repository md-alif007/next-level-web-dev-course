import type { Request, Response } from "express";
import { authService } from "./auth.service";

const createUsers = async (req: Request, res: Response) => {

  try {
    const result = await authService.createUsersIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      errors: error,
    });
  }
};

export const authController = {
  createUsers,
};
