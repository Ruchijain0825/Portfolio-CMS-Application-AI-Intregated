import express, { Router } from "express";
import { createProjectController,updateProjectController,deleteProjectController,getProjectController,getProjectControllerById, searchProjectController } from "../controllers/projectcontroller.js";
const router = express.Router();
router.get("/",getProjectController);
router.get("/search",searchProjectController)
router.get("/:id",getProjectControllerById);
router.post("/",createProjectController);
router.put("/:id",updateProjectController);
router.delete("/:id",deleteProjectController);
export default router;