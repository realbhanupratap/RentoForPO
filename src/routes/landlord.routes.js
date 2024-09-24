import { Router } from "express";
import { registerUser } from "../controllers/landlord.controller.js";

const router = Router()

router.route("/register").post(registerUser)

export default router