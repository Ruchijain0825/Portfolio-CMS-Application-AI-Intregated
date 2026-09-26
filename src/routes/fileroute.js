import express from "express";
import upload from "../middlewares/uploadmiddleware";
import { createProject } from "../controllers/uploadcontroller";
const router = express.Router();
router.post("/",upload.single("image"),createProject);
export default router;