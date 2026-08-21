import HttpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";

// normal way
/*
const createUser = async (req: Request, res: Response) => {
  try {
    const payLoad = req.body;

    const user = await userService.createUserIntoDB(payLoad);
    res.status(HttpStatus.CREATED).json({
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "registered",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      successCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "failed to register",
      error: (error as Error).message,
    });
  }
};
*/

// higher order function way
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payLoad = req.body;

    const user = await userService.createUserIntoDB(payLoad);

    res.status(HttpStatus.CREATED).json({
      success: false,
      successCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "failed to register",
      data: {
        user,
      },
    });
  },
);

export const userController = {
  createUser,
};
