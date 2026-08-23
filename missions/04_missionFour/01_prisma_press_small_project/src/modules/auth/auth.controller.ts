import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payLoad = req.body;

    const { accessToken, refreshToken } =
      await authService.loginUserIntoDB(payLoad);

    // setting the cookie [name , value , options]
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      // maxAge: 1000 * 60 * 60 -> 1hour
      maxAge: 1000 * 60 * 60 * 24 /* 1 day */,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7 /* 7 day */,
    });

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.OK,
      message: "User logged in successfully",
      data: { accessToken, refreshToken },
    });
  },
);

const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    const { accessToken } = await authService.refreshTokenIntoDB(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.OK,
      message: "new token generated",
      data: { accessToken },
    });
  },
);

export const authController = {
  loginUser,
  refreshToken,
};
