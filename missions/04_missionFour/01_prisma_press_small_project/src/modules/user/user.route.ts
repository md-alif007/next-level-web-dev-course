import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { ROLE } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";

const router = Router();

declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
        id: string;
        role: ROLE;
      };
    }
  }
}

router.post("/register", userController.createUser);

router.get(
  "/me",
  auth(ROLE.ADMIN, ROLE.AUTHOR, ROLE.USER),
  userController.getMyProfile,
);

router.put(
  "/my-profile",
  auth(ROLE.ADMIN, ROLE.AUTHOR, ROLE.USER),
  userController.updateMyProfile,
);

export const userRouter = router;
