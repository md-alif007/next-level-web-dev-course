import { Router } from "express";
import { issueController } from "./issues.controller";
import verifyToken from "../middlewares/verifyToken";
import { checkRole } from "../../types/types";

const router = Router();

router.post(
  "/",
  verifyToken(checkRole.maintainer, checkRole.contributor),
  issueController.createIssues,
);

export const issueRoute = router;
