import { Router } from "express";
import { usersController } from "./user.controller";
import authorization from "../../middlewares/authorization";
import { USER_ROLE } from "../../types/types";

const router = Router();

// post method
router.post("/", usersController.createUsers);

// get method
router.get("/", authorization(USER_ROLE.admin,USER_ROLE.agent), usersController.getUsers);

// get single method
router.get("/:id", usersController.getSingleUser);

// put method
router.put("/:id", usersController.updateUser);

// delete method
router.delete("/:id", usersController.deleteUser);

export const usersRouter = router;
