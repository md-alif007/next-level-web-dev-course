import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

// [post method]
router.post("/", userController.createUser);

// [gett method]
router.get("/", userController.getAllUsers)

// [gett method - single user]
router.get("/:id", userController.getSinglUsers)

// [putt method]
router.put("/:id", userController.updateUser)

// [delete method]
router.delete("/:id", userController.deleteUser)


export const userRoute = router;