import type { Request, Response } from "express";
import { userService } from "./user.service";

// post method
const createUser = async (req: Request, res: Response) => {
  const { name, gmail, password, age } = req.body;

  try {
    const result = await userService.createUserIntoDB(req.body);

    res.status(201).json({
      message: "User created successfully:)",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

// gett all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsersFromDB();
    res.status(201).json({
      message: "Users retrived successfully:)",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

// gett single user
const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.getSingleUserFromDB(id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        message: "user not found:(",
        data: {},
      });
    }
    res.status(201).json({
      message: "User retrived successfully:)",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

// update user/put
const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, gmail, password, is_active, age } = req.body;
  try {
    const result = await userService.updateUserIntoDB(req.body, id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        message: "user not found:(",
        data: {},
      });
    }
    res.status(201).json({
      message: "User updated successfully:)",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

//delete user
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUserFromDB(id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        message: "user not found:(",
        data: {},
      });
    }
    res.status(201).json({
      message: "User deleted successfully:)",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser
};
