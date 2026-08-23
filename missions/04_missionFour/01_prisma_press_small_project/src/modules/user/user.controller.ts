import HttpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

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

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.CREATED,
      message: "Registered",
      data: { user },
    });
  },
);

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // * its being done in user.route.ts as middleware
    /* 
      const { accessToken } = req.cookies;
      const verifyToken = jwtUtils.verifyToken(
        accessToken,
        config.jwt_access_secret,
      );

      if (typeof verifyToken === "string") {
        throw new Error(verifyToken);
      } 
    */

    const profile = await userService.getMyProfileFromDB(
      req.user?.id as string,
    );

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.OK,
      message: "user profile fetched successfully",
      data: { profile },
    });
  },
);

const updateMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const payLoad = req.body;

    const updateProfile = await userService.updateMyProfileIntoDB(
      userId,
      payLoad,
    );

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.OK,
      message: "profile updated !!!",
      data: { updateProfile },
    });
  },
);

export const userController = {
  createUser,
  getMyProfile,
  updateMyProfile,
};
