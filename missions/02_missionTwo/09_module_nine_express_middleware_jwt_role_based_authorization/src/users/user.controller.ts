import type { Request, Response } from "express";
import { usersService } from "./user.service";

// post method
const createUsers = async (req: Request, res: Response) => {
  const { name, email, age, password } = req.body;
  try {
    const result = await usersService.creatUsersIntoDB(req.body);

    res.status(200).json({
      success: true,
      message: "user created successfully:)",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const usersController = {
  createUsers,
};
