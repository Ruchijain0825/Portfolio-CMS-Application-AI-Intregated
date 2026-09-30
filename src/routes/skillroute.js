import express from "express";
import { createSkillController,getSkillController,deleteSkillController,updateSkillController,getSkillsControllerById } from "../controllers/skillscontroller.js";
const router = express.Router();
router.get("/",getSkillController);
router.get("/:id",getSkillsControllerById);
router.post("/",createSkillController);
router.put("/:id",updateSkillController);
router.delete("/:id",deleteSkillController);
export default router;