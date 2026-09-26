import { Router } from "express";
import { premiumController } from "./premium.controller";
import { auth } from "../../middlewares/auth";
import { ROLE } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  "/",
  auth(ROLE.ADMIN, ROLE.AUTHOR, ROLE.USER),
  premiumController.getPremiumContent,
);

export const premiumRoutes = router;
