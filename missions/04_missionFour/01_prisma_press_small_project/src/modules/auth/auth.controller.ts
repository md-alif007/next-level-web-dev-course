import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payLoad = req.body;

    const loginResult = await authService.loginUserIntoDB(payLoad);

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.OK,
      message: "User logged in successfully",
      data: loginResult,
    });
  },
);

export const authController = {
  loginUser,
};
