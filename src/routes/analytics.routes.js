import express from "express";
import {
  getTotalRentCollected,
  getTotalRentDue,
  getTotalTenants,
  getTotalCapacity,
  getComplaintResolutionRate,
  getComplaintStatusBreakdown,
  getVacancyRate,
} from "../controllers/analytics.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.use(authMiddleware);

router.get("/total-rent", getTotalRentCollected);
router.get("/total-rent-due", getTotalRentDue);  // New Route for rent due
router.get("/total-tenants", getTotalTenants);
router.get("/total-capacity", getTotalCapacity);  // New Route for tenant capacity
router.get("/complaint-resolution-rate", getComplaintResolutionRate);
router.get("/complaint-status-breakdown", getComplaintStatusBreakdown);  // New Route for complaint breakdown
router.get("/vacancy-rate", getVacancyRate);  // New Route for vacancy rate

export default router;
