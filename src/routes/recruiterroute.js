import express from "express";

import {
    createMessageController,
    getMessagesController
} from "../controllers/recruitermessagecontroller.js";

const router = express.Router();

router.post("/", createMessageController);

router.get("/", getMessagesController);

export default router;