import { Router } from "express";
import { profilesController } from "./profiles.controller";

const router = Router();

// post method
router.post("/", profilesController.postProfiles);

// get method
router.get("/", profilesController.getProfiles);

// get single 
router.get("/:id",profilesController.getSingleProfile)

// put method
router.put("/:id",profilesController.updateProfiles)

// delete method 
router.delete("/:id",profilesController.deleteProfile)

export const profilesRoute = router;
