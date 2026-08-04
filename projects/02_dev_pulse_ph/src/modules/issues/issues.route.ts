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

router.get("/", issueController.getAllIssues);

router.get("/:id", issueController.getSingleIssue);

router.patch(
  "/:id",
  verifyToken(checkRole.maintainer, checkRole.contributor),
  issueController.updateIssue,
);

router.delete(
  "/:id",
  verifyToken(checkRole.maintainer),
  issueController.deleteIssue,
);

export const issueRoute = router;
