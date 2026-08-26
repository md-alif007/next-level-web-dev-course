import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { ROLE } from "../../../generated/prisma/enums";
import { commentController } from "./comment.controller";

const router = Router();

router.post("/", auth(ROLE.ADMIN, ROLE.USER), commentController.postComment);

router.get("/:commentId", commentController.getCommentById);

router.get("/:commentId", commentController.getCommentById);

router.get("/user/:userId", commentController.getCommentByUser);

export const commentRoute = router;
