import { Router } from "express";
import { subscriptionController } from "./subscription.controller";
import { auth } from "../../middlewares/auth";
import { ROLE } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/checkout",
  auth(ROLE.ADMIN, ROLE.AUTHOR, ROLE.USER),
  subscriptionController.createCheckOutSession,
);

router.post("/webhook", subscriptionController.handleWebhook);

router.get(
  "/status",
  auth(ROLE.ADMIN, ROLE.AUTHOR, ROLE.USER),
  subscriptionController.getSubscriptionStatus,
);

export const subscriptionRoute = router;
