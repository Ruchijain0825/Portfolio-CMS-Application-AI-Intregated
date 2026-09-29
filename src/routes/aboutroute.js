import express from "express";
import upload from "../middlewares/uploadmiddleware.js";
import { createAboutController,getAboutController,updateAboutController } from "../controllers/aboutcontroller.js";
import { authMiddleware } from "../middlewares/authmoddleware.js";
const router = express.Router();
router.get("/about",getAboutController)
router.post("/about",upload.single("image"),createAboutController);
router.put("/about/:id",upload.single("image"),updateAboutController);
export default router;
