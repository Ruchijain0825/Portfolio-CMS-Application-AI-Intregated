import express from "express";

import {
  createEducationController,
  getEducationsController,
  getEducationController,
  updateEducationController,
  deleteEducationController,
} from "../controllers/educationcontroller.js";

const educationRouter = express.Router();


// CREATE
educationRouter.post(
  "/",
  createEducationController
);


// GET ALL
educationRouter.get(
  "/",
  getEducationsController
);


// GET BY ID
educationRouter.get(
  "/:id",
  getEducationController
);


// UPDATE
educationRouter.put(
  "/:id",
  updateEducationController
);


// DELETE
educationRouter.delete(
  "/:id",
  deleteEducationController
);


export default educationRouter;