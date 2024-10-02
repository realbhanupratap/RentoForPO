import express from "express";
import { viewComplaints, resolveComplaint } from "../controllers/landlordComplaint.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware); // Protect all complaints routes

router.use(protectLandlord);  // Middleware to ensure landlord authentication

// Route to view all complaints for a landlord
router.get("/", viewComplaints);

// Route to resolve a specific complaint by its ID
router.put("/:complaintId/resolve", resolveComplaint);

export default router;
