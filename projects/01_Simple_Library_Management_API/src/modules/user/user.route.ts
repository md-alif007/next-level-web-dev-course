import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

// post method
router.post("/", userController.createUser);

// gett all users
router.get("/", userController.getUsers);

// gett single user
router.get("/:id", userController.getSingleUser);

// update user/put
router.put("/:id", userController.updateUser);

// delete user
router.delete("/:id", userController.deleteUser);

export const userRoute = router;
