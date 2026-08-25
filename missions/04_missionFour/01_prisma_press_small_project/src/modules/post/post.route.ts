import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { ROLE } from "../../../generated/prisma/enums";
import { postController } from "./post.controller";

const router = Router();

router.post(
  "/",
  auth(ROLE.ADMIN, ROLE.AUTHOR, ROLE.USER),
  postController.createPost,
);

router.get("/", postController.getPosts);

router.get("/stats", auth(ROLE.ADMIN), postController.getStats);

router.get("/my-posts", auth(ROLE.USER, ROLE.ADMIN), postController.getMyPosts);

router.get("/:postId", postController.getPostById);

router.patch(
  "/:postId",
  auth(ROLE.USER, ROLE.ADMIN),
  postController.updateUser,
);

router.delete(
  "/:postId",
  auth(ROLE.USER, ROLE.ADMIN),
  postController.deleteUser,
);

export const postRoute = router;
