import express from "express";

import {
  createExperienceController,
  getExperiencesController,
  getExperienceController,
  updateExperienceController,
  deleteExperienceController,
} from "../controllers/experiencecontroller.js";

const router = express.Router();

router.post("/", createExperienceController);
router.get("/", getExperiencesController);
router.get("/:id", getExperienceController);
router.put("/:id", updateExperienceController);
router.delete("/:id", deleteExperienceController);

export default router;