import { Router } from "express";
import { usersController } from "./user.controller";
import authorization from "../../middlewares/authorization";

const router = Router();

// post method
router.post("/", usersController.createUsers);

// get method
router.get("/", authorization(), usersController.getUsers);

// get single method
router.get("/:id", usersController.getSingleUser);

// put method
router.put("/:id", usersController.updateUser);

// delete method
router.delete("/:id", usersController.deleteUser);

export const usersRouter = router;
