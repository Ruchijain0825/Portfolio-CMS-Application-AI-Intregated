import express from "express";

import {
    createEducationController,
    getEducationsController,
    getEducationController,
    updateEducationController,
    deleteEducationController
} from "../controllers/educationcontroller.js";


const educationRouter = express.Router();


// Create
educationRouter.post(
    "/",
    createEducationController
);


// Get all
educationRouter.get(
    "/",
    getEducationsController
);


// Get one
educationRouter.get(
    "/:id",
    getEducationController
);


// Update
educationRouter.put(
    "/:id",
    updateEducationController
);


// Delete
educationRouter.delete(
    "/:id",
    deleteEducationController
);


export default educationRouter;