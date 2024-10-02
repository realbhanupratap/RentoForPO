import express from "express";
import {
  getReviewsForLandlordProperties,
  getPropertyAverageRating
} from "../controllers/reviewLandlord.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"; // Ensure landlord is authenticated

const router = express.Router();

router.use(authMiddleware);

// Route to get all reviews for the landlord's properties (protected)
router.get("/reviews", authMiddleware, getReviewsForLandlordProperties);

// Route to get average rating for a specific property (protected)
router.get("/reviews/:propertyId/average", authMiddleware, getPropertyAverageRating);

export default router;
