import express from "express";
import { collectRent, viewRentHistory } from "../controllers/rent.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";


const router = express.Router();

router.use(authMiddleware);

// Collect rent
router.post("/collect", validationMiddleware, collectRent);

// View rent collection history
router.get("/history", validationMiddleware, viewRentHistory);

export default router;
