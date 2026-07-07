import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router();

// post
router.post("/", profileController.createProfile);

// get
router.get("/", profileController.getProfile);

// get single profile
router.get("/:id", profileController.getSingleProfile);

// update profile
router.put("/:id", profileController.updateProfile);

// delete profile
router.delete("/:id",profileController.deleteProfile)

export const profileRoute = router;
