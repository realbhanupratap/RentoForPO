import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import Middlewares
import { authMiddleware } from "./middlewares/auth.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { rateLimitMiddleware } from "./middlewares/rateLimit.middleware.js";
import { validationMiddleware } from "./middlewares/validation.middleware.js";

// Routes import
import landlord from './routes/landlord.routes.js';
import complaints from './routes/complaints.routes.js';
import inventory from './routes/inventory.routes.js';
import property from './routes/property.routes.js';
import rentPayments from './routes/rentPayments.routes.js';
import tenantManagement from './routes/tenants.routes.js';
import getReviewsForLandlordProperties from './routes/reviews.routes.js';
import notificationRoutes from './routes/notification.routes.js'; // Add this for notifications
import analyticsRoutes from './routes/analytics.routes.js'; // Add this for analytics

const app = express();

// Global middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Logging middleware (applied globally)
app.use(loggerMiddleware);

// Apply rate limiting middleware globally
app.use(rateLimitMiddleware);

// Auth middleware (applied globally or per route basis)
app.use(authMiddleware);

// Routes declaration
app.use("/api/v1/landlord", landlord);
app.use("/api/v1/complaints", complaints);
app.use("/api/v1/inventory", inventory);
app.use("/api/v1/properties", property);
app.use("/api/v1/rentpayments", rentPayments);
app.use("/api/v1/tenants", tenantManagement);
app.use("/api/v1/review", getReviewsForLandlordProperties);
app.use('/api/notifications', notificationRoutes); // For Notifications
app.use('/api/analytics', analyticsRoutes); // For Analytics and Reporting

// Validation middleware for specific routes (e.g., property routes)
app.use("/api/v1/properties", validationMiddleware); // Apply validation on property routes

// Error handling middleware (place this after all routes)
app.use(errorMiddleware);

export { app };
