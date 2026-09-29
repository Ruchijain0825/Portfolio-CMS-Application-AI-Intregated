import express from "express";
import { loginAdmin } from "../controllers/authcontroller.js";

const router = express.Router();


router.post("/login", loginAdmin);
router.get("",(req,res)=>
{
    console.log("error while fetching the end point!")
})

export default router;