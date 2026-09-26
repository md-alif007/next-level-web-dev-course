import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { prisma } from "../lib/prisma";
import { SUBS_STATUS } from "../../generated/prisma/enums";

const subscriptionGuard = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    const subscription = await prisma.subs.findUnique({
      where: {
        userId,
      },
    });

    if (!subscription) {
      throw new Error("Please subscribe to get premium contents");
    }

    if (subscription.subsStatus !== SUBS_STATUS.ACTIVE) {
      throw new Error("Please subscribe again");
    }

    next();
  });
};

export default subscriptionGuard;
