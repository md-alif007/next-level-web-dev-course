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

// get method
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersService.getUserFromDB();

    res.status(200).json({
      success: true,
      message: "users retrived successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// get single user
const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await usersService.getSingleUserFromDB(id as string);

  try {
    res.status(200).json({
      success: true,
      message: "user retrived successfully",
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

// put method
const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, is_active, age } = req.body;

  const result = await usersService.updateUserIntoDB(id as string, req.body);
  try {
    res.status(200).json({
      success: true,
      message: "user updated successfully",
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

// delete user
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await usersService.delteUserFronDB(id as string);

  try {
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
      data: {},
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
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser
};
