import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/signup", authController.createUsers);
router.post("/login", authController.loginUser);

export const authRouter = router;
