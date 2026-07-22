import { Router } from "express";
import { usersController } from "./user.controller";

const router = Router();

// post method
router.post("/", usersController.createUsers);

export const usersRouter = router;
