import { NextFunction, Request, Response, Router } from "express";
import { premiumController } from "./premium.controller";
import { auth } from "../../middlewares/auth";
import { ROLE, SUBS_STATUS } from "../../../generated/prisma/enums";
import { catchAsync } from "../../utils/catchAsync";
import { prisma } from "../../lib/prisma";
import subscriptionGuard from "../../middlewares/premiumGuard";

const router = Router();

router.get(
  "/",
  auth(ROLE.ADMIN, ROLE.AUTHOR, ROLE.USER),
  subscriptionGuard,
  premiumController.getPremiumContent,    
);

export const premiumRoutes = router;
