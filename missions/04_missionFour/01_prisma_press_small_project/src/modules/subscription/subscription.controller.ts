import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { subscriptionServices } from "./subscription.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";

const createCheckOutSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    const result = await subscriptionServices.createCheckOutSession(
      userId as string,
    );

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.OK,
      message: "check out completed successfully!",
      data: result,
    });
  },
);

const handleWebhook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const event = req.body as Buffer;
    const signature = req.headers["stripe-signature"]!;

    await subscriptionServices.handleWebhook(event, signature as string);
  },
);

const getSubscriptionStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    const result = await subscriptionServices.getSubscriptionStatus(
      userId as string,
    );

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.OK,
      message: "sub status retrived successfully",
      data: result,
    });
  },
);

export const subscriptionController = {
  createCheckOutSession,
  handleWebhook,
  getSubscriptionStatus
};
